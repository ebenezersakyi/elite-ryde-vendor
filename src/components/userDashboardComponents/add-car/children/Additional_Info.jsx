import React from "react";
import DetailTab from "../shared/InfoTab";
import {
  set_plate_number,
  set_location,
  set_vehicle_identification_number,
} from "../../../../store/dashboard_state_slice";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Additional_Info = () => {
  const { location, plate_number, vehicle_identification_number } = useSelector(
    (_) => _.details
  );
  const formic = useFormik({
    initialValues: {
      carRegistrationDocument: "",
      insuranceDocument: "",
    },
  });

  async function upload(file) {
    const formData = new FormData();
    formData?.append("file", file);
    const formatedEmail = "t@t.com";
    try {
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
        //  dispatch(set_image(`${response.data.data.url}?${token}`))
      }
    } catch (error) {
      toast.error("An error occured. \n Try again");
    }
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <DetailTab
          icon={"material-symbols:location-on-outline"}
          title={"Location"}
          value={location}
          setState={set_location}
          inputType={1}
          tooltip={"eg: Spintex"}
        />
        <DetailTab
          icon={"material-symbols:directions-car"}
          title={"License plate number"}
          value={plate_number}
          setState={set_plate_number}
          tooltip={"eg: GR-1234-19"}
          inputType={0}
        />
        <DetailTab
          icon={"material-symbols:directions-car"}
          title={"Vehicle identification number"}
          value={vehicle_identification_number}
          setState={set_vehicle_identification_number}
          tooltip={"4Y1SL65848Z411439."}
          inputType={0}
        />
      </div>

      <div>
        <h4 className="text-[2.4rem] mb-4">Car Documents</h4>
        <div className="flex flex-col gap-3 lg:gap-2  border-bgrey">
          <label className="font-[100] text-[1.2rem]">
            Car Registration Document
          </label>
          <input
            name={"id"}
            type="file"
            onChange={(e) => {
              upload(e?.target?.files[0]);
            }}
            className="bg-[#000] text-[#fff] mt-4 outline-none text-[0.9rem]  py-2 px-0"
          />
          {formic.errors.doc && (
            <p className="text-[#EF0107] font-[300] text-[0.8rem]">
              *{formic.errors.doc.toLowerCase()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 lg:gap-2  border-bgrey">
          <label className="font-[100] text-[1.2rem]">
            Comprehensive Insurance Document
          </label>
          <input
            name={"id"}
            type="file"
            onChange={(e) => {
              upload(e?.target?.files[0]);
            }}
            className="bg-[#000] text-[#fff] mt-4 outline-none text-[0.9rem]  py-2 px-0"
          />
          {formic.errors.doc && (
            <p className="text-[#EF0107] font-[300] text-[0.8rem]">
              *{formic.errors.doc.toLowerCase()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Additional_Info;
