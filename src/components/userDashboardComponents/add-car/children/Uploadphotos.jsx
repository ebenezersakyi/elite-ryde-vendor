import React from "react";
import { useRef } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { set_image } from "../../../../store/dashboard_state_slice";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
const Uploadphotos = () => {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const { images, vehicle_identification_number } = useSelector(
    (_) => _?.details
  );

  async function upload(file) {
    const formData = new FormData();
    formData?.append("file", file);
    try {
      const response = await axios.post(
        `https://elite-ryde-management-api.azurewebsites.net/api/upload-car-image?vendorId=${user?.sub.slice(
          6
        )}&vehicleId=${vehicle_identification_number}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.status) {
        dispatch(set_image(`${response.data.data.url}`));
      }
    } catch (error) {
      toast.error("An error occured. \n Try again");
    }
  }

  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    upload(file);
  };

  return (
    <div className="grid grid-cols-1 gap-[2rem] sm:grid-cols-2 md:grid-cols-3">
      {images.map((itm, inx) => {
        return (
          <div
            className="h-[200px] border-[1px] border-[#fff] rounded-2xl"
            key={inx}
          >
            <img
              src={itm}
              className="w-full h-full aspect-auto object-cover rounded-2xl"
              alt="image"
              loading="lazy"
            />
          </div>
        );
      })}

      <button
        onClick={handleFileSelect}
        disabled={images?.length === 5}
        className="grid place-items-center text-center border-[1px] h-[200px]  border-[#fff] rounded-2xl cursor-pointer"
      >
        <span className="flex flex-col items-center">
          <Icon icon="bi:camera" className="text-[2rem]" />
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif, .jpg, .jpeg, .png"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button>Upload Image</button>
        </span>
      </button>
    </div>
  );
};

export default Uploadphotos;
