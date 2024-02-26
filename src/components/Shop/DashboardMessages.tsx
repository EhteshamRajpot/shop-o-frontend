import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";

const ENDPOINT = "https://socket-ecommerce-tu68.onrender.com/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const { seller } = useSelector((state: any) => state.seller);
  const { user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState(null);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-conversation-seller/${seller?._id}`,
          {
            withCredentials: true,
          }
        );
        setConversations(response.data.conversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    getConversation();
  }, [seller, messages]);

  useEffect(() => {
    if (seller) {
      const sellerId = seller._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat: any) => {
    const chatMembers = chat.members.find((member: any) => member !== seller?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        if (currentChat) {
          const response = await axios.get(
            `${server}/message/get-all-messages/${currentChat._id}`
          );
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    getMessage();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!currentChat) return;

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member: any) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage.trim() !== "") {
        const res = await axios.post(
          `${server}/message/create-new-message`,
          message
        );
        setMessages([...messages, res.data.message]);
        updateLastMessage();
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const updateLastMessage = async () => {
    try {
      if (currentChat) {
        socketId.emit("updateLastMessage", {
          lastMessage: newMessage,
          lastMessageId: seller._id,
        });

        await axios.put(
          `${server}/conversation/update-last-message/${currentChat._id}`,
          {
            lastMessage: newMessage,
            lastMessageId: seller._id,
          }
        );
      }
    } catch (error) {
      console.error("Error updating last message:", error);
    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const imageData = reader.result;
      setImages(imageData);
      try {
        const receiverId = currentChat.members.find(
          (member: any) => member !== seller._id
        );

        socketId.emit("sendMessage", {
          senderId: seller._id,
          receiverId,
          images: imageData,
        });

        const res = await axios.post(`${server}/message/create-new-message`, {
          images: imageData,
          sender: seller._id,
          text: newMessage,
          conversationId: currentChat._id,
        });
        setImages(null);
        setMessages([...messages, res.data.message]);
        updateLastMessageForImage();
      } catch (error) {
        console.error("Error sending image message:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  const updateLastMessageForImage = async () => {
    try {
      if (currentChat) {
        await axios.put(
          `${server}/conversation/update-last-message/${currentChat._id}`,
          {
            lastMessage: "Photo",
            lastMessageId: seller._id,
          }
        );
      }
    } catch (error) {
      console.error("Error updating last message for image:", error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClick = (id: any) => {
    navigate(`/dashboard-messages?${id}`);
    setOpen(true);
  };

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                userImage={user}
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={seller._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
              />
            ))}
        </>
      )}

      {open && (
        <SellerInbox
          userImage={user}
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

interface MessageListProps {
  userImage: any,
  data: any,
  index: any,
  setOpen: any,
  setCurrentChat: any,
  me: any,
  setUserData: any,
  online: any,
}
const MessageList: React.FC<MessageListProps> = ({
  userImage,
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = data.members.find((user: any) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    getUser();
  }, [me, data]);

  const handleClick = () => {
    setOpen(true);
    setCurrentChat(data);
    setUserData(user);
  };

  return (
    <div
      className={`w-full flex p-3 px-3 ${index === 0 ? "bg-[#00000010]" : "bg-transparent"
        }  cursor-pointer`}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={`${backend_url}${userImage?.avatar}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {data?.lastMessageId !== user?._id ? "You:" : `${user?.name}:`}{" "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

interface SellerInboxProps {
  scrollRef: any,
  setOpen: any,
  newMessage: any,
  setNewMessage: any,
  sendMessageHandler: any,
  messages: any,
  sellerId: any,
  userData: any,
  userImage: any,
  handleImageUpload: any,
}

const SellerInbox: React.FC<SellerInboxProps> = ({
  scrollRef,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  userImage,
  handleImageUpload,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <img
            src={`${backend_url}${userImage.avatar}`}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1>{userData ? "Active Now" : ""}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        {messages &&
          messages.map((item: any, index: any) => (
            <div
              className={`flex w-full my-2 ${item.sender === sellerId ? "justify-end" : "justify-start"
                }`}
              key={index}
              ref={scrollRef}
            >
              {item.sender !== sellerId && (
                <img
                  src={`${backend_url}${userData?.avatar}`}
                  className="w-[40px] h-[40px] rounded-full mr-3"
                  alt="Is"
                />
              )}
              {item.images.length >= 1 && item.images && (
                <img
                  src={item.images}
                  className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                  alt="Image"
                />
              )}
              {item.text !== "" && (
                <div>
                  <div
                    className={`w-max p-2 rounded ${item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
                      } text-[#fff] h-min`}
                  >
                    <p>{item.text}</p>
                  </div>
                  <p className="text-[12px] text-[#000000d3] pt-1">
                    {/* {item.createdAt} */}
                    {new Date(item.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>

      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
            onChange={handleImageUpload}
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
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
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
  );
};

export default DashboardMessages;
