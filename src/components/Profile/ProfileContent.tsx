import React, { useEffect, useState } from 'react';
import { backend_url, server } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@material-ui/core"
import { MdOutlineTrackChanges, MdTrackChanges } from 'react-icons/md';
import { updatUserAddress, updateUserInformation } from '../../redux/actions/user';
import { toast } from 'react-toastify';
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx';
import { Country, State } from "country-state-city";

interface ProfileContentProps {
    active: any,
    updatUserAddress: any,
    updateUserInformation: any
    deleteUserAddress: any
}
const ProfileContent: React.FC<ProfileContentProps> = ({ active, updateUserInformation, updatUserAddress, deleteUserAddress }) => {
    const { user, error, successMessage } = useSelector((state: any) => state.user)

    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: "clearErrors" })
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch({ type: "clearMessages" });
        }
    }, [error, successMessage])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updateUserInformation(name, email, phoneNumber, password))
    }

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {

        // e.preventDefault();
        const file = e.target?.files[0];
        setAvatar(file);

        const formData = new FormData();
        formData.append("image", e.target?.files[0]);

        await axios.put(`${server}/user/update-avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }).then((response) => {
            window.location.reload();
        }).catch((error) => {
            toast.error(error.message);
        })
    };

    return (
        <div className='w-full'>
            {/* profile */}
            {active === 1 && (
                <>
                    <div className="flex justify-center w-full">
                        <div className="relative">
                            {user && user.avatar && (
                                <img
                                    src={`${backend_url}${user.avatar}`}
                                    className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                                    alt=""
                                />
                            )}
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
                                    <label className="block pb-2">Enter your password</label>
                                    <input
                                        type="password"
                                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                        <Address updatUserAddress={updatUserAddress} deleteUserAddress={deleteUserAddress} />
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
            <br />
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
                    <AiOutlineDelete size={25} className='cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

interface AddressProps {
    updatUserAddress: any
    deleteUserAddress: any
}
const Address: React.FC<AddressProps> = ({ updatUserAddress, deleteUserAddress }) => {

    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [addressType, setAddressType] = useState("");
    const { user } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    const addressTypeData = [
        {
            name: "Default",
        },
        {
            name: "Home",
        },
        {
            name: "Office",
        },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (addressType === "" || country === "" || city === "") {
            toast.error("Please fill all the fields!");
        } else {
            dispatch(
                updatUserAddress(
                    country,
                    city,
                    address1,
                    address2,
                    zipCode,
                    addressType
                )
            );
            setOpen(false);
            setCountry("");
            setCity("");
            setAddress1("");
            setAddress2("");
            setZipCode("");
            setAddressType("");
        }
    };

    const handleDelete = (item: any) => {
        const id = item._id;
        dispatch(deleteUserAddress(id));
    };

    return (
        <div className='w-full px-5'>
            {
                open && (
                    <div className='fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center'>
                        <div className='w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll'>
                            <div className='w-full flex justify-end p-3'>
                                <RxCross1 size={30} className="cursor-pointer" onClick={() => setOpen(false)} />
                            </div>
                            <h1 className="text-center text-[25px] font-Poppins">Add New Address</h1>
                            <div className='w-full block p-4'>
                                <form aria-required onSubmit={handleSubmit} className="w-full">
                                    <div className="w-full block p-4">
                                        <div className="w-full pb-2">
                                            <label className="block pb-2">Country</label>
                                            <select
                                                name=""
                                                id=""
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                className="w-[95%] border h-[40px] rounded-[5px]"
                                            >
                                                <option value="" className="block border pb-2">
                                                    choose your country
                                                </option>
                                                {Country &&
                                                    Country.getAllCountries().map((item) => (
                                                        <option
                                                            className="block pb-2"
                                                            key={item.isoCode}
                                                            value={item.isoCode}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>

                                        <div className="w-full pb-2">
                                            <label className="block pb-2">Choose your City</label>
                                            <select
                                                name=""
                                                id=""
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                className="w-[95%] border h-[40px] rounded-[5px]"
                                            >
                                                <option value="" className="block border pb-2">
                                                    choose your city
                                                </option>
                                                {State &&
                                                    State.getStatesOfCountry(country).map((item) => (
                                                        <option
                                                            className="block pb-2"
                                                            key={item.isoCode}
                                                            value={item.isoCode}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>

                                        <div className="w-full pb-2">
                                            <label className="block pb-2">Address 1</label>
                                            <input
                                                type="address"
                                                className={`${styles.input}`}
                                                required
                                                value={address1}
                                                onChange={(e) => setAddress1(e.target.value)}
                                            />
                                        </div>
                                        <div className="w-full pb-2">
                                            <label className="block pb-2">Address 2</label>
                                            <input
                                                type="address"
                                                className={`${styles.input}`}
                                                required
                                                value={address2}
                                                onChange={(e) => setAddress2(e.target.value)}
                                            />
                                        </div>

                                        <div className="w-full pb-2">
                                            <label className="block pb-2">Zip Code</label>
                                            <input
                                                type="number"
                                                className={`${styles.input}`}
                                                required
                                                value={zipCode}
                                                onChange={(e) => setZipCode(e.target.value)}
                                            />
                                        </div>

                                        <div className="w-full pb-2">
                                            <label className="block pb-2">Address Type</label>
                                            <select
                                                name=""
                                                id=""
                                                value={addressType}
                                                onChange={(e) => setAddressType(e.target.value)}
                                                className="w-[95%] border h-[40px] rounded-[5px]"
                                            >
                                                <option value="" className="block border pb-2">
                                                    Choose your Address Type
                                                </option>
                                                {addressTypeData &&
                                                    addressTypeData.map((item) => (
                                                        <option
                                                            className="block pb-2"
                                                            key={item.name}
                                                            value={item.name}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>

                                        <div className=" w-full pb-2">
                                            <input
                                                type="submit"
                                                className={`${styles.input} mt-5 cursor-pointer`}
                                                required
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
                    My Addresses
                </h1>
                <div
                    className={`${styles.button} !rounded-md`}
                    onClick={() => setOpen(true)}
                >
                    <span className="text-[#fff]">Add New</span>
                </div>
            </div>
            <br />
            {user &&
                user?.addresses?.map((item: any, index: any) => (
                    <div
                        className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
                        key={index}
                    >
                        <div className="flex items-center">
                            <h5 className="pl-5 font-[600]">{item.addressType}</h5>
                        </div>
                        <div className="pl-8 flex items-center">
                            <h6 className="text-[12px] 800px:text-[unset]">
                                {item.address1} {item.address2}
                            </h6>
                        </div>
                        <div className="pl-8 flex items-center">
                            <h6 className="text-[12px] 800px:text-[unset]">
                                {user && user.phoneNumber}
                            </h6>
                        </div>
                        <div className="min-w-[10%] flex items-center justify-between pl-8">
                            <AiOutlineDelete
                                size={25}
                                className="cursor-pointer"
                                onClick={() => handleDelete(item)}
                            />
                        </div>
                    </div>
                ))}

            {user && user?.addresses?.length === 0 && (
                <h5 className="text-center pt-8 text-[18px]">
                    You not have any saved address!
                </h5>
            )}
        </div>
    );
};

export default ProfileContent