import React from 'react'
import icon from '../../assets/nodata.svg'
export const NoData = ({data = "data"}) => {
  return (
    <div className='w-full grid place-items-center'>
        <span className='flex gap-4 items-center justify-center flex-col'>
        <img src={icon} alt="" className='w-[100px]'/>
        <p className='text-[1.3rem] text-center font-[200]'>No {data} available</p>
        </span>
    </div>
  )
}
