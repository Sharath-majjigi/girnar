import React from "react";

const SalesReceiptModal = ({
  salesReceiptDetails,
  cancel,
  isDelete,
  deleteUser,
}) => {
  const labelStyle = "w-32 font-semibold";
  
  return (
    <>
      <div className="absolute inset-0 bg-slate-200 opacity-30"></div>
      <section className="w-3/4 max-h-[38rem] overflow-scroll border-2 border-slate-400 rounded bg-white px-8 py-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-2xl font-semibold w-fit mx-auto mb-3">
          User Details
        </h2>
        <div className="flex gap-4">
          <p className={labelStyle}>Id:</p>
          <p>{salesReceiptDetails?.user?.userid}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Name:</p>
          <p>{salesReceiptDetails?.user?.userName}</p>
        </div>
        <h2 className="text-2xl font-semibold w-fit mx-auto my-3">
          Sales Receipt Details
        </h2>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Id:</p>
          <p>{salesReceiptDetails?.id}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Description:</p>
          <p>{salesReceiptDetails?.description}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Date:</p>
          <p>{salesReceiptDetails?.date}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Amount Received:</p>
          <p>{salesReceiptDetails?.amountReceived}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Receipt Type:</p>
          <p>{salesReceiptDetails?.receiptType}</p>
        </div>
        <h2 className="text-2xl font-semibold w-fit mx-auto my-3">
          Customer Details
        </h2>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Name:</p>
          <p>{salesReceiptDetails?.salesHeader?.customer?.customerName}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Email:</p>
          <p>{salesReceiptDetails?.salesHeader?.customer?.email}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Phone:</p>
          <p>{salesReceiptDetails?.salesHeader?.customer?.telephone}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Address1:</p>
          <p>{salesReceiptDetails?.salesHeader?.customer?.addressLine1}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Address2:</p>
          <p>{salesReceiptDetails?.salesHeader?.customer?.addressLine2}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">City:</p>
          <p>{salesReceiptDetails?.salesHeader?.customer?.city}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Country:</p>
          <p>{salesReceiptDetails?.salesHeader?.customer?.country}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Postal Code:</p>
          <p>{salesReceiptDetails?.salesHeader?.customer?.postalCode}</p>
        </div>
        <h2 className="text-2xl font-semibold mt-4 w-fit mx-auto mb-3">
          Sales Entry Details
        </h2>
        <div className="flex gap-4">
          <p className={labelStyle}>Id:</p>
          <p>{salesReceiptDetails?.salesHeader?.id}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Description:</p>
          <p>{salesReceiptDetails?.salesHeader?.description}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Message:</p>
          <p>{salesReceiptDetails?.salesHeader?.message}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Sales Category:</p>
          <p>{salesReceiptDetails?.salesHeader?.salesCat}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Total Invoice Amount:</p>
          <p>{salesReceiptDetails?.salesHeader?.totalInvoiceAmt}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Date:</p>
          <p>{salesReceiptDetails?.salesHeader?.date}</p>
        </div>
        <table className="table table-striped mt-4 mb-10">
          <thead>
            <tr>
              <th className="text-center border-x-2">id</th>
              <th className="text-center border-r-2">PO Number</th>
            </tr>
          </thead>
          <tbody>
            {salesReceiptDetails?.salesHeader?.salesDetailList?.map((sales) => (
              <tr key={sales.id}>
                <td>{sales?.id}</td>
                <td>{sales?.poNumber}</td>
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

export { SalesReceiptModal };
