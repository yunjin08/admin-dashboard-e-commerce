import React from "react";
import Layout from "@/components/Layout";

function Page() {
  return (
    <Layout>
      <h1> New Product</h1>
      <label> Product Name</label>
      <input type="text" placeholder="product name" />
      <label> Description </label>
      <textarea placeholder="description"></textarea>
      <label> Price &#40;in USD&#41;</label>
      <input type="text" placeholder="price" />
      <button className="btn-primary">Save</button>
    </Layout>
  );
}

export default Page;
