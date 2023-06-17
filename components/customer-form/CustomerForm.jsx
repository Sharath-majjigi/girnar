import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";
import { BASE_URL } from "@/services/api_base_url";

const CustomerForm = ({ isEdit, id }) => {
  const initialState = {
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    email: "",
    notes: "",
    postalCode: "",
    telephone: "",
    customerName: "",
  };
  const [customer, setCustomer] = useState({ ...initialState });
  const [error, setError] = useState({
    postCodeError: false,
    phoneError: false,
    emailError: false,
  });

  const {
    addressLine1,
    addressLine2,
    customerName,
    telephone,
    notes,
    email,
    country,
    city,
    postalCode,
  } = customer;
  const { postCodeError, phoneError, emailError } = error;

  const getCustomerById = async (id) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL}customer/${id}`,
        headers: { authorization: `Bearer ${refreshToken}` },
      });
      if (response.status === 200) {
        const data = response.data;
        delete data.id;
        setCustomer({ ...data });
      }
    } catch (error) {
      toast.error("error occurred while getting customer data by id");
    }
  };

  let user;
  let refreshToken;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    refreshToken = JSON.parse(user)?.refresh_token;
  }

  const memorizedGetCustomerById = useCallback(getCustomerById, [refreshToken]);

  useEffect(() => {
    if (isEdit) {
      memorizedGetCustomerById(id);
    }
  }, [isEdit, id, memorizedGetCustomerById]);

  const handleInput = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addCustomer = async (
    customer,
    postCodeError,
    phoneError,
    emailError
  ) => {
    try {
      if (postCodeError || phoneError || emailError) {
        toast.warn("Rectify errors to add customer");
      } else {
        const response = await axios({
          method: "post",
          url: `${BASE_URL}customer`,
          headers: { authorization: `Bearer ${refreshToken}` },
          data: {
            ...customer,
          },
        });
        if (response.status === 201) {
          toast.success("Customer added successfully");
          setCustomer({ ...initialState });
          Router.push("/customer");
        }
      }
    } catch (error) {
      toast.error("Error oocured while saving Customer ");
    }
  };

  const updateCustomer = async (
    customer,
    id,
    postCodeError,
    phoneError,
    emailError
  ) => {
    try {
      if (postCodeError || phoneError || emailError) {
        toast.warn("Rectify errors to update customer");
      } else {
        const response = await axios({
          method: "put",
          url: `${BASE_URL}customer/${id}`,
          headers: { authorization: `Bearer ${refreshToken}` },
          data: {
            ...customer,
          },
        });
        if (response.status === 200) {
          toast.success("Customer updated successfully");
          setCustomer({ ...initialState });
          Router.push("/customer");
        }
      }
    } catch (error) {
      toast.error("Error occurred while updating customer");
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
          name="customerName"
          value={customerName}
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
          maxLength="10"
          minLength="3"
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
          maxLength="15"
          minLength="6"
          onChange={(e) => {
            if (/^\d+$/.test(e.target.value)) {
              if (e.target.value.length >=6 && e.target.value.length<=15 ) {
                setError((prev) => ({ ...prev, phoneError: false }));
              } 
              else {
                setError((prev) => ({ ...prev, phoneError: true }));
              }
              handleInput(e);
            } else {
              setError((prev) => ({ ...prev, phoneError: true }));
            }
          }}
        />
        {phoneError && (
          <p className="text-red-500">
            Enter only numbers and length should be 6-15
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
            className="px-6 py-1 text-white border-2 border-green-500 bg-green-500 rounded"
            onClick={() =>
              updateCustomer(
                customer,
                id,
                postCodeError,
                phoneError,
                emailError
              )
            }
          >
            Update
          </button>
        ) : (
          <button
            className="px-6 py-1 text-white border-2 border-green-500 bg-green-500 rounded"
            onClick={() =>
              addCustomer(customer, postCodeError, phoneError, emailError)
            }
          >
            Save
          </button>
        )}
        <button
          className="px-6 py-1 border-2 border-red-500 text-red-500 rounded"
          onClick={() => {
            setCustomer({ ...initialState });
            Router.push("/customer");
          }}
        >
          Cancel
        </button>
      </div>
    </section>
  );
};

export { CustomerForm };
