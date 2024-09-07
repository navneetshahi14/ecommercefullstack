import React from 'react'

const Input = ({
    icon,
    placeholder,
    id,
    type,
    handleChange=()=>{}
}) => {
  return (
    <>
        <div className="flex gap-2 bg-white p-2 items-center justify-center rounded-lg shadow-lg">
            <label htmlFor={id} ><i className={`fa-solid fa-${icon} cursor-pointer`}></i></label>
            <input onChange={handleChange} type={type} name={id} id={id} placeholder={placeholder} className='outline-none border-none bg-transparent mb-0' />
        </div>
    </>
  )
}

export default Input