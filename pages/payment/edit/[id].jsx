import { PaymentForm } from "@/components";
import { useRouter } from "next/router";
import React from "react";

const EditPayment = () => {
  const {
    query: { id },
  } = useRouter();
  
  return <PaymentForm isEdit={true} id={id} />;
};

export default EditPayment;
