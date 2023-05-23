import React from "react";
import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { set_image } from "../../../../store/dashboard_state_slice";

const Uploadphotos = () => {
//   const [images, setImages] = useState([]);
    const dispatch = useDispatch()
    const { images } = useSelector((_) => _.details)
    console.log(images);
  const onFileSelect = (file) => {
    const img = URL.createObjectURL(file);
    dispatch(set_image(img))
  };
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileSelect(file);
  };

  return (
    <div className="grid grid-cols-3 gap-[2rem]">
      {images.map((itm, inx) => {
        return (
          <div className="h-[200px] border-[1px] border-[#fff] rounded-2xl">
            <img
              src={itm}
              className="w-full h-full aspect-auto object-cover rounded-2xl"
              alt=""
            />
          </div>
        );
      })}

      <div className="grid place-items-center text-center border-[1px] h-[200px]  border-[#fff] rounded-2xl cursor-pointer">
        <span className="flex flex-col items-center">
          <Icon icon="bi:camera" className="text-[2rem]" />
          {/* <p className="text-[1.5rem] font-[100]">Add image</p> */}
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif, .jpg, .jpeg, .png"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button onClick={handleFileSelect} disabled={images.length === 5}>
            Upload Image
          </button>
        </span>
      </div>
    </div>
  );
};

export default Uploadphotos;
