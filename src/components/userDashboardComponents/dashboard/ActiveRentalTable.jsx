import React from "react";
import IconLoadingWhite from "../../shared_components/IconLoadingWhite";
import dayjs from "dayjs";
import {NoData} from '../../shared_components/NoData'
const ActiveRentalTable = ({ loading, data }) => {
  const header_titles = ["Car", "User", "Duration", "Earnings"];
  return (
    <div className="rounded-lg backdrop-blur-lg border-[1px] border-[#fff] p-[2rem] ">
      {/* header */}
      <div className="grid grid-cols-5 gap-[0] pb-[1rem] pt-[0.5rem] border-b-[1px] border-bgrey mb-2">
        {header_titles.map((elem, index) => {
          return (
            <p
              key={index}
              className={`text-[1.3rem]  font-[200]  ${
                elem == "User" && "col-span-2"
              }
              ${
                elem == "Earnings" && 'text-end'
              }
              `}
            >
              {elem}
            </p>
          );
        })}
      </div>
      <div className="min-h-[200px] max-h-[200px] overflow-scroll scrollbar-hide">
        {loading ? (
          <span className="w-full grid place-items-center pt-[2rem]">
            <IconLoadingWhite />
          </span>
        ) : data?.length == 0 ? (
          <NoData />
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
      className={`grid grid-cols-5 py-[0.7rem] ${
        !last && "border-b-[1px]"
      } text-[1.1rem] font-[100] border-bgrey`}
    >
        <p className={``}>{data?.carName}</p>
      <p className={`col-span-2`}>{data?.userName}</p>
      <p className={``}>
      {dayjs(data?.pickupDate).format('DD/MM/YYYY')} - {dayjs(data?.returnDate).format('DD/MM/YYYY')}
      </p>
      
      <p className={`text-end`}>GHS {data?.rentalPrice}</p>
    </div>
  );
};
export default ActiveRentalTable;
