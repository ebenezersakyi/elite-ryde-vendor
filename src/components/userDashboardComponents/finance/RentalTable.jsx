import React from "react";
import IconLoadingWhite from "../../shared_components/IconLoadingWhite";
import dayjs from "dayjs";
import {NoData} from '../../shared_components/NoData'
const RentalTable = ({ loading, data }) => {
  const header_titles = [ "User", "Status", "Date", "Car", "Amount"];
  return (
    <div className="rounded-lg backdrop-blur-lg border-[1px] border-[#fff] p-[2rem] ">
      {/* header */}
      <div className="grid grid-cols-7 gap-[0] pb-[2rem] pt-[1.5rem] border-b-[1px] border-bgrey mb-2">
        {header_titles.map((elem, index) => {
          return (
            <p
              key={index}
              className={`text-[1.5rem]  font-[400]  ${
                elem == "User" && "col-span-2"
              }
              ${
                elem == "Date" && "col-span-2"
              }
              ${elem == "Amount" && "text-end"}`}
            >
              {elem}
            </p>
          );
        })}
      </div>
      <div className="max-h-[45vh] overflow-scroll scrollbar-hide">
        {loading ? (
          <span className="w-full grid place-items-center pt-[2rem]">
            <IconLoadingWhite />
          </span>
        ) : data?.length == 0 ? (
          <NoData data="data"/>
        ) : (
          data?.map((elem, inx) => {
            return (
              <RentalTableRow data={elem} last={inx == data.length - 1} />
            );
          })
        )}
      </div>
    </div>
  );
};
const RentalTableRow = ({
  data,
  last,
}) => {
  return (
    <div
      className={`grid grid-cols-7 py-[1rem] ${
        !last && "border-b-[1px]"
      } text-[1.2rem] font-[100] border-bgrey`}
    >
      {/* <p className={``}>{id}</p> */}
      <p className={`col-span-2`}>{data?.userName}</p>
      <p className={``}>{data?.status}</p>
      <p className={`col-span-2`}>
        {/* {dayjs(data?.pickupDate).toDate()} - {String(data?.returnDate).split(" ").slice(0, 4).join(" ")} */}
        {dayjs(data?.pickupDate).format('DD/MM/YYYY')} - {dayjs(data?.returnDate).format('DD/MM/YYYY')}
      </p>
      <p className={``}>{data?.carName}</p>
      <p className={`text-end`}>GHS {data?.rentalPrice}</p>
    </div>
  );
};
export default RentalTable;
