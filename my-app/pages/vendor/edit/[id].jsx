import { VendorForm } from "@/components";
import { useRouter } from "next/router";
import React from "react";

const EditVendor = () => {
  const {
    query: { id },
  } = useRouter();
  console.log(id);
  return <VendorForm isEdit={true} id={id} />;
};

export default EditVendor;
