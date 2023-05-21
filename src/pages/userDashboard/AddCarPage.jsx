import React from 'react'
import AddCarLayout from '../../components/userDashboardComponents/add-car/layout/AddCarLayout'
import BasicInfo from '../../components/userDashboardComponents/add-car/children/BasicInfo'
import Additional_Info from '../../components/userDashboardComponents/add-car/children/Additional_Info'
import Calendar from '../../components/userDashboardComponents/add-car/children/Calendar'
import CarFeature from '../../components/userDashboardComponents/add-car/children/CarFeature'
const AddCarPage = () => {
  return (
    <div className='text-[#fff] 2xl:container 2xl:mx-auto px-[2.5rem] pt-[2rem] grid place-items-center'>
      <AddCarLayout>
        {/* <BasicInfo /> */}
        {/* <Additional_Info /> */}
        {/* <CarFeature /> */}
        <Calendar />
        </AddCarLayout>
    </div>
  )
}

export default AddCarPage