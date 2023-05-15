import React from "react";

const UserModal = ({ user, cancel, name, isDelete, deleteUser }) => {
  return (
    <>
      <div className="absolute inset-0 bg-slate-200 opacity-70"></div>
      <section className="w-1/2 border-2 border-slate-400 rounded bg-white px-8 py-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-2xl font-semibold w-fit mx-auto mb-3">
          {name === "vendor" ? "Vendor Details" : "Customer Details"}
        </h2>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Name:</p>
          <p>{name === "vendor" ? user.vendorName : user.customerName}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Email:</p>
          <p>{user.email}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Phone:</p>
          <p>{user.telephone}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Address1:</p>
          <p>{user.addressLine1}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Address2:</p>
          <p>{user.addressLine2}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">City:</p>
          <p>{user.city}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Country:</p>
          <p>{user.country}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Postal Code:</p>
          <p>{user.postalCode}</p>
        </div>
        <div className="flex gap-4 items-center justify-center">
          {isDelete && (
            <button
              className="bg-red-500 px-6 py-2 text-white rounded border-0 mt-4"
              onClick={() => {
                deleteUser();
                cancel();
              }}
            >
              Delete
            </button>
          )}
          <button
            className="border-2 border-red-500 text-red-500 px-6 py-2 rounded mt-4"
            onClick={() => cancel()}
          >
            Cancel
          </button>
        </div>
      </section>
    </>
  );
};

export { UserModal };
