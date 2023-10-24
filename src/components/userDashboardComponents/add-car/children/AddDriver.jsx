import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { set_driver_details } from "../../../../store/dashboard_state_slice";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const AddDriver = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { driver } = useSelector((_) => _.details);
  const { user } = useAuth0();
  const [prev, setprev] = useState();

  async function upload(file, field) {
    setLoading(true);
    const formData = new FormData();
    formData?.append("file", file);
    try {
      const response = await axios.post(
        `https://elite-ryde-management-api.azurewebsites.net/api/upload-document?documentType=business%20registration%20document&userEmail=${user?.email?.replace(
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
        setLoading(false);
        dispatch(
          set_driver_details({
            field,
            value: response.data.data.url,
          })
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occured. \n Try again");
    }
  }
  return (
    <div className="">
      {loading && (
        <div className="fixed top-0 w-[100%] h-[100%] flex justify-center items-center bg-[#00000061]">
          <ClipLoader size={30} color="white" />
        </div>
      )}
      <div className="flex flex-col justify-center items-center md:grid grid-cols-2 gap-[2rem] relative">
        <section className="grid grid-rows-3 gap-4">
          <CField
            label={"Name"}
            type={"text"}
            placeholder={"Enter Name"}
            value={driver?.name}
            onChange={(e) => {
              dispatch(
                set_driver_details({
                  field: "name",
                  value: e.currentTarget.value,
                })
              );
            }}
          />
          <CField
            label={"Phone Number"}
            type={"text"}
            value={driver?.phoneNumber}
            placeholder={"Enter phone number"}
            onChange={(e) => {
              dispatch(
                set_driver_details({
                  field: "phoneNumber",
                  value: e.currentTarget.value,
                })
              );
            }}
          />
          <CField
            label={"Email"}
            type={"email"}
            value={driver?.email}
            placeholder={"Enter email"}
            onChange={(e) => {
              dispatch(
                set_driver_details({
                  field: "email",
                  value: e.currentTarget.value,
                })
              );
            }}
          />
          <CField
            label={"Drivers License Number"}
            type={"text"}
            placeholder={"Enter Drivers licence Number"}
            value={driver?.idNumber}
            onChange={(e) => {
              dispatch(
                set_driver_details({
                  field: "idNumber",
                  value: e.currentTarget.value,
                })
              );
            }}
          />
          <div className="flex flex-col gap-3 lg:gap-2  border-bgrey">
            <label className="font-[100] text-[1.2rem]">
              Drivers License (PDF)
            </label>
            <input
              name={"id"}
              type="file"
              onChange={(e) => {
                upload(e?.target?.files[0], "idImage");
              }}
              className="bg-[#000] text-[#fff] mt-4 outline-none text-[0.9rem]  py-2 px-0"
            />
          </div>
        </section>

        <section className="grid place-items-center h-full">
          <div className="border-[1px] p-[3rem] rounded-lg mt-[20px] md:p-[20px]">
            {driver?.image ? (
              <>
                <img className="w-[300px]" src={prev} alt="" />
              </>
            ) : (
              <div className="flex flex-col gap-3 max-w-[200px] lg:gap-2  border-bgrey ">
                <label className="font-[100] text-[1.2rem]">
                  Passport Picture (PNG)
                </label>
                <input
                  name={"id"}
                  type="file"
                  onChange={(e) => {
                    upload(e?.target?.files[0], "image");

                    setprev(URL.createObjectURL(e?.target?.files[0]));
                  }}
                  className="bg-[#000] text-[#fff] mt-4 outline-none text-[0.9rem]  py-2 px-0"
                />
              </div>
            )}
            {driver?.image && (
              <p className="text-[1.3rem] font-[100] text-center mt-4">
                Passport picture
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

function CField({ type, label, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-3 lg:gap-2">
      <label className="font-[100] text-[1.2rem]">{label}</label>
      <input
        autoComplete="new-password"
        type={type}
        placeholder={placeholder}
        value={value}
        className="outline-none bg-[#000] border-bgrey border-b-[0.5px] text-[0.9rem]  py-2 placeholder:text-bgrey    text-[#fff]"
        onChange={onChange}
      />
    </div>
  );
}

export default AddDriver;
