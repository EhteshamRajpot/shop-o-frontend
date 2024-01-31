import React from 'react'
import { useSelector } from 'react-redux'
import { backend_url } from '../../server'

const DashboardMessages = () => {
  const { user } = useSelector((state: any) => state.user)
  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      <h1 className="text-center text-[30px] py-3 font-Poppins">
        All Messages
      </h1>
      {/* All messages list */}
      <MessageList />
      <div className='w-full flex p-1 px-3 my-3 bg-[#00000010] cursor-pointer'>
        <div className='relative'>
          <img
            src={`${backend_url}${user?.avatar}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className='w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]' />
        </div>
        <div className="pl-3">
          <h1 className="text-[18px]">Muhammad Ehtesham</h1>
          <p className='text-[16px] text-[#000c]'>You: Yeah I am good</p>
        </div>
      </div>
    </div>
  )
}

const MessageList = () => {
  return (
    <>
      <h1>Message List</h1>
    </>
  )
}

export default DashboardMessages