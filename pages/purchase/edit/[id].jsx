import { PurchaseForm } from "@/components";
import { useRouter } from "next/router";
import React from "react";

const EditPurchase = () => {
  const {
    query: { id },
  } = useRouter();
  
  return <PurchaseForm isEdit={true} id={id} />;
};

export default EditPurchase;
