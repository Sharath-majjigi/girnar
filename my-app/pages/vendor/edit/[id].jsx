import AddEdit from "@/components/user/AddEdit";
import { useRouter } from "next/router";
import React from "react";

const EditVendor = () => {
  const {query: {id}} = useRouter();
  console.log(id)
  return <AddEdit isEdit={true} id={id} />;
};

export default EditVendor;
