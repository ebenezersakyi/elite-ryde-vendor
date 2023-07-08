import React from 'react'
import { useSelector } from 'react-redux'
import AddCarLayout from '../../components/userDashboardComponents/add-car/layout/AddCarLayout'
import BasicInfo from '../../components/userDashboardComponents/add-car/children/BasicInfo'
import Additional_Info from '../../components/userDashboardComponents/add-car/children/Additional_Info'
import Calendar from '../../components/userDashboardComponents/add-car/children/Calendar'
import CarFeature from '../../components/userDashboardComponents/add-car/children/CarFeature'
import FinishScreen from '../../components/userDashboardComponents/add-car/children/FinishScreen'
import Uploadphotos from '../../components/userDashboardComponents/add-car/children/Uploadphotos'
import AddDriver from '../../components/userDashboardComponents/add-car/children/AddDriver'
const AddCarPage = () => {
  const active = useSelector((d) => d.active_tab.value)
  const tabs = [
     <BasicInfo />,
     <Additional_Info />,
     <AddDriver />,
     <Uploadphotos />,
     <CarFeature />,
      <Calendar />,
      <FinishScreen />
  ]

  return (
    <div className='text-[#fff] 2xl:container 2xl:mx-auto px-[4.5rem] pt-[2rem] grid place-items-center'>
      <AddCarLayout>
        {
          tabs[active]
        }
        </AddCarLayout>
    </div>
  )
}

export default AddCarPage