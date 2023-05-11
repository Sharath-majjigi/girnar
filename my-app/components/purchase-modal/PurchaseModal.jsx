import React from "react";

const PurchaseModal = ({ user, cancel, name, isDelete, deleteUser }) => {
   const labelStyle = "w-32 font-semibold";

  return (
    <>
      <div className="absolute inset-0 bg-slate-200 opacity-70"></div>
      <section className="w-1/2 border-2 border-slate-400 rounded bg-white px-8 py-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-2xl font-semibold w-fit mx-auto mb-3">
          {name === "purchase" ? "Purchase Details" : "Payment Details"}
        </h2>
        <div className="flex gap-4">
          <p className={labelStyle}>Vendor Name:</p>
          <p>
            {name === "purchase" ? user.vendor.vendorName : user.customerName}
          </p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>PO Date:</p>
          <p>{user.poDate}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Description:</p>
          <p>{user.description}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Remarks:</p>
          <p>{user.remarks}</p>
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

export { PurchaseModal };
