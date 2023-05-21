import React from 'react'

const HeaderTabs = ({title, number}) => {
  return (
    <div className='border-[#fff] border-2 rounded-2xl py-4 px-8 text-[200] '>
        <h4>{number} {title}</h4>
    </div>
  )
}

export default HeaderTabs