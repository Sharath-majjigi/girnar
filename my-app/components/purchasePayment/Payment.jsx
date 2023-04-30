import React, { useState } from 'react'
import Link from 'next/link'
const Payment = () => {
    const [rows, setRows] = useState([{ paymentId: '', description: '', paymentType: '', datePaid: '', amountPaid: '' }])
    // Function for adding a new row
    const handleAddRow = () => {
        setRows([...rows, { paymentId: '', description: '', paymentType: '', datePaid: '', amountPaid: '' }]);
    }
    // Function for deleting a row
    const handleDeleteRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    }
    return (
        <div>

            <div className='p-[5%]'>

                <h1 style={{ textAlign: 'center', fontWeight: 'bold' }} className='pb-5 py-4'>Payment</h1>
                <div className='flex justify-evenly'>
                    {/* <div style={{ display: 'flex', justifyContent: 'space-evenly' ,textAlign:'center', marginTop:'40px',alignItems:'center' }}> */}
                    <div>
                        <label htmlform="userId" className='px-3'>PO Number:</label>
                        <input type="text" id="userId" readOnly={true} placeholder='PO Number' className='border-2 p-2 border-black ' />
                    </div>
                    <div>
                        <label htmlform="poDate" className='px-3'>PO Date:</label>
                        <input type="date" id="poDate" className='border-2 p-2 border-black ' />
                    </div>
                    <div>
                        <label htmlform="userId" className='px-3'>User ID:</label>
                        <input type="text" id="userId" readOnly={true} placeholder='USER_ID' className='border-2 p-2 border-black ' />
                    </div>
                </div>

                <div className="w-full flex justify-start text-center py-7 px-[23vh]">
                    <label htmlform="vendor" className='px-3'>Vendor:</label>
                    <input type="text" id="poNumber" readOnly={true} className='border-2  p-2 border-black ' placeholder='Vendor' />
                </div>

                <div className=' w-full mb-9'>
                    <div className='w-full py-4 flex justify-around'>

                        <div className='w-[40%]'>
                            <label htmlform="poNumber" className='px-3'>Description:</label>
                            <input type="text" id="poNumber" readOnly={true} className='border-2  p-2 border-black ' placeholder='Description' />
                        </div>
                        <div>
                            <label htmlform="poNumber" className='px-3'>Remarks:</label>
                            <input type="text" id="poNumber" readOnly={true} className='border-2 p-2 border-black ' placeholder='Remarks' />
                        </div>
                    </div>
                    <div className='w-full flex justify-around'>
                        <div className='w-[40%]'>


                            <label htmlform="poNumber" className='px-3'>PO Amount:</label>
                            <input type="text" id="poNumber" readOnly={true} className='border-2  p-2 border-black ' placeholder='PO Amount' />
                        </div>
                        <div>
                            <label htmlform="poNumber" className='px-3'>Sell Total:</label>
                            <input type="text" id="poNumber" className='border-2 p-2 border-black ' />
                        </div>
                    </div>
                </div>
                {/* <div className=' flex flex-col  align-center w-full '> */}
                <div className=' '>

                    <table className='w-full'>
                        <thead>
                            <tr className='w-full'>
                                <th style={{ width: '10%' }}></th>
                                <th style={{ width: '15%' }}>Payment Id:</th>
                                <th style={{ width: '16%' }}>Description :</th>
                                <th style={{ width: '13%' }}>Payment Type :</th>
                                <th style={{ width: '17%' }}>Date Paid:</th>
                                <th style={{ width: '40%' }}>Amount Paid:</th>
                            </tr>
                        </thead>
                    </table>


                    {rows.map((row, index) => (
                        <div key={index} className='flex my-3 justify-center space-x-7'  >
                            {/* <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}

                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`paxName_${index}`}>Pax Name:</label> */}
                                <input type="text" id={`paymentId${index}`} className='border-2 border-black ' value={row.paymentId} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].paymentId = e.target.value;
                                    setRows(newRows);
                                }} />
                            </div>
                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`desc1_${index}`}>Description 1:</label> */}
                                <input type="text" id={`description${index}`} className='border-2 border-black ' value={row.description} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].description = e.target.value;
                                    setRows(newRows);
                                }} />
                            </div>
                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`desc2_${index}`}>Description 2:</label> */}
                                <input type="text" id={`paymentType${index}`} className='border-2 border-black ' value={row.paymentType} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].paymentType = e.target.value;
                                    setRows(newRows);
                                }} />
                            </div>
                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`desc2_${index}`}>Purchase Cost:</label> */}
                                <input type="text" id={`datePaid${index}`} className='border-2 border-black ' value={row.datePaid} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].datePaid = e.target.value;
                                    setRows(newRows);
                                }} />
                            </div>
                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`desc2_${index}`}>Sell Price:</label> */}
                                <input type="text" id={`amountPaid${index}`} className='border-2 border-black ' value={row.amountPaid} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].amountPaid = e.target.value;
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

                    <Link href="/purchase" className='bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Save</Link>
                    <button className='bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Cancle</button>
                    {/* <button className='bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Create Invoice</button> */}
                </div>
            </div >
        </div>

    )
}

export default Payment