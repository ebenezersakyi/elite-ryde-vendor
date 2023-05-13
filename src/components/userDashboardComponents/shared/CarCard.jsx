import React from 'react'
import { useNavigate } from 'react-router-dom'
const CarCard = ({name, location, price_per_day, year, transmission, image, user_ratings}) => {
  const nav = useNavigate()
  return (
    <div className='rounded-[20px] border-[1px] backdrop-blur-md hover:border-[#808080] hover:border-[1px] duration-700 cursor-pointer' onClick={() => {
      nav('/dashboard/car')
    }}>
        <img src={image} alt="" className='rounded-t-[20px] w-full'/>

        <div className='p-4 flex flex-col gap-[2rem] '>
            <div>
            <h4 className='font-semibold text-[1.2rem]'>{name}</h4>
            <p className='text-[0.8rem] text-[#808080] font-light'>{location}, {year}, {transmission}</p>
            </div>


            <div>
                <p className='font-light'><span className='text-[#808080]'>User rating - </span> {user_ratings.toFixed(2)}/10</p>
                <p className='font-semibold text-egreen text-[1.1rem]'>Ghc {price_per_day.toFixed(2)}/day</p>
            </div>
        </div>
    </div>
  )
}

export default CarCard