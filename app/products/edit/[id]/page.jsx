"use client";
import Layout from "@/components/Layout";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductsForm from "@/components/ProductsForm";

function Page() {
  const [productInfo, setProductInfo] = useState(null);
  const params = useParams();
  useEffect(() => {
    if (!params.id) {
      return;
    }
    axios.get("/api/products?id=" + params.id).then((response) => {
      setProductInfo(response.data);
    });
  }, [params.id]);

  console.log({ ...productInfo });
  return (
    <Layout>
      <h1> Edit Product</h1>
      {productInfo && <ProductsForm {...productInfo} />}
    </Layout>
  );
}

export default Page;
