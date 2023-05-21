// {
//     "companyName": "J&P Car Rentals",
//     "location": "Airport City, Accra",
//     "firstName": "Gideon",
//     "lastName": "Bedzrah",
//     "email": "gbedzrah1@gmail.com"
// }
import Field from '../../components/shared_components/InputField'
import React from 'react'
import { useFormik } from 'formik'
const SignUpPage = () => {
    const formic = useFormik({
        initialValues: {
            companyName: '',
            location: '',
            firstName: '',
            lastName: '',
            email: ''
        },
        validate: (values) => {

        },
        onSubmit: (values) => {
            alert(JSON.stringify(values))
        }
    })
  return (
    <div className='w-[30%] mx-auto bg-[#000] p-8 text-[#fff]'>
        <h4 className='text-[2.3rem] mb-4'>Sign up</h4>
        <form onSubmit={formic.handleSubmit} className='flex flex-col gap-5' >
        <Field name={"companyName"}  type={'text'}  value={formic.values.companyName} label={"Company name"} onChange={formic.handleChange}/>
        <Field name={"location"} type={'text'}   value={formic.values.location} label={"Location"} onChange={formic.handleChange}/>
        <Field name={"firstName"} type={'text'}   value={formic.values.firstName} label={"Firstname"} onChange={formic.handleChange}/>
        <Field name={"lastName"} type={'text'}   value={formic.values.lastName} label={"Lastname"} onChange={formic.handleChange}/>
        <Field name={"email"} type={'email'} value={formic.values.email} label={"Email"} onChange={formic.handleChange}/>
        <button className='bg-[#fff] text-[#000] py-3 rounded-xl' type='submit'>
            Submit
        </button>
        </form>
    </div>
  )
}

export default SignUpPage