import React from 'react'
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
    MdOutlineAdminPanelSettings,
    MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../server';

interface ProfileSideBarProps {
    active: any,
    setActive: any
}
const ProfileSidebar: React.FC<ProfileSideBarProps> = ({ active, setActive }) => {
    const { user } = useSelector((state: any) => state.user);
    const navigate = useNavigate();

    const logoutHandler = () => {
        axios.get(`${server}/user/logout`, { withCredentials: true }).then((res) => {
            toast.success(res.data.message)
            navigate("/login")
            window.location.reload()
        }).catch((error) => {
            console.log(error?.response?.data?.message)
        })
    }
    return (
        <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(1)}
            >
                <RxPerson size={20} color={active === 1 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 1 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Profile
                </span>
            </div>
            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(2)}
            >
                <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 2 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Orders
                </span>
            </div>
            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(3)}
            >
                <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 3 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Refunds
                </span>
            </div>

            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(4) || navigate("/inbox")}
                // onClick={() => setActive(4)}
            >
                <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 4 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Inbox
                </span>
            </div>

            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(5)}
            >
                <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 5 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Track Order
                </span>
            </div>

            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(6)}
            >
                <MdPayment size={20} color={active === 6 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 6 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Payment Methods
                </span>
            </div>
            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(8)}
            >
                <RiLockPasswordLine size={20} color={active === 8 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 8 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Change Password
                </span>
            </div>

            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(7)}
            >
                <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 7 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Address
                </span>
            </div>

            {user && user?.role === "Admin" && (
                <Link to="/admin/dashboard">
                    <div
                        className="flex items-center cursor-pointer w-full mb-8"
                        onClick={() => setActive(8)}
                    >
                        <MdOutlineAdminPanelSettings
                            size={20}
                            color={active === 7 ? "red" : ""}
                        />
                        <span
                            className={`pl-3 ${active === 8 ? "text-[red]" : ""
                                } 800px:block hidden`}
                        >
                            Admin Dashboard
                        </span>
                    </div>
                </Link>
            )}
            <div
                className="single_item flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(8) || logoutHandler()}
            >
                <AiOutlineLogin size={20} color={active === 9 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 9 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Log out
                </span>
            </div>
        </div>
    )
}

export default ProfileSidebar