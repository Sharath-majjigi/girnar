import React, { useState } from 'react'

const Sales = () => {
    const [rows, setRows] = useState([{ poNumber: '', poDate: '', description: '', totalPurchaseCost: '', totalSellPrice: '' }])
    // Function for adding a new row
    const vendors = ["customer 1 ", "customer 2", "customer 3"]
    const handleAddRow = () => {
        setRows([...rows, { poNumber: '', poDate: '', description: '', totalPurchaseCost: '', totalSellPrice: '' }]);
    }
    // Function for deleting a row
    const handleDeleteRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    }
    return (


        <div className='p-[5%]'>

            <h1 className='mt-[5vh]pb-5 align-center text-center py-9 font-bold'>Sales Entry</h1>
            <div className='flex justify-evenly'>
                {/* <div style={{ display: 'flex', justifyContent: 'space-evenly' ,textAlign:'center', marginTop:'40px',alignItems:'center' }}> */}
                <div >
                    <label htmlform="poNumber" className='px-3'>Invoice Number:</label>
                    <input type="text" id="poNumber" readOnly={true} placeholder='Invoice No' className='border-2 p-2 border-black ' />
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

            {/* <div className="w-full flex  justify-around text-center py-7 px-[23vh]"> */}
            <div className="w-full flex  justify-around text-center py-7 ">
                <div className='pl-[5vh]'>

                    <label htmlform="vendor" className=''>Customer:</label>
                    <select id="vendor" className='w-[40vh] border-2 p-2 border-black  ml-3 '>
                        {vendors.map((vendor) => (
                            <option key={vendor} value={vendor}>{vendor}</option>
                        ))}
                    </select>
                </div>

                <div className='pr-6'>
                    <label htmlform="poNumber" className='px-3 '>Sales Catagory:</label>
                    <select id="vendor" className='w-[40vh] border-2 p-2 border-black   '>
                        {vendors.map((vendor) => (
                            <option key={vendor} value={vendor}>{vendor}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className=' w-full mb-9'>
                <div className='w-full py-4 flex justify-evenly'>

                    <div className='w-[40%]'>
                        <label htmlform="poNumber" className='px-3'>Description:</label>
                        <input type="text" id="poNumber" readOnly={true} className='border-2 w-[40vh] p-2 border-black ' placeholder='Description' />
                    </div>
                    <div>
                        <label htmlform="poNumber" className='px-3'>Message:</label>
                        <input type="text" id="poNumber" readOnly={true} className='border-2 w-[40vh] p-2 border-black ' placeholder='Remarks' />
                    </div>
                </div>
                <div className='w-full px-[16vh] pt-9 flex justify-around'>
                    <div className='w-[40%]'>


                        <label htmlform="poNumber" className='px-3'>Invoice Amount:</label>
                        <input type="text" id="poNumber" readOnly={true} className='border-2  p-2 border-black ' placeholder='PO Amount' />
                    </div>
                    <div>
                        <label htmlform="poNumber" className='px-3'>Discount:</label>
                        <input type="text" id="poNumber" className='border-2 p-2 border-black ' />
                    </div>
                    <div>

                        <label htmlform="poNumber" className='px-3'>VAT amount:</label>
                        <input type="text" id="poNumber" className='border-2 p-2 border-black ' />
                    </div>
                </div>
            </div>
            <div className='w-[100%] py-5'>
                <div className='flex justify-end w-[90%]   '>

                    <label htmlform="poNumber" className='px-3'>Total Invoice Amount:</label>
                    <input type="text" id="poNumber" className='border-2 w-[35%] p-2 border-black ' />
                </div>
            </div>
            {/* <div className=' flex flex-col  align-center w-full '> */}
            <div className=' '>

                <table className='w-full'>
                    <thead>
                        <tr className='w-full'>
                            <th style={{ width: '10%' }}></th>
                            <th style={{ width: '15%' }}>PO Number:</th>
                            <th style={{ width: '16%' }}>PO Date:</th>
                            <th style={{ width: '13%' }}>Description :</th>
                            <th style={{ width: '17%' }}>Total Purchase Cost:</th>
                            <th style={{ width: '40%' }}>Total Sell Price:</th>
                        </tr>
                    </thead>
                </table>


                {rows.map((row, index) => (
                    <div key={index} className='flex my-3 justify-center space-x-7'  >
                        {/* <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}

                        <div className='flex flex-col text-center'>
                            {/* <label htmlform={`poNumber_${index}`}>Pax Name:</label> */}
                            <input type="text" id={`poNumber_${index}`} className='border-2 border-black ' value={row.poNumber} onChange={(e) => {
                                const newRows = [...rows];
                                newRows[index].poNumber = e.target.value;
                                setRows(newRows);
                            }} />
                        </div>
                        <div className='flex flex-col text-center'>
                            {/* <label htmlform={`poDate_${index}`}>Description 1:</label> */}
                            <input type="text" id={`poDate_${index}`} className='border-2 border-black ' value={row.poDate} onChange={(e) => {
                                const newRows = [...rows];
                                newRows[index].poDate = e.target.value;
                                setRows(newRows);
                            }} />
                        </div>
                        <div className='flex flex-col text-center'>
                            {/* <label htmlform={`desc2_${index}`}>Description 2:</label> */}
                            <input type="text" id={`description${index}`} className='border-2 border-black ' value={row.description} onChange={(e) => {
                                const newRows = [...rows];
                                newRows[index].description = e.target.value;
                                setRows(newRows);
                            }} />
                        </div>
                        <div className='flex flex-col text-center'>
                            {/* <label htmlform={`desc2_${index}`}>Purchase Cost:</label> */}
                            <input type="text" id={`totalPurchaseCost${index}`} className='border-2 border-black ' value={row.totalPurchaseCost} onChange={(e) => {
                                const newRows = [...rows];
                                newRows[index].totalPurchaseCost = e.target.value;
                                setRows(newRows);
                            }} />
                        </div>
                        <div className='flex flex-col text-center'>
                            {/* <label htmlform={`desc2_${index}`}>Sell Price:</label> */}
                            <input type="text" id={`totalSellPrice${index}`} className='border-2 border-black ' value={row.totalSellPrice} onChange={(e) => {
                                const newRows = [...rows];
                                newRows[index].totalSellPrice = e.target.value;
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
                {/* <button className='bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Print PO</button> */}
                <button className='bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Print Invoice</button>
            </div>
        </div >


    )
}

export default Sales