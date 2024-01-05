"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function ProductsForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}) {
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProudcts, setGoToProducts] = useState(false);

  const uploadPhoto = async (ev) => {
    const files = ev.target?.files;
    if (files.length > 0) {
      const data = new FormData();
      files.forEach((file) => {
        data.append("file", file);
      });
      const response = await axios.post("/api/upload", data);
      console.log(response.data);
    }
  };

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
      <label> Photos </label>
      <div className="mb-2">
        <label className="w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload </div>
          <input type="file" className="hidden" onChange={uploadPhoto} />
        </label>
        {!images?.length && <div>No Photos in this Product</div>}
      </div>
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
