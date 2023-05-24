import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "./api_base_url";

const getVendors = async (setUsers, refreshToken) => {
  try {
    const res = await axios({
      method: "get",
      url: `${BASE_URL}vendor/`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      setUsers(res.data);
    }
  } catch (error) {
    toast.error("Error occurred while getting the vendor list");
  }
};

const deleteVendor = async (id, getVendors, refreshToken, setUsers) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${BASE_URL}vendor/${id}`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      toast.success("Successfully deleted the vendor");
      getVendors(setUsers, refreshToken);
    }
  } catch (error) {
    toast.error("Error occurred while deleting the vendor");
  }
};

export { getVendors, deleteVendor };
