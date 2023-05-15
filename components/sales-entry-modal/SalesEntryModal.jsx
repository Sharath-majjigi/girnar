import React from "react";

const SalesEntryModal = ({
  salesEntryDetails,
  cancel,
  isDelete,
  deleteUser,
}) => {
  const labelStyle = "w-32 font-semibold";
  console.log(salesEntryDetails);
  return (
    <>
      <div className="absolute inset-0 bg-slate-200 opacity-30"></div>
      <section className="w-3/4 max-h-[38rem] overflow-scroll border-2 border-slate-400 rounded bg-white px-8 py-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-2xl font-semibold w-fit mx-auto mb-3">
          User Details
        </h2>
        <div className="flex gap-4">
          <p className={labelStyle}>Id:</p>
          <p>{salesEntryDetails?.user?.userid}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Name:</p>
          <p>{salesEntryDetails?.user?.userName}</p>
        </div>
        <h2 className="text-2xl font-semibold w-fit mx-auto my-3">
          Customer Details
        </h2>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Name:</p>
          <p>{salesEntryDetails?.customer?.customerName}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Email:</p>
          <p>{salesEntryDetails?.customer?.email}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Phone:</p>
          <p>{salesEntryDetails?.customer?.telephone}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Address1:</p>
          <p>{salesEntryDetails?.customer?.addressLine1}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Address2:</p>
          <p>{salesEntryDetails?.customer?.addressLine2}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">City:</p>
          <p>{salesEntryDetails?.customer?.city}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Country:</p>
          <p>{salesEntryDetails?.customer?.country}</p>
        </div>
        <div className="flex gap-4">
          <p className="w-24 font-semibold">Postal Code:</p>
          <p>{salesEntryDetails?.customer?.postalCode}</p>
        </div>
        <h2 className="text-2xl font-semibold mt-4 w-fit mx-auto mb-3">
          Sales Entry Details
        </h2>
        <div className="flex gap-4">
          <p className={labelStyle}>Id:</p>
          <p>{salesEntryDetails?.id}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Description:</p>
          <p>{salesEntryDetails?.description}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Message:</p>
          <p>{salesEntryDetails?.message}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Sales Category:</p>
          <p>{salesEntryDetails?.salesCat}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Total Invoice Amount:</p>
          <p>{salesEntryDetails?.totalInvoiceAmt}</p>
        </div>
        <div className="flex gap-4">
          <p className={labelStyle}>Date:</p>
          <p>{salesEntryDetails?.date}</p>
        </div>
        <table className="table table-striped mt-4 mb-10">
          <thead>
            <tr>
              <th className="text-center border-x-2">id</th>
              <th className="text-center border-r-2">PO Number</th>
            </tr>
          </thead>
          <tbody>
            {salesEntryDetails?.salesDetailList?.map((sales) => (
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

export { SalesEntryModal };
