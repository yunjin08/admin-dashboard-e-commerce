"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function ProductsForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [goToProudcts, setGoToProducts] = useState(false);

  const createProduct = async (ev) => {
    if (!title || !price) {
      console.error("Title and price are required");
      return;
    }
    ev.preventDefault();
    const data = { title, description, price };
    await axios.post("/api/products", data);
    setGoToProducts(true);
  };

  if (goToProudcts) {
    return router.push("/products");
  }
  return (
    <form onSubmit={createProduct}>
      <h1> New Product</h1>
      <label> Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label> Description </label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>
      <label> Price &#40;in USD&#41;</label>
      <input
        type="text"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}

export default ProductsForm;
