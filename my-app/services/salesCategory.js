import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

const getSalesCategories = async (setSalesCategories, refreshToken) => {
  try {
    const res = await axios({
      method: "get",
      url: "http://18.139.85.219:8088/api/v1/sales-category/",
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
        url: `http://18.139.85.219:8088/api/v1/sales-category/`,
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
      url: `http://18.139.85.219:8088/api/v1/sales-category/${type}`,
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
