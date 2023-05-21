import React from "react";
import FeatureTab from "../shared/FeatureTab";
import { useSelector } from "react-redux";
import {toggleFeature} from '../../../../store/features'
import { toggleFeature_r } from "../../../../store/rental_condition";
const CarFeature = () => {
  const {gps, aux, sun_roof, child_seat, bluetooth, bike_rack, third_row_seat, mud_tyres, chains, car_taint, roof_box, usb} = useSelector((_) => _.features)

  const {_18_plus, smoking_allowed, outside_accra, deliver_car} = useSelector((_) => _.rental_condition)
  const feature_list = [
    {
      icon: "ic:baseline-gps-fixed",
      title: "GPS",
      isChecked: gps,
      feature: 'gps'
    },
    {
      icon: "mdi:audio-input-stereo-minijack",
      title: "Audio Input",
      isChecked: aux,
      feature: 'aux'
    },
    {
      icon: "ph:sun-dim",
      title: "Sun Roof",
      isChecked: sun_roof,
      feature: "sun_roof",
    },
    {
      icon: "mdi:car-child-seat",
      title: "Child Seat",
      isChecked: child_seat,
      feature: 'child_seat'
    },
    {
      icon: "material-symbols:bluetooth-connected",
      title: "Bluetooth",
      isChecked: bluetooth,
      feature: 'bluetooth'
    },
    {
      icon: "mdi:usb-port",
      title: "USB Input",
      isChecked: usb,
      feature: 'usb'
    },
    {
      icon: "material-symbols:directions-bike",
      title: "Bike Rack",
      isChecked: bike_rack,
      feature: 'bike_rack'
    },
    {
      icon: "material-symbols:add",
      title: "3rd Row Seat",
      isChecked: third_row_seat,
      feature: 'third_row_seat'
    },
    {
      icon: "mdi:tyre",
      title: "Mud Tyres",
      isChecked: mud_tyres,
      feature: 'mud_tyres'
    },
    {
      icon: "akar-icons:link-chain",
      title: "Chains",
      isChecked: chains,
      feature: 'chains'
    },
    {
      icon: "material-symbols:directions-car-outline",
      title: "Car Taint",
      isChecked: car_taint,
      feature: 'car_taint'
    },
    {
      icon: "material-symbols:directions-car-outline",
      title: "Roof box",
      isChecked: roof_box,
      feature: 'roof_box'
    },
  ];

  const rental_condition = [
    {
      icon: 'uil:18-plus',
      title: '18 plus',
      isChecked: _18_plus,
      feature: '_18_plus'

    },
    {
      icon: 'ic:baseline-smoking-rooms',
      title: 'Smoking Allowed',
      isChecked: smoking_allowed,
      feature: 'smoking_allowed'
    },
    {
      icon:'material-symbols:location-on',
      title: 'Trips Outside Accra',
      isChecked: outside_accra,
      feature: 'outside_accra'
    },
    {
      icon: 'material-symbols:directions-car-outline',
      title: 'Willing to deliver Car',
      isChecked: deliver_car,
      feature: 'deliver_car'
    },
  ]
  return (
    <div className=''>
    <h4 className='mb-4 text-[1.35rem]'>
      Feature list
    </h4>
    <div className='grid grid-cols-4 gap-4'>
      {
        feature_list.map(({title, icon, isChecked, feature}, inx) => {
          return <FeatureTab title={title} icon={icon} isChecked={isChecked} key={inx} feature={feature} func={toggleFeature}/>
        })
      }
    </div>
    <h4 className='my-4 text-[1.35rem]'>
      Rental Conditions
    </h4>
    <div className='grid grid-cols-4 gap-4'>
      {
        rental_condition.map(({title, icon, isChecked, feature}, inx) => {
          return <FeatureTab title={title} icon={icon} isChecked={isChecked} key={inx} feature={feature} func={toggleFeature_r}/>
        })
      }
    </div>
</div>
  )
};

export default CarFeature;
