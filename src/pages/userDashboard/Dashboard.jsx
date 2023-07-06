import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { data } from '../../components/userDashboardComponents/dashboard/CustomChart';
import ActiveRentalTable from '../../components/userDashboardComponents/dashboard/ActiveRentalTable'
import CustomChart from '../../components/userDashboardComponents/dashboard/CustomChart'
const Dashboard = () => {
    const mock_list = [
        {
          id: "#1330",
          user: "Elon Musk",
          status: "On going",
          date: ["2nd August", "10th August"],
          car: "Tesla Model S",
          amount: 9876.54,
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
          id: "#1765",
          user: "Robert Davis",
          status: "On going",
          date: ["30th October", "ongoing"],
          car: "Ferrari 488 GTB",
          amount: 8765.43,
        },
    ]
    
  return (
    <div className="text-[#fff] 2xl:container 2xl:mx-auto px-[2.5rem] pt-[2rem]">
        <h4 className='text-egreen text-[3rem] font-[500] mb-[2rem]'>Dashboard</h4>
        <div className='grid grid-cols-3 w-full gap-4 '>
            <div className='flex flex-col gap-4 col-span-2'>
                <div className='grid grid-cols-2 gap-4'>
                <AmountLayout>
                <p className='text-[1.3rem] font-[100]'>Total this week</p>
                    <p className='text-[2.5rem] font-[600]'>GHS 39.00</p>
                </AmountLayout>
                <AmountLayout>
                    <p className='text-[1.3rem] font-[100]'>Total income earned</p>
                    <p className='text-[2.5rem] font-[600]'>GHS 2349.00</p>
                </AmountLayout>
                </div>

                <div>
                   <ActiveRentalTable data={mock_list} />
                    <p className='font-[100] text-center mt-2'>*Active Rentals</p>
                </div>
            </div>

            <div className='grid place-items-center'>
            <Doughnut data={data}/>
            </div>
        </div>
    </div>
  )
}
const AmountLayout = ({children}) => {
    return <section className='border-[#fff] border-[1px] rounded-lg text-center py-[3rem] backdrop-blur-sm'>{children}</section>
}
export default Dashboard