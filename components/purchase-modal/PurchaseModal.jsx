import React from "react";

const PurchaseModal = ({ purchaseDetails, cancel, isDelete, deleteUser }) => {
  const labelStyle = "w-32 font-semibold";
  
  return (
    <>
      <div className="absolute inset-0 bg-slate-200 opacity-70"></div>
      <section className="w-3/4 max-h-[38rem] overflow-scroll border-2 border-slate-400 rounded bg-white px-8 py-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-2xl font-semibold w-fit mx-auto mb-3">
          User Details
        </h2>
        <div className="flex gap-4">
          <p className={labelStyle}>Id:</p>
          <p>{purchaseDetails?.user?.userid}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Name:</p>
          <p>{purchaseDetails?.user?.userName}</p>
        </div>
        <h2 className="text-2xl font-semibold w-fit mx-auto my-3">
          Vendor Details
        </h2>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Name:</p>
          <p>{purchaseDetails?.vendor?.vendorName}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Email:</p>
          <p>{purchaseDetails?.vendor?.email}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Phone:</p>
          <p>{purchaseDetails?.vendor?.telephone}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Address1:</p>
          <p>{purchaseDetails?.vendor?.addressLine1}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Address2:</p>
          <p>{purchaseDetails?.vendor?.addressLine2}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">City:</p>
          <p>{purchaseDetails?.vendor?.city}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Country:</p>
          <p>{purchaseDetails?.vendor?.country}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Postal Code:</p>
          <p>{purchaseDetails?.vendor?.postalCode}</p>
        </div>
        <h2 className="text-2xl font-semibold mt-4 w-fit mx-auto mb-3">
          Purchase Order Details
        </h2>
        <div className="flex gap-4">
          <p className={labelStyle}>Id:</p>
          <p>{purchaseDetails?.id}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Description:</p>
          <p>{purchaseDetails?.description}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Remarks:</p>
          <p>{purchaseDetails?.remarks}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Amount:</p>
          <p>{purchaseDetails?.amount}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Sell Amount:</p>
          <p>{purchaseDetails?.sellAmount}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Date:</p>
          <p>{purchaseDetails?.poDate}</p>
        </div>
        <table className="table table-striped mt-4 mb-10">
          <thead>
            <tr>
              <th className="text-center border-x-2">id</th>
              <th className="text-center border-r-2">PAX Name</th>
              <th className="text-center border-r-2">Description 1</th>
              <th className="text-center border-r-2">Description 2</th>
              <th className="text-center border-r-2">Purchase Cost</th>
              <th className="text-center border-r-2">Sell Price</th>
            </tr>
          </thead>
          <tbody>
            {purchaseDetails?.pod?.map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase?.id}</td>
                <td>{purchase?.paxName}</td>
                <td>{purchase?.description1}</td>
                <td>{purchase?.description2}</td>
                <td>{purchase?.purchaseCost}</td>
                <td>{purchase?.sellPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-4 items-center justify-center">
          {isDelete && (
            <button
              className="bg-red-500 px-6 py-2 text-white rounded border-0"
              onClick={() => {
                deleteUser();
                cancel();
              }}
            >
              Delete
            </button>
          )}
          <button
            className="border-2 border-red-500 text-red-500 px-6 py-2 rounded"
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
