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
