import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { backend_url, server } from '../../server'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai'
import styles from '../../styles/styles'
import { TfiGallery } from "react-icons/tfi";

const DashboardMessages = () => {
  const { user } = useSelector((state: any) => state.user)
  const { seller } = useSelector((state: any) => state.seller)
  const [conversations, setConversations] = useState<any[]>([]);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    axios.get(`${server}/conversation/get-all-conversation-seller/${seller?._id}`, {
      withCredentials: true
    }).then((res) => {
      setConversations(res.data.conversations)
    }).catch((error) => {
      console.log(error)
    })
  }, [seller])

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {/* All messages list */}
      {
        !open && (
          <>
            <h1 className="text-center text-[30px] py-3 font-Poppins">
              All Messages
            </h1>
            {
              conversations && conversations.map((item, index) => (
                <MessageList user={user} data={item} key={index} index={index} setOpen={setOpen} />
              ))
            }
          </>
        )}

      {
        open && (
          <SellerInbox user={user} setOpen={setOpen} />
        )
      }
    </div>
  )
}

interface MessageListProps {
  user: any
  data: any
  index: any
  setOpen: any
}
const MessageList: React.FC<MessageListProps> = ({ user, data, index, setOpen }) => {
  const [active, setActive] = useState<number>(0)
  const navigate = useNavigate()
  const handleClick = (id: any) => {
    // navigate(`dashboard-messages?${id}`)
    setOpen(true)
  }
  return (
    <>
      <div className={`w-full flex p-1 px-3 ${active === index ? "bg-[#00000010]" : "bg-transparent"} cursor-pointer`}
        // onClick={(e) => setActive(index) || handleClick(data._id)}
        onClick={(e) => handleClick(data._id)}
      >
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
    </>
  )
}

interface SellerInboxProps {
  user: any
  setOpen: any
}
const SellerInbox: React.FC<SellerInboxProps> = ({ user, setOpen }) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className='w-full flex p-3 items-center justify-between bg-slate-200'>
        <div className="flex">
          <img
            src={`${backend_url}${user?.avatar}`}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{user?.name}</h1>
            <h1>Active now</h1>
          </div>
        </div>
        <AiOutlineArrowRight size={30} onClick={() => setOpen(false)} className='cursor-pointer' />
      </div>

      {/* messages */}
      <div className='px-3 h-[65vh] py-3 overflow-y-scroll'>
        <div className='flex w-full my-2'>
          <img
            src={`${backend_url}${user?.avatar}`}
            className='w-[40px] h-[40px] rounded-full mr-3'
            alt=""
          />
          <div className='w-max p-2 rounded bg-[#38c776] text-[#fff] h-min'>
            <p>Hello there!</p>
          </div>
        </div>
        <div className='flex w-full justify-end my-2'>
          <div className='w-max p-2 rounded bg-[#38c776] text-[#fff] h-min'>
            <p>Hi!</p>
          </div>
        </div> 
      </div>
      {/* send message input */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
      // onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
          // onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            // value={newMessage}
            // onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  )
}

export default DashboardMessages