import Field from "../../components/shared_components/InputField";
import React, { useEffect, useState } from "react";
import IconLoading from "../../components/shared_components/IconLoading";
import IconLoadingWhite from "../../components/shared_components/IconLoadingWhite";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { baseURLGeneral, baseURlVendor } from "../../utils";
import { uploadDocument } from "../../utils";
import PasswordStrengthBar from "react-password-strength-bar";

const SignUpPage = () => {
  const nav = useNavigate();
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [isloading, setLoading] = React.useState(false);
  const [passwordScore, setPasswordScore] = React.useState(0);
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const [strengthValue, setStrengthValue] = useState();

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company name is required"),
    location: Yup.string()
      .matches(/^[A-Za-z]{2}-\d{3}-\d{2}$/, "Invalid format")
      .required("GPS is required"),
    firstName: Yup.string().required("Firstname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    lastName: Yup.string().required("lastname is required"),
    tin: Yup.string().required("Tax identification Number is required"),
    existing: Yup.boolean(),
    doc: Yup.string().required(),
    password: Yup.string()
      .matches(passwordRules, { message: "Please create a stronger password" })
      .required("Required"),
  });
  const formic = useFormik({
    initialValues: {
      companyName: "",
      location: "",
      firstName: "",
      lastName: "",
      email: "",
      tin: "",
      doc: "",
      existing: false,
      password: "",
    },
    validationSchema,
    // validate: (values) => {},
    onSubmit: (values) => {
      createSignUpApproval();
    },
  });

  async function createSignUpApproval() {
    if (strengthValue < 4) {
      toast.error("Please create a stronger password ");
      return;
    }
    setLoading(true);
    checkIfEmailExists().then(async (data) => {
      if (!data) {
        toast.error("Email already exists ");
        setLoading(false);
        return;
      }

      try {
        const documentsURl = await uploadDocument(
          [formic.values.doc],
          "businessRegistrationDocument",
          formic.values.email?.replace(/[^\w\s]/g, "")
        );

        const response = await axios({
          url: `${baseURlVendor}/approval`,
          method: "post",
          data: {
            type: "vendor_signup",
            content: JSON.stringify({
              companyName: formic.values.companyName,
              location: formic.values.location,
              firstName: formic.values.firstName,
              lastName: formic.values.lastName,
              email: formic.values.email,
              tin: formic.values.tin,
              document: documentsURl[0],
              password: formic.values.password,
            }),
          },
        });

        if (response?.data?.status) {
          nav("/sucess");
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
  }

  async function upload(file) {}

  useEffect(() => {
    if (formic.values.email.length > 0) {
      checkIfEmailExists();
    }
  }, [formic.values.email]);

  const checkIfEmailExists = async () => {
    try {
      const response = await axios({
        url: `${baseURLGeneral}/email-exists?email=${formic.values.email}`,
        method: "get",
      });
      if (response?.data?.status) {
        console.log(response?.data?.data);
        if (response?.data?.data) {
          // formic.errors.email = "Email already exists";
          toast.error("Email already exists");
        }
      } else {
      }
      return response?.data?.data;
    } catch (error) {
      console.log(error);
      toast.error("Error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[65%] mx-auto bg-[#000] p-8 mb-6 text-[#fff] w-[90vw]">
      <h4 className="text-[2.3rem] mb-6">Become a vendor.</h4>
      <form onSubmit={formic.handleSubmit} className="flex flex-col gap-5 ">
        <div className=" flex flex-col md:grid grid-cols-2 gap-[3rem] ">
          <SectionLayout>
            <div className="flex items-center justify-between h-[3rem] ">
              <input
                type="checkbox"
                name="existing"
                value={formic.values.existing}
                onChange={formic.handleChange}
                className="accent-egreen h-[1.5rem] w-[1.2rem] "
                id=""
              />
              <p className="text-[1.2rem] font-[100]">Already a user?</p>
            </div>
            <Field
              name={"companyName"}
              type={"text"}
              value={formic.values.companyName}
              label={"Company name"}
              onChange={formic.handleChange}
              error={formic.errors.companyName}
            />
            <Field
              name={"email"}
              type={"email"}
              value={formic.values.email}
              label={"Email"}
              onChange={formic.handleChange}
              error={formic.errors.email}
            />

            <FieldPassword
              name={"password"}
              type={"password"}
              value={formic.values.password}
              label={"Password"}
              onChange={formic.handleChange}
              // error={formic.errors.password}
            />
            <PasswordStrengthBar
              password={formic.values.password}
              onChangeScore={(value) => {
                setStrengthValue(value);
                console.log(value);
              }}
            />
          </SectionLayout>

          <SectionLayout>
            <Field
              name={"firstName"}
              type={"text"}
              value={formic.values.firstName}
              label={"Firstname"}
              onChange={formic.handleChange}
              error={formic.errors.firstName}
            />
            <Field
              name={"lastName"}
              type={"text"}
              value={formic.values.lastName}
              label={"Lastname"}
              onChange={formic.handleChange}
              error={formic.errors.lastName}
            />
            <Field
              name={"location"}
              type={"text"}
              value={formic.values.location}
              label={"GPS Address"}
              onChange={formic.handleChange}
              error={formic.errors.location}
            />
            <div className="flex flex-col gap-3 lg:gap-2  border-bgrey">
              <label className="font-[100] text-[1.2rem]">
                Business Registration Document
              </label>
              <input
                name={"id"}
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  formic.setFieldValue("doc", e.target.files[0]);
                }}
                className="bg-[#000] text-[#fff] mt-4 outline-none text-[0.9rem]  py-2 px-0 "
              />
              <p className="inline">{uploadLoading && <IconLoadingWhite />}</p>
              {formic.errors.doc && (
                <p className="text-[#EF0107] font-[300] text-[0.8rem]">
                  *{formic.errors.doc.toLowerCase()}
                </p>
              )}
            </div>

            <Field
              name={"tin"}
              type={"number"}
              value={formic.values.tin}
              label={"Tax Identification Number (TIN)"}
              onChange={formic.handleChange}
              error={formic.errors.tin}
            />
          </SectionLayout>
        </div>
        <button
          className="bg-[#fff] mt-6 text-[#000] py-3 rounded-xl grid place-items-center"
          type="submit"
          disabled={isloading}
        >
          {isloading ? <IconLoading /> : "Sign up"}
        </button>
      </form>
    </div>
  );
};

function FieldPassword({
  name,
  placeholder,
  value,
  label,
  onChange,
  type,
  error,
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-3 lg:gap-2">
      <label htmlFor={name} className="font-[100] text-[1.2rem]">
        {label}
      </label>
      <div className=" grid grid-cols-12">
        <input
          autoComplete="new-password"
          type={show ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          className="outline-none grid col-span-11 bg-[#000] border-bgrey border-b-[0.5px] text-[0.9rem]  w-[90%] py-2 placeholder:text-bgrey    text-[#fff]"
          onChange={onChange}
        />
        <p
          className="text-[#fff] grid place-items-center font-[100] min-w-max cursor-pointer text-center bg-bgrey px-2"
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? "hide" : "show"}
        </p>
      </div>
      {error && (
        <p className="text-[#EF0107] font-[300] text-[0.8rem]">
          *{error.toLowerCase()}
        </p>
      )}
    </div>
  );
}
const SectionLayout = ({ children }) => {
  return (
    <section className="flex flex-col gap-2 justify-between">
      {children}
    </section>
  );
};
export default SignUpPage;
