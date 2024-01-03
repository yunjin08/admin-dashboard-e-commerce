import Link from "next/link";
import Layout from "@/components/Layout";
import React from "react";

function Page() {
  return (
    <Layout>
      <Link
        href={"/products/new"}
        className="bg-blue-900 rounded-md text-white py-1 px-2 "
      >
        Add New Products
      </Link>
    </Layout>
  );
}

export default Page;
