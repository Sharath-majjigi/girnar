import React, { useState } from 'react'

const Payment = () => {
    const [rows, setRows] = useState([{ ReceiptId: '', Description: '', PaymentType: '', DataReceived: '', AmountReceived: '' }])
    // Function for adding a new row
    const handleAddRow = () => {
        setRows([...rows, { ReceiptId: '', Description: '', PaymentType: '', DataReceived: '', AmountReceived: '' }]);
    }
    // Function for deleting a row
    const handleDeleteRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    }
    const vendors = ["customer 1", "customer 2", "customer 3"]
    return (
        <div>

            <div className='p-[5%]'>

                <h1 style={{ textAlign: 'center', fontWeight: 'bold' }} className='pb-5 py-3'>Receipts</h1>
                <div className='flex justify-evenly'>
                    {/* <div style={{ display: 'flex', justifyContent: 'space-evenly' ,textAlign:'center', marginTop:'40px',alignItems:'center' }}> */}
                    <div>
                        <label htmlform="userId" className='px-3'>Invoice Number: </label>
                        <input type="text" id="userId" readOnly={true} placeholder='Invoice No' className='border-2 p-2 border-black ' />
                    </div>
                    <div>
                        <label htmlform="poDate" className='px-3'>Invoice Date:</label>
                        <input type="date" id="poDate" className='border-2 p-2 border-black ' />
                    </div>
                    <div>
                        <label htmlform="userId" className='px-3'>User ID:</label>
                        <input type="text" id="userId" readOnly={true} placeholder='USER_ID' className='border-2 p-2 border-black ' />
                    </div>
                </div>

                <div className="w-full flex justify-between text-center py-7 px-[19vh]">
                    <div>

                        <label htmlform="vendor" className='px-3'>Customer: </label>
                        <input type="text" id="poNumber" className='border-2  p-2 border-black ' placeholder='Customer' />
                    </div>
                    <div className='flex justify-center'>

                        <label htmlform="vendor" className='pr-2 pl-[4vh]'>Sales Category:</label>
                        <select id="vendor" className=' border-2 w-[24vh] pl-[6vh] p-2 border-black '>
                            {vendors.map((vendor) => (
                                <option key={vendor} value={vendor}>{vendor}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className=' w-full mb-9'>
                    <div className='w-full py-4 flex justify-around'>

                        <div className='w-[40%]'>
                            <label htmlform="poNumber" className='px-3'>Description:</label>
                            <input type="text" id="poNumber" className='border-2  p-2 border-black ' placeholder='Description' />
                        </div>
                        <div>
                            <label htmlform="poNumber" className='px-3'>Message:</label>
                            <input type="text" id="poNumber" className='border-2 p-2 border-black ' placeholder='Message' />
                        </div>
                    </div>
                    <div className='w-full flex justify-around'>
                        <div className='w-[40%]'>


                            <label htmlform="poNumber" className=''>Invoice Amount : </label>
                            <input type="text" id="poNumber" className='border-2  p-2 border-black ' placeholder='Invoice Amount' />
                        </div>
                        <div>
                            <label htmlform="poNumber" className='px-3'>Total Paid:</label>
                            <input type="text" id="poNumber" className='border-2 p-2 border-black ' placeholder='Total Paid' />
                        </div>
                    </div>
                </div>
                {/* <div className=' flex flex-col  align-center w-full '> */}
                <div className=' '>

                    <table className='w-full'>
                        <thead>
                            <tr className='w-full'>
                                <th style={{ width: '10%' }}></th>
                                <th style={{ width: '15%' }}>ReceiptId:</th>
                                <th style={{ width: '16%' }}>Description:</th>
                                <th style={{ width: '13%' }}>Payment Type:</th>
                                <th style={{ width: '17%' }}>Data Received:</th>
                                <th style={{ width: '40%' }}>Amount Received:</th>
                            </tr>
                        </thead>
                    </table>


                    {rows.map((row, index) => (
                        <div key={index} className='flex my-3 justify-center space-x-7'  >
                            {/* <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}

                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`ReceiptId_${index}`}>Pax Name:</label> */}
                                <input type="text" id={`ReceiptId_${index}`} className='border-2 border-black ' value={row.ReceiptId} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].ReceiptId = e.target.value;
                                    setRows(newRows);
                                }} />
                            </div>
                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`Description_${index}`}>Description 2:</label> */}
                                <input type="text" id={`Description_${index}`} className='border-2 border-black ' value={row.Description} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].Description = e.target.value;
                                    setRows(newRows);
                                }} />
                            </div>
                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`PaymentType_${index}`}>Description 1:</label> */}
                                <input type="text" id={`PaymentType_${index}`} className='border-2 border-black ' value={row.PaymentType} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].PaymentType = e.target.value;
                                    setRows(newRows);
                                }} />
                            </div>
                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`Description_${index}`}>Purchase Cost:</label> */}
                                <input type="text" id={`Description_${index}`} className='border-2 border-black ' value={row.DataReceived} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].DataReceived = e.target.value;
                                    setRows(newRows);
                                }} />
                            </div>
                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`Description_${index}`}>Sell Price:</label> */}
                                <input type="text" id={`Description_${index}`} className='border-2 border-black ' value={row.AmountReceived} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].AmountReceived = e.target.value;
                                    setRows(newRows);
                                }} />
                            </div>
                            <button
                                onClick={() => handleDeleteRow(row.id)}
                                className="bg-red-600 rounded-md mb-4 px-4 h-10 "
                            >
                                Delete
                            </button>
                        </div>


                    ))

                    }


                </div>
                <div className=''>


                    <button type='submit' onClick={handleAddRow} className='bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Add</button>

                    {/* <button onClick={handleDeleteRow} className='bg-red-500 mx-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md'>Delete</button> */}
                </div>
                <div className='flex justify-center'>

                    <button className='bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Save</button>
                    <button className='bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Cancle</button>
                    {/* <button className='bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Create Invoice</button> */}
                </div>
            </div >
        </div>

    )
}

export default Payment