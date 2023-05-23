import Field from '../../components/shared_components/InputField'
import React from 'react'
import { Icon } from '@iconify/react';
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify";
const SignUpPage = () => {
    const nav = useNavigate()
    const [isloading, setLoading] = React.useState(false)
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
            // alert(JSON.stringify(values))
            signUp()
        
        }
    })
async function signUp(){
    setLoading(true)
    try {
        const response = await axios({
            url: 'https://elite-ryde-management-api.azurewebsites.net/api/become-a-vendor',
            method: 'post',
            data: {
                "companyName": formic.values.companyName,
                "location": formic.values.location,
                "firstName": formic.values.firstName,
                "lastName": formic.values.lastName,
                "email": formic.values.email
            }
        })

       if(response?.data?.status){
            nav('/sucess')
       }
    } catch (error) {
        toast.error(error.message)
        console.log(error);
    }
    finally{
        setLoading(false)
    }
}
  return (
    <div className='w-[30%] mx-auto bg-[#000] p-8 text-[#fff]'>
        <h4 className='text-[2.3rem] mb-4'>Sign up</h4>
        <form onSubmit={formic.handleSubmit} className='flex flex-col gap-5' >
        <Field name={"companyName"}  type={'text'}  value={formic.values.companyName} label={"Company name"} onChange={formic.handleChange}/>
        <Field name={"location"} type={'text'}   value={formic.values.location} label={"Location"} onChange={formic.handleChange}/>
        <Field name={"firstName"} type={'text'}   value={formic.values.firstName} label={"Firstname"} onChange={formic.handleChange}/>
        <Field name={"lastName"} type={'text'}   value={formic.values.lastName} label={"Lastname"} onChange={formic.handleChange}/>
        <Field name={"email"} type={'email'} value={formic.values.email} label={"Email"} onChange={formic.handleChange}/>
        <button className='bg-[#fff] text-[#000] py-3 rounded-xl grid place-items-center' type='submit' disabled={isloading}>
            {isloading ? <Icon icon="line-md:loading-loop" className='font-[900]' /> : 'Sign up'}
        </button>
        </form>
    </div>
  )
}

export default SignUpPage