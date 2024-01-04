import Product from "@/models/Product";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  console.log("Req:" + params);
  try {
    await connectToDB();

    const products = await Product.findById(params.id);
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch product", { status: 500 });
  }
};
