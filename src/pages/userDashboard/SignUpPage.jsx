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
    location: Yup.string().required("GPS is required"),
    firstName: Yup.string().required("Firstname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    lastName: Yup.string().required("lastname is required"),
    tin: Yup.string().required("Tax identification Number is required"),
    existing: Yup.boolean(),
    doc: Yup.string().required(),
    companyImage: Yup.string().required(),
    // password: Yup.string()
    //   .matches(passwordRules, { message: "Please create a stronger password" })
    //   .required("Required"),
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
      companyImage: "",
      existing: false,
      password: "",
    },
    validationSchema,
    // validate: (values) => {},
    onSubmit: (values) => {
      console.log("starting");
      createSignUpApproval();
    },
  });

  async function createSignUpApproval() {
    if (strengthValue < 4) {
      toast.error("Please create a stronger password ");
      return;
    }
    checkIfEmailExists().then(async (data) => {
      if (data) {
        toast.error("Email already exists ");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const documentsURl = await uploadDocument(
          [formic.values.doc],
          "businessRegistrationDocument",
          formic.values.email?.replace(/[^\w\s]/g, "")
        );

        const companyURl = await uploadDocument(
          [formic.values.companyImage],
          "vendorcompanyimage",
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
              companyLogo: companyURl[0],
              password: formic.values.password,
            }),
          },
        });

        if (response?.data?.status) {
          nav("/sucess");
        }
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
        console.log(error);
      } finally {
        // setLoading(false);
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
    let status = false;
    try {
      const response = await axios({
        url: `${baseURLGeneral}/email-exists?email=${formic.values.email}`,
        method: "get",
      });
      if (response?.data?.status) {
        console.log(response?.data?.data);
        if (response?.data?.data) {
          // formic.errors.email = "Email already exists";
          status = true;
          toast.error("Email already exists");
        }
      } else {
        status = false;
      }
      return response?.data?.data;
    } catch (error) {
      console.log("error");
      toast.error("Error occured");
    } finally {
      // setLoading(false);
    }
  };

  // const checkIfEmailExists = async () => {
  //   const MGMT_API_ACCESS_TOKEN =
  //     "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhoSlVOeFlFa2VoUy03eDd2V1pKQSJ9.eyJpc3MiOiJodHRwczovL2VsaXRlLXJ5ZGUudXMuYXV0aDAuY29tLyIsInN1YiI6IjhzbUtqbWJEdkZaVFY5MUp4UzV6ZEUzUzVSdE9vdzVhQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2VsaXRlLXJ5ZGUudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE3MDM2MDEzMjMsImV4cCI6MTcwNjE5MzMyMywiYXpwIjoiOHNtS2ptYkR2RlpUVjkxSnhTNXpkRTNTNVJ0T293NWEiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6YXV0aGVudGljYXRpb25fbWV0aG9kcyB1cGRhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyBkZWxldGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpjbGllbnRfY3JlZGVudGlhbHMgY3JlYXRlOmNsaWVudF9jcmVkZW50aWFscyB1cGRhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIGRlbGV0ZTpjbGllbnRfY3JlZGVudGlhbHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.A4ZSR9t7CZfe09fPjw99tW0uEQol6IJManBGBt-iP04cbUjuRJr9t21tei3ygwsFwn9BbFkMLtSE-Z9MunlX9Ld_UJS1rdcJYr1HSKqHfkQTrePcV23ymNuC6z1HjvgIC7yLGp_UajmKXdmzt91e8Qkl1tFlCBo_T2TX2lV20gzhROweN5JyJExT4Duk28dIExqFyUSR3scYcyN_fx7vwX7hN5_PQrA_wgtFopYaSIro6beVfxPizqDvwSuAJO1Edo2_nfTcDfQUmaEDE5oTH4M3UnXyfvLpl3s5yQV37e28q2Rg9zBtK-i-QOW6yWP_PFCURnPIdjcx0I5cX5O2vw";
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: `https://login.auth0.com/api/v2/users-by-email?email=ebensakyi0%40gmail.com`,
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: `Bearer ${MGMT_API_ACCESS_TOKEN}`,
  //     },
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="w-[65%] mx-auto bg-[#000] p-8 mb-6 text-[#fff] w-[90vw]">
      <h4 className="text-[2.3rem] mb-6">Become a vendor.</h4>
      <form onSubmit={formic.handleSubmit} className="flex flex-col gap-5 ">
        <div className=" flex flex-col md:grid grid-cols-2 gap-[3rem] ">
          <SectionLayout>
            {/* <div className="flex items-center justify-between h-[3rem] ">
              <input
                type="checkbox"
                name="existing"
                value={formic.values.existing}
                onChange={formic.handleChange}
                className="accent-egreen h-[1.5rem] w-[1.2rem] "
                id=""
              />
              <p className="text-[1.2rem] font-[100]">Already a user?</p>
            </div> */}
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
                Upload company logo
              </label>
              <input
                name={"id"}
                type="file"
                accept="image/jpeg, image/png, image/gif, .jpg, .jpeg, .png"
                onChange={(e) => {
                  formic.setFieldValue("companyImage", e.target.files[0]);
                }}
                className="bg-[#000] text-[#fff] mt-4 outline-none text-[0.9rem]  py-2 px-0 "
              />
              <p className="inline">{uploadLoading && <IconLoadingWhite />}</p>
              {formic.errors.companyImage && (
                <p className="text-[#EF0107] font-[300] text-[0.8rem]">
                  *{formic.errors.companyImage.toLowerCase()}
                </p>
              )}
            </div>

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
              type={"text"}
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
