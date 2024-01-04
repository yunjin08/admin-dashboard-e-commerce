"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function ProductsForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProudcts, setGoToProducts] = useState(false);

  const saveProduct = async (ev) => {
    ev.preventDefault();
    const data = { title, description, price };

    if (!title || !price) {
      console.error("Title and price are required");
      return;
    }

    try {
      if (_id) {
        await axios.patch(`/api/products/edit/${_id}`, { ...data });
      } else {
        await axios.post("/api/products", data);
      }
      setGoToProducts(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (goToProudcts) {
    return router.push("/products");
  }
  return (
    <form onSubmit={saveProduct}>
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
