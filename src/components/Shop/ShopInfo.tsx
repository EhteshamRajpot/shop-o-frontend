import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../Layout/Loader.tsx';
import axios from 'axios';
import { backend_url, server } from '../../server.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface ShopInfoProps {
    isOwner: boolean,
    getAllEventsShop: any,
    getAllProductsShop: any,
}

const ShopInfo: React.FC<ShopInfoProps> = ({ isOwner, getAllProductsShop, getAllEventsShop }) => {
    // console.log(getAllEventsShop)
    // console.log(getAllProductsShop)

    const [data, setData] = useState<any>({})
    const [isLoading, setIsLoading] = useState(false)

    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${server}/shop/get-shop-info/${id}`);
                setData(response?.data?.shop);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);


    const logoutHandler = async () => {
        axios.get(`${server}/shop/logout`, {
            withCredentials: true,
        }).then((res) => {
            toast.success(res.data.message)
            // navigate("/shop-login")
            window.location.reload();
        }).catch((error) => {
            console.log(error?.response?.data?.message)
        });
    };
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <div className="w-full py-5">
                            <div className="w-full flex item-center justify-center">
                                <img
                                    src={`${backend_url}${data?.avatar}`}
                                    alt=""
                                    className="w-[150px] h-[150px] object-cover rounded-full"
                                />
                            </div>
                            <h3 className="text-center py-2 text-[20px]">{data?.name}</h3>
                            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
                                {data?.description}
                            </p>
                        </div>
                        <div className="p-3">
                            <h5 className="font-[600]">Address</h5>
                            <h4 className="text-[#000000a6]">{data?.address}</h4>
                        </div>
                        <div className="p-3">
                            <h5 className="font-[600]">Phone Number</h5>
                            <h4 className="text-[#000000a6]">{data?.phoneNumber}</h4>
                        </div>
                        <div className="p-3">
                            <h5 className="font-[600]">Total Products</h5>
                            <h4 className="text-[#000000a6]">109</h4>
                        </div>
                        <div className="p-3">
                            <h5 className="font-[600]">Shop Ratings</h5>
                            <h4 className="text-[#000000b0]">4.5</h4>
                        </div>
                        <div className="p-3">
                            <h5 className="font-[600]">Joined On</h5>
                            <h4 className="text-[#000000b0]">{data?.createdAt?.slice(0, 10)}</h4>
                        </div>
                        {isOwner && (
                            <div className="py-3 px-4">
                                <Link to="/settings">
                                    <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                                        <span className="text-white">Edit Shop</span>
                                    </div>
                                </Link>
                                <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                                    onClick={logoutHandler}
                                >
                                    <span className="text-white">Log Out</span>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        </>
    )
}

export default ShopInfo