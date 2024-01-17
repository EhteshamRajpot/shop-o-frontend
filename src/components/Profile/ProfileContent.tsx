import React, { useState } from 'react';
import { backend_url } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@material-ui/core"
import { MdOutlineTrackChanges, MdTrackChanges } from 'react-icons/md';

interface ProfileContentProps {
    active: any
}
const ProfileContent: React.FC<ProfileContentProps> = ({ active }) => {
    const { user } = useSelector((state: any) => state.user)
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [zipCode, setZipCode] = useState<string | undefined>();
    const [address1, setAddress1] = useState<string | undefined>(user && user.address1)
    const [address2, setAddress2] = useState<string | undefined>(user && user.address2)
    const dispatch = useDispatch();

    const handleSubmit = () => { }

    const handleImage = () => { }

    return (
        <div className='w-full'>
            {/* profile */}
            {active === 1 && (
                <>
                    <div className="flex justify-center w-full">
                        <div className="relative">
                            <img
                                src={`${backend_url}${user?.avatar}`}
                                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                                alt=""
                            />
                            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                                <input
                                    type="file"
                                    id="image"
                                    className="hidden"
                                    onChange={handleImage}
                                />
                                <label htmlFor="image">
                                    <AiOutlineCamera />
                                </label>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="w-full px-5">
                        <form onSubmit={handleSubmit} aria-required={true}>
                            <div className="w-full 800px:flex block pb-3">
                                <div className=" w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2">Full Name</label>
                                    <input
                                        type="text"
                                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className=" w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2">Email Address</label>
                                    <input
                                        type="text"
                                        className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="w-full 800px:flex block pb-3">
                                <div className=" w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2">Phone Number</label>
                                    <input
                                        type="number"
                                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className=" w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2">Zip Code</label>
                                    <input
                                        type="number"
                                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                        required
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                    />
                                </div>

                                {/* <div className=" w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2">Enter your password</label>
                                    <input
                                        type="password"
                                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div> */}
                            </div>
                            <div className="w-full 800px:flex block pb-3">
                                <div className=" w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2">Address 1</label>
                                    <input
                                        type="number"
                                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                        required
                                        value={address1}
                                        onChange={(e) => setAddress1(e.target.value)}
                                    />
                                </div>

                                <div className=" w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2">Address 2</label>
                                    <input
                                        type="password"
                                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                        required
                                        value={address2}
                                        onChange={(e) => setAddress2(e.target.value)}
                                    />
                                </div>
                            </div>
                            <input
                                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                                required
                                value="Update"
                                type="submit"
                            />
                        </form>
                    </div>
                </>
            )}

            {/* order page */}
            {
                active === 2 && (
                    <div>
                        <AllOrders />
                    </div>
                )
            }

            {/* Refund page */}
            {
                active === 3 && (
                    <div>
                        <AllRefundOrders />
                    </div>
                )
            }

            {/* Track Order page */}
            {
                active === 5 && (
                    <div>
                        <TrackOrder />
                    </div>
                )
            }

            {/* Payment Method page */}
            {
                active === 6 && (
                    <div>
                        <PaymentMethod />
                    </div>
                )
            }

            {/* User Address */}
            {
                active === 7 && (
                    <div>
                        <Address />
                    </div>
                )
            }
        </div>
    )
}

const AllOrders = () => {
    const orders = [
        {
            _id: "7463hvbfbhfbrtr28820221",
            orderItems: [
                {
                    name: "Iphone 14 pro max"
                },

            ],
            totalPrice: 120,
            orderStatus: "Processing",
            cart: ["Iphone 14 pro max"],
            status: "active"
        },
        {
            _id: "7463hvbfbhfbrtr28820221",
            orderItems: [
                {
                    name: "Iphone 14 pro max"
                },

            ],
            totalPrice: 120,
            orderStatus: "Processing",
            cart: ["Iphone 14 pro max"],
            status: "active"
        },
    ];


    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            // cellClassName: (params:any) => {
            //     return params.getValue(params.id, "status") === "Delivered"
            //         ? "greenColor"
            //         : "redColor";
            // },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },

        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link to={`/user/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row: any[] = [];

    orders &&
        orders.forEach((item) => {
            row.push({
                id: item._id,
                itemsQty: item.cart.length,
                total: "US$ " + item.totalPrice,
                status: item.status,
            });
        });


    return (
        <div className='pl-8 pt-1'>
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    )
}

const AllRefundOrders = () => {
    const orders = [
        {
            _id: "7463hvbfbhfbrtr28820221",
            orderItems: [
                {
                    name: "Iphone 14 pro max"
                },

            ],
            totalPrice: 120,
            orderStatus: "Processing",
            cart: ["Iphone 14 pro max"],
            status: "active"
        },
        {
            _id: "7463hvbfbhfbrtr28820221",
            orderItems: [
                {
                    name: "Iphone 14 pro max"
                },

            ],
            totalPrice: 120,
            orderStatus: "Processing",
            cart: ["Iphone 14 pro max"],
            status: "active"
        },
    ];

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            // cellClassName: (params:any) => {
            //     return params.getValue(params.id, "status") === "Delivered"
            //         ? "greenColor"
            //         : "redColor";
            // },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },

        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link to={`/user/order/${params.id}`}>
                            <Button>
                                <MdTrackChanges size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row: any[] = [];

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$" + item.totalPrice,
            status: item.orderStatus,
        })
    })

    return (
        <div className='pl-8 pt-1'>
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                autoHeight
                disableSelectionClick
            />
        </div>
    )
}

const TrackOrder = () => {
    const orders = [
        {
            _id: "7463hvbfbhfbrtr28820221",
            orderItems: [
                {
                    name: "Iphone 14 pro max"
                },

            ],
            totalPrice: 120,
            orderStatus: "Processing",
            cart: ["Iphone 14 pro max"],
            status: "active"
        },
        {
            _id: "7463hvbfbhfbrtr28820221",
            orderItems: [
                {
                    name: "Iphone 14 pro max"
                },

            ],
            totalPrice: 120,
            orderStatus: "Processing",
            cart: ["Iphone 14 pro max"],
            status: "active"
        },
    ];

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            // cellClassName: (params:any) => {
            //     return params.getValue(params.id, "status") === "Delivered"
            //         ? "greenColor"
            //         : "redColor";
            // },
        },
        {
            field: "itemQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },

        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link to={`/user/order/${params.id}`}>
                            <Button>
                                <MdOutlineTrackChanges size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ]


    const row: any[] = []

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemQty: item.orderItems.length,
            total: "US$" + item.totalPrice,
            status: item.orderStatus
        });
    });

    return (
        <div className='pl-8 pt-1'>
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                autoHeight
                disableSelectionClick
            />
        </div>
    )
}

const PaymentMethod = () => {
    return (
        <div className='w-full px-5'>
            <div className='flex w-full items-center justify-between'>
                <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>Payment Methods</h1>
                <div className={`${styles.button} rounded-md`}>
                    <span className='text-[#fff]'>Add New</span>
                </div>
            </div>
            <br/>
            <div className='w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10'>
                <div className='flex items-center'>
                    <img src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
                    alt=""
                    />
                    <h5 className='pl-5 font-[600]'>Muhammad Ehtesham</h5>
                </div>
                <div className='pl-8 flex items-center'>
                    <h6>1234 **** **** ****</h6>
                    <h5 className='pl-6'>08/2023</h5>
                </div>
                <div className='min-w-[10%] flex items-center justify-between pl-8'>
                    <AiOutlineDelete size={25} className='cursor-pointer'/>
                </div>
            </div>
        </div>
    )
}

const Address = () => {
return (
    <div className='w-full px-5'>
            <div className='flex w-full items-center justify-between'>
                <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>My Address</h1>
                <div className={`${styles.button} rounded-md`}>
                    <span className='text-[#fff]'>Add New</span>
                </div>
            </div>
            <br/>
            <div className='w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10'>
                <div className='flex items-center'>
                    <h5 className='pl-5 font-[600]'>Default</h5>
                </div>
                <div className='pl-8 flex items-center'>
                    <h6>Ahmad Nagar, Street# 3 House No. 12, Johar Town, Lahore</h6>
                </div>
                <div className='min-w-[10%] flex items-center justify-between pl-8'>
                    <AiOutlineDelete size={25} className='cursor-pointer'/>
                </div>
            </div>
        </div>
)
}

export default ProfileContent