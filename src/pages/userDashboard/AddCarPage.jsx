import React from "react";
import { useSelector } from "react-redux";
import AddCarLayout from "../../components/userDashboardComponents/add-car/layout/AddCarLayout";
import BasicInfo from "../../components/userDashboardComponents/add-car/children/BasicInfo";
import Additional_Info from "../../components/userDashboardComponents/add-car/children/Additional_Info";
import Calendar from "../../components/userDashboardComponents/add-car/children/Calendar";
import CarFeature from "../../components/userDashboardComponents/add-car/children/CarFeature";
import FinishScreen from "../../components/userDashboardComponents/add-car/children/FinishScreen";
import Uploadphotos from "../../components/userDashboardComponents/add-car/children/Uploadphotos";
import AddDriver from "../../components/userDashboardComponents/add-car/children/AddDriver";

const AddCarPage = () => {
  const active = useSelector((d) => d.active_tab.value);
  const { vehicle_booking_type } = useSelector((_) => _.details);

  const tabs = [
    <BasicInfo />,
    <Additional_Info />,
    vehicle_booking_type === "Self Drive" ? null : <AddDriver />,
    <Uploadphotos />,
    <CarFeature />,
    <Calendar />,
    <FinishScreen />,
  ];

  return (
    <div className="text-[#fff] p-[35px]">
      <AddCarLayout>
        {tabs[active] == null ? tabs[active + 1] : tabs[active]}
      </AddCarLayout>
    </div>
  );
};

export default AddCarPage;
