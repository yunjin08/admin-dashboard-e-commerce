import Product from "@/models/Product";
import { connectToDB } from "@/utils/database";

export const POST = async (req, res) => {
  const { title, description, price } = await req.json();
  try {
    console.log("Request Body:", req.body);
    await connectToDB();

    const productDoc = new Product({ title, description, price });

    await productDoc.save();
    return new Response(JSON.stringify(productDoc), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const headers = { "Cache-Control": "no-store" };

    if (req.query?.id) {
      const products = await Product.findOne({ _id: req.query.id });
      return new Response(JSON.stringify(products), { status: 200, headers });
    } else {
      const products = await Product.find({});

      return new Response(JSON.stringify(products), { status: 200, headers });
    }
  } catch (error) {
    return new Response("Failed to fetch all prodcuts", { status: 500 });
  }
};
