import { MongoClient } from "mongodb";

const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const client = new MongoClient(process.env.DB_URL);

export default async function handler(req, res) {
  const data = [];

  const shop = req.query.shop;
  const refId = req.query.refId;
  const token = req.query.token;
  const quantity = req.query.quantity;
  const variantId = req.query.variantId;
  const type = req.query.type;
  const discountValue = req.query.discountValue;
  const discountType = req.query.discountType;
  const discountTitle = req.query.discountTitle;
  const variants = variantId.split(",");

  const discount = {
    value: Number(discountValue),
    valueType: discountType,
    title: discountTitle,
  };

  const changes = variants.map((v) => ({
    type: type,
    variantId: Number(v),
    quantity: Number(quantity),
    discount: discount,
  }));

  const decodedToken = jwt.verify(token, process.env.SHOPIFY_API_SECRET);
  const decodedReferenceId =
    decodedToken.input_data.initialPurchase.referenceId;
  if (decodedReferenceId !== refId) {
    res.status(400).render();
  }

  const payload = {
    iss: process.env.SHOPIFY_API_KEY,
    jti: uuidv4(),
    iat: Date.now(),
    sub: refId,
    changes: changes,
  };

  const send_token = jwt.sign(payload, process.env.SHOPIFY_API_SECRET);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(200).json({ send_token });
}
