import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";

const VendorForm = ({ isEdit, id }) => {
  const initialState = {
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    email: "",
    notes: "",
    postalCode: "",
    telephone: "",
    vendorName: "",
  };
  const [vendor, setVendor] = useState({ ...initialState });
  const [error, setError] = useState({
    postCodeError: false,
    phoneError: false,
    emailError: false,
  });

  const {
    addressLine1,
    addressLine2,
    vendorName,
    telephone,
    notes,
    email,
    country,
    city,
    postalCode,
  } = vendor;
  const { postCodeError, phoneError, emailError } = error;

  const getVendorById = async (id) => {
    try {
      const response = await axios({
        method: "get",
        url: `http://18.139.85.219:8088/api/v1/vendor/${id}`,
        headers: { authorization: `Bearer ${refreshToken}` },
      });
      if (response.status === 200) {
        const data = response.data;
        delete data.id;
        setVendor({ ...data });
      }
    } catch (error) {
      toast.error("error occurred while getting vendor data by id");
    }
  };

  useEffect(() => {
    if (isEdit) {
      getVendorById(id);
    }
  }, [isEdit, id, getVendorById]);

  let user;
  let refreshToken;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    refreshToken = JSON.parse(user)?.refresh_token;
  }

  const handleInput = (e) => {
    setVendor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addVendor = async (vendor, postCodeError, phoneError, emailError) => {
    try {
      if (postCodeError || phoneError || emailError) {
        toast.warn("Rectify errors to add vendor");
      } else {
        const response = await axios({
          method: "post",
          url: "http://18.139.85.219:8088/api/v1/vendor",
          headers: { authorization: `Bearer ${refreshToken}` },
          data: {
            ...vendor,
          },
        });
        if (response.status === 201) {
          toast.success("Vendor added successfully");
          setVendor({ ...initialState });
          Router.push("/vendor");
        }
      }
    } catch (error) {
      toast.error("Error occurred while adding vendor");
    }
  };

  const updateVendor = async (
    vendor,
    id,
    postCodeError,
    phoneError,
    emailError
  ) => {
    try {
      if (postCodeError || phoneError || emailError) {
        toast.warn("Rectify errors to update vendor");
      } else {
        const response = await axios({
          method: "put",
          url: `http://18.139.85.219:8088/api/v1/vendor/${id}`,
          headers: { authorization: `Bearer ${refreshToken}` },
          data: {
            ...vendor,
          },
        });
        if (response.status === 200) {
          toast.success("Vendor updated successfully");
          setVendor({ ...initialState });
          Router.push("/vendor");
        }
      }
    } catch (error) {
      toast.error("Error occurred while updating vendor");
    }
  };
  const inputStyle = "border-2 border-black rounded outline-0 px-2 py-1";
  const containerStyle = "flex flex-col";

  return (
    <section className="w-[40%] flex flex-wrap gap-10 mx-auto mt-8">
      <div className={containerStyle}>
        <label htmlFor="full-name">Full Name</label>
        <input
          type="text"
          id="full-name"
          className={inputStyle}
          name="vendorName"
          value={vendorName}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className={containerStyle}>
        <label htmlFor="address1">Address (Line 1)</label>
        <input
          type="text"
          id="address1"
          className={inputStyle}
          name="addressLine1"
          value={addressLine1}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className={containerStyle}>
        <label htmlFor="addressLine2">Address (Line 2)</label>
        <input
          type="text"
          id="addressLine2"
          className={inputStyle}
          name="addressLine2"
          value={addressLine2}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className={containerStyle}>
        <label htmlFor="post-code">Post Code</label>
        <input
          type="text"
          id="post-code"
          className={inputStyle}
          name="postalCode"
          value={postalCode}
          maxLength="6"
          onChange={(e) => {
            if (/^\d+$/.test(e.target.value)) {
              if (postCodeError) {
                setError((prev) => ({ ...prev, postCodeError: false }));
              }
              handleInput(e);
            } else {
              setError((prev) => ({ ...prev, postCodeError: true }));
            }
          }}
        />
        {postCodeError && <p className="text-red-500">Enter only numbers</p>}
      </div>
      <div className={containerStyle}>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          className={inputStyle}
          name="country"
          value={country}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className={containerStyle}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          className={inputStyle}
          name="city"
          value={city}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className={containerStyle}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          className={inputStyle}
          name="email"
          value={email}
          onChange={(e) => {
            if (
              e.target.value.match(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
              )
            ) {
              setError((prev) => ({ ...prev, emailError: false }));
            } else {
              if (!emailError) {
                setError((prev) => ({ ...prev, emailError: true }));
              }
            }
            handleInput(e);
          }}
        />
        {emailError && (
          <p className="text-red-500">Enter valid email address</p>
        )}
      </div>
      <div className={containerStyle}>
        <label htmlFor="telephone">Telephone</label>
        <input
          type="text"
          id="telephone"
          className={inputStyle}
          name="telephone"
          value={telephone}
          maxLength="10"
          onChange={(e) => {
            if (/^\d+$/.test(e.target.value)) {
              if (e.target.value.length !== 10) {
                setError((prev) => ({ ...prev, phoneError: true }));
              } else {
                setError((prev) => ({ ...prev, phoneError: false }));
              }
              handleInput(e);
            } else {
              setError((prev) => ({ ...prev, phoneError: true }));
            }
          }}
        />
        {phoneError && (
          <p className="text-red-500">
            Enter only numbers and length should be 10
          </p>
        )}
      </div>
      <div className={containerStyle}>
        <label htmlFor="notes">Notes</label>
        <input
          type="text"
          id="notes"
          className={inputStyle}
          name="notes"
          value={notes}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className="flex gap-2 justify-center">
        {isEdit ? (
          <button
            className="px-6 py-1 border-2 border-black rounded"
            onClick={() =>
              updateVendor(vendor, id, postCodeError, phoneError, emailError)
            }
          >
            Update
          </button>
        ) : (
          <button
            className="px-6 py-1 text-white border-2 border-green-500 bg-green-500 rounded"
            onClick={() =>
              addVendor(vendor, postCodeError, phoneError, emailError)
            }
          >
            Save
          </button>
        )}
        <button
          className="px-6 py-1 border-2 border-red-500 text-red-500 rounded"
          onClick={() => {
            setVendor({ ...initialState });
            Router.push("/vendor");
          }}
        >
          Cancel
        </button>
      </div>
    </section>
  );
};

export { VendorForm };
