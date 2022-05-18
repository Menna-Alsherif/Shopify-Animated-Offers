// ************* Helper description *************


import {getSessionToken} from "@shopify/app-bridge-utils";
import jwt_decode from "jwt-decode";

export async function getShopUrl(app) {

  const sessionToken = await getSessionToken(app);
  const {dest} = jwt_decode(sessionToken);
  return dest.replace('https://','');

}
