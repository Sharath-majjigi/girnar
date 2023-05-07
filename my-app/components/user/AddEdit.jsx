import { useState } from "react";
import axios from "axios";

const AddEdit = () => {
  const [vendor, setVendor] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    email: "",
    notes: "",
    postalCode: "",
    telephone: "",
    vendorName: "",
  });
  const [error, setError] = useState({
    postCodeError: false,
  });

  const { postCodeError } = error;

  let user;
  let refreshToken;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    refreshToken = JSON.parse(user)?.refresh_token;
  }

  const handleInput = (e) => {
    setVendor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addVendor = async (vendor) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://18.139.85.219:8088/api/v1/vendor",
        headers: { authorization: `Bearer ${refreshToken}` },
        data: {
          ...vendor,
        },
      });
      if (response.status === 201) {
        console.log("success");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const inputStyle = "border-2 border-black rounded outline-0 px-2 py-1";
  const containerStyle = "flex flex-col";
console.log(vendor.postalCode);
  return (
    <section className="w-[40%] flex flex-wrap gap-10 mx-auto mt-8">
      <div className={containerStyle}>
        <label htmlFor="full-name">Full Name</label>
        <input
          type="text"
          id="full-name"
          className={inputStyle}
          name="vendorName"
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
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className={containerStyle}>
        <label htmlFor="address2">Address (Line 2)</label>
        <input
          type="text"
          id="addressLine2"
          className={inputStyle}
          name="address2"
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
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className={containerStyle}>
        <label htmlFor="telephone">Telephone</label>
        <input
          type="text"
          id="telephone"
          className={inputStyle}
          name="telephone"
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className={containerStyle}>
        <label htmlFor="notes">Notes</label>
        <input
          type="text"
          id="notes"
          className={inputStyle}
          name="notes"
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className="flex gap-2 justify-center">
        <button
          className="px-6 py-1 border-2 border-black rounded"
          onClick={() => addVendor(vendor)}
        >
          Save
        </button>
        <button className="px-6 py-1 border-2 border-black rounded">
          Reset
        </button>
        <button className="px-6 py-1 border-2 border-black rounded">
          Cancel
        </button>
      </div>
    </section>
  );
};

export default AddEdit;
