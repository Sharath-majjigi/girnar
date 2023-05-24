import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import { BASE_URL } from "./api_base_url";

const getSalesCategories = async (setSalesCategories, refreshToken) => {
  try {
    const res = await axios({
      method: "get",
      url: `${BASE_URL}sales-category/`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });

    if (res.status === 200) {
      setSalesCategories(res.data);
    }
  } catch (error) {
    toast.error("Error occurred while getting the sales categories");
  }
};

const postSalesCategory = async (details, refreshToken) => {
    try {
      const res = await axios({
        method: "post",
        url: `${BASE_URL}sales-category/`,
        headers: { authorization: `Bearer ${refreshToken}` },
        data: {
          ...details,
        },
      });
      if (res.status === 201) {
        Router.push("/sales-category");
        toast.success("Sales category added successfully");
      }
    } catch (err) {
      toast.error("Error while adding sales category");
    }
  };

const deleteSalesCategory = async (
  type,
  setSalesCategories,
  refreshToken,
  getSalesCategories
) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${BASE_URL}sales-category/${type}`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      toast.success("Sales category deleted successfully");
      getSalesCategories(setSalesCategories, refreshToken);
    }
  } catch (error) {
    toast.error("Error occurred while deleting the sales category");
  }
};

export { getSalesCategories, postSalesCategory, deleteSalesCategory };
