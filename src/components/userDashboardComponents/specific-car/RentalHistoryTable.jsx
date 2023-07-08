import IconLoadingWhite from "../../shared_components/IconLoadingWhite";
const ActiveRentalTable = ({ loading, data }) => {
const header_titles = ["User","Status", "Duration", "Earnings"];
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
    <div className="h-full overflow-scroll scrollbar-hide">
      {loading ? (
        <span className="w-full grid place-items-center pt-[2rem]">
          <IconLoadingWhite />
        </span>
      ) : data?.length == 0 ? (
        <p className="text-[1.5rem] text-center  font-[100]">no data</p>
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
data: {  user, status, date, car, amount },
last,
}) => {
return (
  <div
    className={`grid grid-cols-5 py-[0.7rem] ${
      !last && "border-b-[1px]"
    } text-[1.1rem] font-[100] border-bgrey`}
    >
    <p className={`col-span-2`}>{user}</p>
      <p className={``}>{status}</p>
    <p className={``}>
      {date[0]} - {date[1]}
    </p>
    
    <p className={`text-end`}>GHS {amount}</p>
  </div>
);
};
export default ActiveRentalTable;