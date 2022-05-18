import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URL);

export default async function handler(req, res) {
  const data = [];

  try {
    // todo: add caching
    await client.connect();
    const database = client.db("animated-offers");
    const collection = database.collection("offers");
    const shop = req.query.shop;

    const offers = await collection.find({ shop });

    await offers.forEach((offer) => {
      data.push(offer);
    });
  } finally {
    await client.close();
  }

  // TODO: Cache data

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(200).json(data);
}
