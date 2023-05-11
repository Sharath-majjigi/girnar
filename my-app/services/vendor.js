import axios from "axios";
import { toast } from "react-toastify";

let user;
let refreshToken;
if (typeof window !== "undefined") {
  user = localStorage.getItem("user");
  refreshToken = JSON.parse(user)?.refresh_token;
}

const getVendors = async (setUsers) => {
  try {
    const res = await axios({
      method: "get",
      url: "http://18.139.85.219:8088/api/v1/vendor/",
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      setUsers(res.data);
    }
  } catch (error) {
    toast.error("Error occurred while getting the vendor list");
  }
};

const deleteVendor = async (id, getVendors) => {
  try {
    const res = await axios({
      method: "delete",
      url: `http://18.139.85.219:8088/api/v1/vendor/${id}`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      toast.success("Successfully deleted the vendor");
      getVendors();
    }
  } catch (error) {
    toast.error("Error occurred while deleting the vendor");
  }
};

export { getVendors, deleteVendor };
