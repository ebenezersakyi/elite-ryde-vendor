import React, { useEffect, useState } from "react";
import icon from "./bell-svgrepo-com.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import IconLoadingWhite from "../../shared_components/IconLoadingWhite";
import { NoData } from "../../shared_components/NoData";
const Notification = () => {
  const [show, setShow] = useState(false);
  const { user } = useAuth0();
  const [tdata, setTData ] = useState()
  const [tloading, setTloading] = useState(false)
  async function getPending(){
    try {
      setTloading(true)
      const response = await axios({
        url: `https://elite-ryde-management-api.azurewebsites.net/api/get-pending-bookings?id=${user.sub.slice(
            6
          )}`,
        method: "get",
      });
      if (response?.data?.status) {
        console.log(response?.data?.data);
        setTData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occured \n Try again");
    }
    finally{
      setTloading(false)
    }
  }




  useEffect(()=>{
    getPending()
  },[] )
  return (
    <div className="bg-[#C0C0C0] relative rounded-full p-4 cursor-pointer">
      <img
        src={icon}
        alt=""
        className="h-[30px]"
        onClick={() => {
          setShow(!show);
        }}
      />
      {tdata?.length > 0 && <p className="rounded-full z-50 h-4 w-4 bg-egreen text-[0.7rem] grid place-items-center absolute top-0 right-0 font-[200]">
        {tdata?.length}
      </p>}

      {show && <NotificationContent data={tdata} loading={tloading}/>}
    </div>
  );
};

const NotificationContent = ({ data, loading }) => {
  return (
    <div className="absolute top-[110%] flex gap-2 flex-col w-[330px] bg-[#000] max-h-[250px] scrollbar-hide overflow-scroll left-0 backdrop-blur-3xl px-4 py-6 rounded-xl">
      {
        loading ? <p className="grid place-items-center"><IconLoadingWhite /></p> : data?.length == 0 ? <NoData /> : (data?.map((d) => {
            return <NotificationItem data={d}/>
        }))
      }
    </div>
  );
};

const NotificationItem = ({ data }) => {
    async function manageBooking(status, id){
        try {
            const response = await axios({
                url: `https://elite-ryde-management-api.azurewebsites.net/api/manage-booking`,
                data: {
                    sessionId: id, 
                    accept: status
                },
                method: 'post'
            })
            if(response?.data?.status){
                toast.success(status == true ? 'Booking accepted' : 'Booking rejected')
            }
        } catch (error) {
            console.log(error);
            toast.error("Error occured. Try again")
        }
      }
  return (
    <div className="font-[100] border-bgrey p-2  hover:border-[#fff] border-[1px]">
      <p className="text-[0.9rem]">
        {data?.userName} has requested to rent your <strong>{data?.carName}</strong>
      </p>
      <span>
        <p>
          Projected Earning: <strong>GHS {data?.rentalPrice?.toFixed(2)}</strong>
        </p>
        <span className="flex gap-1 justify-end">
          <button className="bg-egreen p-1" onClick={() => {
            manageBooking(true, data?._id)
          }}>Accept</button>
          <button className="bg-[red] p-1" onClick={() => {
            manageBooking(false, data?._id)
          }}>Decline</button>
        </span>
      </span>
    </div>
  );
};
export default Notification;
