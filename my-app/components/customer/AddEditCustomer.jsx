import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from 'next/link';
 
const AddEditCustomer = () => {
  const validationSchema = Yup.object().shape({
    customerCode :Yup.number("userid"),
    fullName: Yup.string().required("First Name is required"),
    address1: Yup.string().required("address! is required"),
    address2: Yup.string().required("address! is required"),   
    postCode: Yup.string().length(6).matches(/^[0-9]{6}/).required("this is required").label("country"),
    phone: Yup.object({
      code: Yup.string().matches(/^\+\d+$/i),
      number: Yup.number().max(10),
    }),
    City: Yup.string().required("city is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    role: Yup.string().required("Role is required"),
    telephone: Yup.number("enter the number"),
    Country: Yup.string().required("country is required"),
    notes:Yup.string(),
    
  }); 
  const formOptions = { resolver: yupResolver(validationSchema) };
  const form = useForm(formOptions);
  const { register, handleSubmit, reset,formState, formState:{errors}, control } = form;
 
  const onsubmit =data => {
    console.log(data,"smamed")
 
    console.log(data);
    
  }
    
  return (
    
    <>
    
        
      <h1 className="text-bold text-xl flex item-center justify-center py-5">ADD CUSTOMER</h1>
      

          <form onSubmit={handleSubmit(onsubmit)}  className="flex flex-col justify-center w-full align-center
    items-center space-y-5 " > 

  
      
       
        
          
      
        <div className="flex justify-around w-[80%] ">   
      <div div className="flex flex-col form-row w-[30%]">
      {/* <div div className="flex flex-col form-row"> */}
                
        <div className="form-group">
          <label>Customer Code</label>
          <input name="customerCode" type="text"{...register("customerCode")} className={`form-control border-2 border-black rounded-md ${errors.customerCode ? "is-invalid" : ""}`} />
          <div className="invalid-feedback">{errors.customerCode?.message}</div>

        </div>
        <div className="form-group">
          <label>Address (Line!)</label>
          <input name="address1" type="text"{...register("address1")} className={`form-control border-2 border-black rounded-md ${errors.address1 ? "is-invalid" : ""}`} />
          <div className="invalid-feedback">{errors.address1?.message}</div>

        </div>
        <div className="form-group">
          <label>Post Code</label>
          <input name="postCode" type="text" {...register("postCode")} className={`form-control border-2 border-black rounded-md ${errors.postCode ? "is-invalid ":""}`} />
          <div className="invalid-feedback">{errors.postCode?.message}</div>

        </div>
        <div className="form-group">
          <label>City</label>
          <input name="City" type="text" {...register("City")} className={`form-control border-2 border-black rounded-md ${errors.City ? "is-invalid ":""}`} />
          <div className="invalid-feedback">{errors.City?.message}</div>

        </div>
        <div className="form-group">
          <label>Telephone</label>
          <input name="telephone" type="text" {...register("telephone")} className={`form-control border-2 border-black rounded-md ${errors.telephone ? "is-invalid ":""}`} />
          <div className="invalid-feedback">{errors.telephone?.message}</div>

          </div>  
          </div>
        
                 
    
          {/* <div className="flex flex-col   "> */}
         <div className="flex flex-col form-row w-[30%]">
      {/* <div className="flex flex-col align-center form-row"> */}
        <div className="form-group ">
                    <label>Full Name</label>
                    <input name="fullName" type="text" {...register("fullName")} className={`form-control border-2 border-black rounded-md ${errors.fullName ? "is-invalid" : ""}`} />
                    <div className="invalid-feedback">{errors.fullName?.message}</div>
        </div>
      
        <div className="form-group">
          <label>Address (Line2)</label>
          <input name="address2" type="text"{...register("address2")} className={`form-control border-2 border-black rounded-md ${errors.address2 ? "is-invalid" : ""}`} />
          <div className="invalid-feedback">{errors.address2?.message}</div>

        </div>
        <div className="form-group">
          <label>Country</label>
          <input name="Country" type="text"{...register("Country")} className={`form-control border-2 border-black rounded-md ${errors.Country ? "is-invalid" : ""}`} />
          <div className="invalid-feedback">{errors.Country?.message}</div>

        </div>
        <div className="form-group ">
                    <label>Email</label>
                    <input name="email" type="text" {...register("email")} className={`form-control border-2 border-black rounded-md ${errors.email ? "is-invalid" : ""}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

        <div className="form-group">
          <label>Notes</label>
          <input name="notes" type="text" {...register("notes")} className={`form-control border-2 border-black rounded-md ${errors.notes ? "is-invalid ":""}`} />
          <div className="invalid-feedback">{errors.notes?.message}</div>

        </div>
          
        </div>
        </div>
        
 
      <div className="form-group ">
        <button type="submit" href="/users"  disabled={formState.isSubmitting} className="btn text-black btn-success mr-2">
            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>} 
          Save 
        </button>
           

        <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary text-black">Reset</button>
        <Link href="/customer" className="btn text-black btn-danger btn-link" >Cancel</Link>
         
      </div>

   
  
      </form>
      </>
  )
}

export default AddEditCustomer