import { SalesEntryForm } from "@/components";
import { useRouter } from "next/router";
import React from "react";

const EditSalesEntry = () => {
  const {
    query: { id },
  } = useRouter();
  
  return <SalesEntryForm isEdit={true} id={id} />;
};

export default EditSalesEntry;
