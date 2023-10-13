import React from "react";
import RentalTable from "../../components/userDashboardComponents/finance/RentalTable";
import { months } from "../../utils/calender_generator";
import { years } from "../../utils/dropdowncontents";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const Transactions = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const { user } = useAuth0();
  const [month, setMonth] = React.useState(months[new Date().getMonth()]);
  const [year, setYear] = React.useState(years[0]);

  async function getData() {
    try {
      setLoading(true);
      const response = await axios({
        url: `https://elite-ryde-management-api.azurewebsites.net/api/get-vendor-transactions?id=${user.sub.slice(
          6
        )}`,
        method: "get",
      });
      if (response?.data?.status) {
        console.log(response?.data?.data);
        setData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occured \n Try again");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);
  const mock_list = [
    {
      id: "#1394",
      user: "John Doe",
      status: "Completed",
      date: ["15th July", "ongoing"],
      car: "Mercedes-Benz S-Class",
      amount: 2567.89,
    },
    {
      id: "#1330",
      user: "Elon Musk",
      status: "On going",
      date: ["2nd August", "10th August"],
      car: "Tesla Model S",
      amount: 9876.54,
    },
    {
      id: "#1551",
      user: "Jane Smith",
      status: "Completed",
      date: ["7th June", "14th June"],
      car: "BMW 5 Series",
      amount: 4321.98,
    },
    {
      id: "#1423",
      user: "Mark Johnson",
      status: "On going",
      date: ["18th September", "ongoing"],
      car: "Audi A8",
      amount: 7532.1,
    },
    {
      id: "#1654",
      user: "Sarah Wilson",
      status: "Completed",
      date: ["12th May", "19th May"],
      car: "Lamborghini Huracan",
      amount: 11111.11,
    },
    {
      id: "#1765",
      user: "Robert Davis",
      status: "On going",
      date: ["30th October", "ongoing"],
      car: "Ferrari 488 GTB",
      amount: 8765.43,
    },
    {
      id: "#1890",
      user: "Emily Brown",
      status: "Completed",
      date: ["5th November", "15th November"],
      car: "Porsche 911",
      amount: 6543.21,
    },
  ];
  return (
    <div className="text-[#fff] 2xl:container 2xl:mx-auto px-[2.5rem] pt-[2rem]">
      <div className="mb-8">
        <h4 className="text-egreen text-[3rem] font-[500]">
          Transactions History
        </h4>
        <span className="flex gap-3 mt-[10px]">
          <CustomSelect state={month} options={months} setState={setMonth} />
          <CustomSelect state={year} options={years} setState={setYear} />
        </span>
      </div>
      <RentalTable data={data} loading={loading} />
    </div>
  );
};

const CustomSelect = ({ options, state, setState }) => {
  return (
    <select
      className="select bg-[transparent] outline-egreen border-[#fff] border-[1px] rounded-lg px-3 py-2 "
      value={state}
      onChange={(e) => {
        setState(e.currentTarget.value);
      }}
    >
      {options?.map((elem) => {
        return <option>{elem}</option>;
      })}
    </select>
  );
};
export default Transactions;
