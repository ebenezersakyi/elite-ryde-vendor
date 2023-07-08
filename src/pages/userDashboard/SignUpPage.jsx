import Field from "../../components/shared_components/InputField";
import React from "react";
import IconLoading from "../../components/shared_components/IconLoading";
import IconLoadingWhite from "../../components/shared_components/IconLoadingWhite";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
const SignUpPage = () => {
  const nav = useNavigate();
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [isloading, setLoading] = React.useState(false);

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
    },
    validationSchema,
    validate: (values) => {

    },
    onSubmit: (values) => {
      signUp();
    },
  });
  async function signUp() {
    setLoading(true);
    try {
      const response = await axios({
        url: "https://elite-ryde-management-api.azurewebsites.net/api/become-a-vendor",
        method: "post",
        data: {
          companyName: formic.values.companyName,
          location: formic.values.location,
          firstName: formic.values.firstName,
          lastName: formic.values.lastName,
          email: formic.values.email,
          tin: formic.values.tin, 
          document: formic.values.doc
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
  }

  async function upload(file) {
    const formData = new FormData();
    formData?.append("file", file);
    const formatedEmail = "";
    try {
      setUploadLoading(true)
      const response = await axios.post(
        `https://elite-ryde-management-api.azurewebsites.net/api/upload-document?documentType=business%20registration%20document&userEmail=${formic.values.email?.replace(
          /[^\w\s]/g,
          ""
        )}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.status) {
        // formic.setFieldValue("doc", e?.target?.files[0]);
        toast.success("Document uploaded succesfully");
        formic.setFieldValue("doc", response?.data.data.url);
        //  dispatch(set_image(`${response.data.data.url}?${token}`))
      }
    } catch (error) {
      toast.error("An error occured. \n Try again");
    }
    finally{
      setUploadLoading(false)
    }
  }
  return (
    <div className="w-[65%] mx-auto bg-[#000] p-8 mb-6 text-[#fff]">
      <h4 className="text-[2.3rem] mb-6">Become a vendor.</h4>
      <form onSubmit={formic.handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-[3rem]  ">
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
          </SectionLayout>
          <SectionLayout>
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
                  upload(e?.target?.files[0]);
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

const SectionLayout = ({ children }) => {
  return (
    <section className="flex flex-col gap-3 justify-between">
      {children}
    </section>
  );
};
export default SignUpPage;
