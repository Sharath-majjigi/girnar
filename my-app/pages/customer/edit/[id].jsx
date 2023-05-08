import { CustomerForm } from "@/components";
import { useRouter } from "next/router";
import React from "react";

const EditCustomer = () => {
  const {
    query: { id },
  } = useRouter();

  return <CustomerForm isEdit={true} id={id} />;
};

export default EditCustomer;
