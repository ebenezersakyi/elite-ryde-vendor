import Field from "../../components/shared_components/InputField";
import React from "react";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const SignUpPage = () => {
  const nav = useNavigate();
  const [file, setFile] = React.useState("");
  const [isloading, setLoading] = React.useState(false);
  const id_type = ["Ghana-Card", "Driver-License"];

  const formic = useFormik({
    initialValues: {
      companyName: "",
      location: "",
      firstName: "",
      lastName: "",
      email: "",
      tin: "",
      doc: "",
      existing: false
    },
    validate: (values) => {
      console.log(values?.doc);
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
    const formatedEmail = ''
    try {
      const response = await axios.post(
        `https://elite-ryde-management-api.azurewebsites.net/api/upload-document?documentType=business%20registration%20document&userEmail=${formic.values.email?.replace(/[^\w\s]/g, "")}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.status) {
        // formic.setFieldValue("doc", e?.target?.files[0]);
        toast.success("EDEY WORK")
      //  dispatch(set_image(`${response.data.data.url}?${token}`))
      }
    } catch (error) {
      toast.error('An error occured. \n Try again')
    }
  }
  return (
    <div className="w-[30%] mx-auto bg-[#000] p-8 mb-6 text-[#fff]">
      <h4 className="text-[2.3rem] mb-4">Become a vendor.</h4>
      <form onSubmit={formic.handleSubmit} className="flex flex-col gap-5">
        <div className="flex items-center justify-between h-[3rem]">
          <input
            type="checkbox"
            name="existing"
            value={formic.values.existing}
            onChange={formic.handleChange}
            className="accent-egreen h-[1.5rem] w-[1.2rem] "
            id=""
          />
          <p className="text-[1.2rem] font-[100]">Already a vendor?</p>
        </div>
        <Field
          name={"companyName"}
          type={"text"}
          value={formic.values.companyName}
          label={"Company name"}
          onChange={formic.handleChange}
        />
        <Field
          name={"location"}
          type={"text"}
          value={formic.values.location}
          label={"GPS Address"}
          onChange={formic.handleChange}
        />
        <Field
          name={"firstName"}
          type={"text"}
          value={formic.values.firstName}
          label={"Firstname"}
          onChange={formic.handleChange}
        />
        <Field
          name={"lastName"}
          type={"text"}
          value={formic.values.lastName}
          label={"Lastname"}
          onChange={formic.handleChange}
        />
        <Field
          name={"email"}
          type={"email"}
          value={formic.values.email}
          label={"Email"}
          onChange={formic.handleChange}
        />
        <div className="flex flex-col gap-3 lg:gap-2 border-b-[0.75px] border-bgrey">
          <label
            htmlFor={formic.values.id}
            className="font-[100] text-[1.2rem]"
          >
            Business Registration Document
          </label>
          <input
            name={"id"}
            type="file"
            onChange={(e) => {
              upload(e?.target?.files[0])
            }}
            className="bg-[#000] text-[#fff] mt-4 outline-none text-[0.9rem]  py-2 px-0"
          />
        </div>

        <Field
          name={"tin"}
          type={"number"}
          value={formic.values.tin}
          label={"Tax Identification Number (TIN)"}
          onChange={formic.handleChange}
        />
        <button
          className="bg-[#fff] text-[#000] py-3 rounded-xl grid place-items-center"
          type="submit"
          disabled={isloading}
        >
          {isloading ? (
            <Icon
              icon="line-md:loading-loop"
              className="font-[900] text-[1.7rem]"
            />
          ) : (
            "Sign up"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
