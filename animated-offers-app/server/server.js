import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import { registerScriptTag } from "./handlers/mutations/register-script-tag";
import https from "https";
import fs from "fs";
import mongoose from "mongoose";
dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();
// TODO: api version in line 24 to read from env vars
Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  API_VERSION: "2021-07",
  IS_EMBEDDED_APP: true,

  // TODO: validate session storage
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
// TODO: store shops in mongo
const ACTIVE_SHOPIFY_SHOPS = {};

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        const response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: "/webhooks",
          topic: "APP_UNINSTALLED",
          webhookHandler: async (topic, shop, body) =>
            delete ACTIVE_SHOPIFY_SHOPS[shop],
        });

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }

        console.log("app installed ... ");
        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  const validateAndHandleRequest = async (ctx) => {
    if (ctx.originalUrl === "/api/graphql") {
      // TODO: protect graphQL route
      // console.log(ctx.request.origin);
      await handleRequest(ctx);
    } else {
      const shop = ctx.query.shop;
      if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
        ctx.redirect(`/auth?shop=${shop}`);
      } else {
        await handleRequest(ctx);
      }
    }
  };

  // TODO: disable access to /api directly before production or add authentication
  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  router.get("(/api/rest/public/.*)", handleRequest); // our public rest API
  //router.get("(/api/graphql)", handleRequest); // our public graphql API
  router.get("(.*)", async (ctx) => {
    await validateAndHandleRequest(ctx);
  });

  // TODO: implement request authentication for our own custom APIs
  router.post("(.*)", async (ctx) => {
    await validateAndHandleRequest(ctx);
  });

  server.use(router.allowedMethods());
  server.use(router.routes());

  await mongoose.connect(process.env.DB_URL);

  if (process.env.USE_SSL) {
    const options = {
      key: fs.readFileSync(process.env.SSL_KEY),
      cert: fs.readFileSync(process.env.SSL_CERT),
    };

    https.createServer(options, server.callback()).listen(443, () => {
      console.log(`> Ready on https://localhost`);
    });
  }

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
