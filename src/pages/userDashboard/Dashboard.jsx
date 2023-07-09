import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import ActiveRentalTable from '../../components/userDashboardComponents/dashboard/ActiveRentalTable'
import IconLoadingWhite from '../../components/shared_components/IconLoadingWhite';
ChartJS.register(ArcElement, Tooltip, Legend);
const Dashboard = () => {
  
  function generateRandomColors() {
    // Generate random values for red, green, and blue
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
  
    // Create the RGBA color strings with different alpha values
    var color1 = `rgba(${red}, ${green}, ${blue}, 1)`;
    var color2 = `rgba(${red}, ${green}, ${blue}, 0.2)`;
  
    // Return the array of generated colors
    return [color1, color2];
  }
  const [loading, setLoading] = React.useState(false);
  const [tdata, setData] = React.useState();
  const { user } = useAuth0();
  const [load, setLoad] = useState(false)
  const [d, setD] = useState()
  async function fetchData(){
    let data_arr = []
    let labels_arr = []
    let border = []
    let mainColor = []
    try {
      setLoad(true)
      const response = await axios({
        url: `https://elite-ryde-management-api.azurewebsites.net/api/get-financial-details?id=${user.sub.slice(
          6
        )}`,
        method: "get",
      });

      if(response?.data?.status){
          response?.data?.data?.forEach((elem)=>{
            const color = generateRandomColors()
            data_arr.push(elem?.amount)
            labels_arr.push(elem?.car)
            border.push(color[0])
            mainColor.push(color[1])
          })

          
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoad(false)
      setD({
        data_arr, 
        border,
        labels_arr ,
        mainColor
      })
    }
  }
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
        setData(response?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occured \n Try again");
    } finally {
      setLoading(false);
    }
  }
  useEffect(()=>{getData()
  fetchData()
  }, [])
  return (
    <div className="text-[#fff] 2xl:container 2xl:mx-auto px-[2.5rem] pt-[2rem]">
        <h4 className='text-egreen text-[3rem] font-[500] mb-[2rem]'>Dashboard</h4>
        <div className='grid grid-cols-3 w-full gap-4 '>
            <div className='flex flex-col gap-4 col-span-2'>
                <div className='grid grid-cols-2 gap-4'>
                <AmountLayout>
                <p className='text-[1.3rem] font-[100]'>Total this week</p>
                    <p className='text-[2.5rem] font-[600]'>GHS {tdata?.week_amount?.toFixed(2)}</p>
                </AmountLayout>
                <AmountLayout>
                    <p className='text-[1.3rem] font-[100]'>Total income earned</p>
                    <p className='text-[2.5rem] font-[600]'>GHS {tdata?.amount?.toFixed(2)}</p>
                </AmountLayout>
                </div>

                <div>
                   <ActiveRentalTable data={tdata?.data} loading={loading} />
                    <p className='font-[100] text-center mt-2'>*Active Rentals</p>
                </div>
            </div>

            <div className='grid place-items-center'>
            {load ? <IconLoadingWhite /> : <Doughnut data={{
              labels: d?.labels_arr, 
              datasets: [
                {
                  label: 'GHS: ',
                  data: d?.data_arr, 
                  backgroundColor: d?.mainColor, 
                  borderColor: d?.border, 
                  borderWidth: 1
                }
              ]
            }}/>}
            </div>
        </div>
    </div>
  )
}
export const AmountLayout = ({children}) => {
    return <section className='border-[#fff] border-[1px] rounded-lg text-center py-[3rem] backdrop-blur-sm'>{children}</section>
}
export default Dashboard