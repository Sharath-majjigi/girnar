import React from "react";

const PaymentModal = ({ payment, cancel, isDelete, deleteUser }) => {
  const labelStyle = "w-32 font-semibold";

  return (
    <>
      <div className="absolute inset-0 bg-slate-200 opacity-40"></div>
      <section className="w-3/4 max-h-[38rem] overflow-scroll border-2 border-slate-400 rounded bg-white px-8 py-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-2xl font-semibold w-fit mx-auto mb-3">
          Payment Details
        </h2>
        <div className="flex gap-4">
          <p className={labelStyle}>Description:</p>
          <p>{payment?.description}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Date:</p>
          <p>{payment?.date}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Amount Paid:</p>
          <p>{payment?.amountPaid}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Id:</p>
          <p>{payment?.id}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Payment Type:</p>
          <p>{payment?.paymentType}</p>
        </div>

        <h2 className="text-2xl font-semibold w-fit mx-auto mb-3">
          User Details
        </h2>
        <div className="flex gap-4">
          <p className={labelStyle}>Id:</p>
          <p>{payment?.user?.userid}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Name:</p>
          <p>{payment?.user?.userName}</p>
        </div>

        <h2 className="text-2xl font-semibold w-fit mx-auto mb-3">
          Purchase Order Details
        </h2>
        <div className="flex gap-4">
          <p className={labelStyle}>Id:</p>
          <p>{payment?.purchaseOrderHeader?.id}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Description:</p>
          <p>{payment?.purchaseOrderHeader?.description}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Amount:</p>
          <p>{payment?.purchaseOrderHeader?.amount}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Remarks:</p>
          <p>{payment?.purchaseOrderHeader?.remarks}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Sell Amount:</p>
          <p>{payment?.purchaseOrderHeader?.sellAmount}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Date:</p>
          <p>{payment?.purchaseOrderHeader?.poDate}</p>
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
            {payment?.purchaseOrderHeader?.pod?.map((user) => (
              <tr key={user.id}>
                <td>{user?.id}</td>
                <td>{user?.paxName}</td>
                <td>{user?.description1}</td>
                <td>{user?.description2}</td>
                <td>{user?.purchaseCost}</td>
                <td>{user?.sellPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>

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

export { PaymentModal };
