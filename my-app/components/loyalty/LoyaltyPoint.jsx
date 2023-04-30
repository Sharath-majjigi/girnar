import React, { useState } from 'react'

const LoyaltyPoint = () => {
    const [rows, setRows] = useState([{ transactionId: '', transactionData: '', reference: '', Description: '', points: '' }])
    // Function for adding a new row
    const handleAddRow = () => {
        setRows([...rows, { transactionId: '', transactionData: '', reference: '', Description: '', points: '' }]);
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

                <h1 style={{ textAlign: 'center', fontWeight: 'bold' }} className='py-6'>Loyalty Points</h1>
                <div className='flex justify-around'>
                    {/* <div style={{ display: 'flex', justifyContent: 'space-evenly' ,textAlign:'center', marginTop:'40px',alignItems:'center' }}> */}

                    <div className='pl-[5vh]'>

                        <label htmlform="vendor" className=''>Customer:</label>
                        <select id="vendor" className='w-[40vh] border-2 p-2 border-black  ml-3 '>
                            {vendors.map((vendor) => (
                                <option key={vendor} value={vendor}>{vendor}</option>
                            ))}
                        </select>
                    </div>


                    <div className='flex justify-center pl-4' >
                        {/* <label htmlform="userId" className='px-3'>Customer Name:</label>
                        <input type="text" id="userId" placeholder='Customer name' className='border-2 p-2 border-black ' /> */}
                        <label htmlFor="customer" className='px-4 justify-center align-center pt-2'>Customer Name:</label>
                        <form className="flex items-center justify-between">

                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

                                </div>
                                <input type="text" id="simple-search" className="bg-white border border-black-900 text-black-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Customer Name" required />
                            </div>

                        </form>
                    </div>
                </div>

                <div className="w-full flex justify-between text-center py-7 px-[23vh]">
                    <div>

                        <label htmlform="city" className='px-3'>City:</label>
                        <input type="text" id="city" className='border-2  p-2 border-black ' placeholder='pick from customer table' />
                    </div>
                    <div>

                        <label htmlform="country" className='px-3'>Country:</label>
                        <input type="text" id="country" className='border-2  p-2 border-black ' placeholder='pick from customer table' />
                    </div>
                </div>

                <div className=' w-full mb-9'>
                    <div className='w-full py-4 flex justify-around'>

                        <div className='w-[40%]'>
                            <label htmlform="telephone" className='px-3'>Telephone:</label>
                            <input type="text" id="Telephone" className='border-2  p-2 border-black ' placeholder='pick from customer table' />
                        </div>
                        <div>
                            <label htmlform="poNumber" className='px-3'>Email:</label>
                            <input type="text" id="poNumber" className='border-2 p-2 border-black ' placeholder='pick from customer table' />
                        </div>
                    </div>
                    <div className='w-full flex justify-around'>
                        <div className='w-[40%]'>


                            <label htmlform="totalPoint" className='px-3'>Total Points:</label>
                            <input type="text" id="totalPoint" className='border-2  p-2 border-black ' placeholder='calculted from loyalty' />
                        </div>
                        <div>
                            <label htmlform="reedemed" className='px-3'>Reedemed:</label>
                            <input type="text" id="reedemed" className='border-2 p-2 border-black ' placeholder='reedemed' />
                        </div>
                    </div>
                </div>
                {/* <div className=' flex flex-col  align-center w-full '> */}
                <div className=' '>

                    <table className='w-full'>
                        <thead>
                            <tr className='w-full'>
                                <th style={{ width: '10%' }}></th>
                                <th style={{ width: '15%' }}>Transaction Id:</th>
                                <th style={{ width: '16%' }}>Transaction Data:</th>
                                <th style={{ width: '16%' }}>Reference:</th>
                                <th style={{ width: '18%' }}>Description:</th>
                                <th style={{ width: '40%' }}>Points Earned:</th>
                            </tr>
                        </thead>
                    </table>


                    {rows.map((row, index) => (
                        <div key={index} className='flex my-3 justify-center space-x-7'  >
                            {/* <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}

                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`transactionId_${index}`}>Pax Name:</label> */}
                                <input type="text" id={`transactionId_${index}`} className='border-2 border-black ' value={row.transactionId} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].transactionId = e.target.value;
                                    setRows(newRows);
                                }} />
                            </div>
                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`transactionData_${index}`}>Description 1:</label> */}
                                <input type="text" id={`transactionData_${index}`} className='border-2 border-black ' value={row.transactionData} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].transactionData = e.target.value;
                                    setRows(newRows);
                                }} />
                            </div>
                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`reference_${index}`}>Description 2:</label> */}
                                <input type="text" id={`reference_${index}`} className='border-2 border-black ' value={row.reference} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].reference = e.target.value;
                                    setRows(newRows);
                                }} />
                            </div>
                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`reference_${index}`}>Purchase Cost:</label> */}
                                <input type="text" id={`reference_${index}`} className='border-2 border-black ' value={row.Description} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].Description = e.target.value;
                                    setRows(newRows);
                                }} />
                            </div>
                            <div className='flex flex-col text-center'>
                                {/* <label htmlform={`reference_${index}`}>Sell Price:</label> */}
                                <input type="text" id={`reference_${index}`} className='border-2 border-black ' value={row.points} onChange={(e) => {
                                    const newRows = [...rows];
                                    newRows[index].points = e.target.value;
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

                    <button className='bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Print</button>
                    <button className='bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Reedem</button>
                    {/* <button className='bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Create Invoice</button> */}
                </div>
            </div >
        </div>

    )
}

export default LoyaltyPoint