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

export const PATCH = async (request, { params }) => {
  const { title, description, price } = await request.json();
  try {
    await connectToDB();

    const existingProducts = await Product.findById(params.id);

    if (!existingProducts) {
      return new Response("Products not found", { status: 404 });
    }
    existingProducts.title = title;
    existingProducts.description = description;
    existingProducts.price = price;

    await existingProducts.save();

    return new Response(JSON.stringify(existingProducts), { status: 200 });
  } catch (error) {
    return new Response("Failed to edit a product", { status: 500 });
  }
};
