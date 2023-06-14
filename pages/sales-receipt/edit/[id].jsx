import { SalesReceiptForm } from "@/components";
import { useRouter } from "next/router";
import React from "react";

const EditSalesReceipt = () => {
  const {
    query: { id },
  } = useRouter();
  
  return <SalesReceiptForm isEdit={true} id={id} />;
};

export default EditSalesReceipt;
