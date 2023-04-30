import React, { useState } from 'react'

const ReedemloyaltyPoints = () => {

    const vendors = ["customer 1", "customer 2", "customer 3"]
    return (
        <div>

            <div className='p-[5%]'>

                <h1 className='py-6 align-center w-full flex justify-center font-bold'> Loyalty Points Reedem</h1>
                <div className='flex justify-evenly w-[100%]'>
                    {/* <div style={{ display: 'flex', justifyContent: 'space-evenly' ,textAlign:'center', marginTop:'40px',alignItems:'center' }}> */}

                    <div className='pl-[5vh] w-[50%] flex justify-center'>

                        <label htmlform="vendor" className=''>Customer:</label>
                        <select id="vendor" className='w-[40vh] border-2 p-2 border-black  ml-3 '>
                            {vendors.map((vendor) => (
                                <option key={vendor} value={vendor}>{vendor}</option>
                            ))}
                        </select>
                    </div>


                    <div className='w-[50%] justify-center flex'>

                        <label htmlform="country" className='pr-4'>Customer Name:</label>
                        <input type="text" id="country" className='border-2  p-2 border-black ' placeholder='Customer Name' />
                    </div>
                </div>

                <div className="w-full flex justify-between text-center  py-9 px-[23vh]">
                    <div>

                        <label htmlform="city" className='px-3'>City: </label>
                        <input type="text" id="city" className='border-2  p-2 border-black ' placeholder='pick from customer table' />
                    </div>
                    <div>

                        <label htmlform="country" className='px-3'>Country: </label>
                        <input type="text" id="country" className='border-2  p-2 border-black ' placeholder='pick from customer table' />
                    </div>
                </div>
                <div className="w-full flex justify-between text-center py-7 px-[17vh]">
                    <div>

                        <label htmlform="city" className='px-3'>Telephone: </label>
                        <input type="text" id="city" className='border-2  p-2 border-black ' placeholder='pick from customer table' />
                    </div>
                    <div className='pr-[7vh]'>
                        <label htmlform="country" className='px-3'>Email: </label>
                        <input type="text" id="country" className='border-2  p-2 border-black ' placeholder='pick from customer table' />
                    </div>
                </div>
                <div className="w-full flex justify-between text-center py-7 px-[17vh]">
                    <div>

                        <label htmlform="city" className='px-3'>Total Point:</label>
                        <input type="text" id="city" className='border-2  p-2 border-black ' placeholder='pick from customer table' />
                    </div>
                    <div className='pr-[7vh]'>
                        <label htmlform="country" className='px-3'>Reedemed:</label>
                        <input type="text" id="country" className='border-2  p-2 border-black ' placeholder='pick from customer table' />
                    </div>
                </div>
                <div className="w-full flex justify-between text-center py-7 px-[17vh]">
                    <div>

                        <label htmlform="city" className='px-3'>Reference:</label>
                        <input type="text" id="city" className='border-2  p-2 border-black ' placeholder='pick from customer table' />
                    </div>
                    <div className='pr-[7vh]'>

                        <label htmlform="country" className='px-3'>Description:</label>
                        <input type="text" id="country" className='border-2  p-2 border-black ' placeholder='pick from customer table' />
                    </div>
                </div>
                <div className='flex justify-center'>


                    <button type="submit" className="btn flex justify-center text-black btn-success mr-2">

                        Reedem
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ReedemloyaltyPoints