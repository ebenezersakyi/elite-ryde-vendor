import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { toggleFeature } from "../../../../store/features";
const FeatureTab = ({icon, title, isChecked, feature}) => {
  const dispatch = useDispatch()
  // const [isChecked, setIsChecked] = useState(false)
  return (
    <div
    onClick={() => {
      // setIsChecked(!isChecked)
      feature && dispatch(toggleFeature(feature))

    }}
      className={`flex cursor-pointer items-center rounded-md border-[1px] gap-3 ${
        isChecked ? "border-egreen" : "border-bgrey"
      } `}
    >
      <div
        className={`h-full grid items-center rounded-md border-r-[1px] p-2 ${
          isChecked ? "border-egreen" : "border-bgrey"
        }`}
      >
        <div
          className={`border-[2px] ${
            isChecked ? "border-egreen" : "border-bgrey p-2"
          }`}
        >
          {isChecked && (
            <Icon
              icon={"material-symbols:check-box-sharp"}
              className={`text-egreen ${!isChecked && "hidden"} w-full h-full`}
            />
          )}
        </div>
      </div>

      <div
        className={`flex h-full items-center rounded-md border-l-[1px] py-2 pl-2  pr-1 gap-1 flex-1 ${
          isChecked ? "border-egreen" : "border-bgrey"
        }`}
      >
        <span
          className={`${ isChecked ? 'bg-egreen' : 'bg-bgrey'}  p-[0.7rem] rounded-full grid place-items-center`}
        >
          <Icon icon={icon} className="text-[white] text-[1.7rem]" />
        </span>
        <p className={`${isChecked ? 'text-egreen' : 'text-bgrey'} text-[0.9rem]`}>{title}</p>
      </div>
    </div>
  );
};

export default FeatureTab;