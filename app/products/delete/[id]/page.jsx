"use client";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const params = useParams();
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!params.id) {
      return;
    }
    axios.get(`/api/products/edit/${params.id}`).then((response) => {
      setProductInfo(response.data);
    });
  }, [params.id]);

  const goBack = () => {
    router.push("/products");
  };

  const deleteProduct = async () => {
    await axios.delete(`/api/products/edit/${params.id}`);
    goBack();
  };

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete &nbsp;&quot;{productInfo?.title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        {" "}
        <button onClick={deleteProduct} className="btn_red">
          Yes
        </button>
        <button className="btn_default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}

export default Page;
