import IconLoadingWhite from "../../shared_components/IconLoadingWhite";
import { NoData } from "../../shared_components/NoData";
import dayjs from "dayjs";
const ActiveRentalTable = ({ loading, data }) => {
  const header_titles = ["User", "Status", "Duration", "Earnings"];
  return (
    <div className="rounded-lg backdrop-blur-lg border-[1px] border-[#fff] p-[2rem] overflow-y-scroll w-full">
      {/* header */}
      <div className="grid grid-cols-5 gap-[0] pb-[1rem] pt-[0.5rem] border-b-[1px] border-bgrey mb-2">
        {header_titles.map((elem, index) => {
          return (
            <p
              key={index}
              className={`text-[10px]  font-[200]  ${
                elem == "User" && "col-span-2"
              }
            ${elem == "Earnings" && "text-end"}
             sm:text-[1.3rem] `}
            >
              {elem}
            </p>
          );
        })}
      </div>
      <div className="h-full overflow-scroll scrollbar-hide">
        {loading ? (
          <span className="w-full grid place-items-center pt-[2rem]">
            <IconLoadingWhite />
          </span>
        ) : data?.length == 0 ? (
          <NoData data="data" />
        ) : (
          data?.map((elem, inx) => {
            return <RentalTableRow data={elem} last={inx == data.length - 1} />;
          })
        )}
      </div>
    </div>
  );
};
const RentalTableRow = ({ data, last }) => {
  return (
    <div
      className={`grid grid-cols-5 py-[0.7rem] ${
        !last && "border-b-[1px]"
      } text-[1.1rem] font-[100] border-bgrey`}
    >
      <p className={`col-span-2`}>{data?.userName}</p>
      <p className={``}>{data?.status}</p>
      <p className={``}>
        {dayjs(data?.pickupDate).format("DD/MM/YYYY")} -{" "}
        {dayjs(data?.returnDate).format("DD/MM/YYYY")}
      </p>

      <p className={`text-end`}>GHS {data?.rentalPrice?.toFixed(2)}</p>
    </div>
  );
};
export default ActiveRentalTable;
