import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../styles/styles';
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { backend_url } from '../../server';
import { toast } from 'react-toastify';

interface CartProps {
    setOpenCart: any,
    removeFromCart: any,
    addTocart: any
}

const Cart: React.FC<CartProps> = ({ setOpenCart, removeFromCart, addTocart }) => {
    const { cart } = useSelector((state: any) => state.cart)
    const dispatch = useDispatch()

    const removeFromCartHandler = (data: any) => {
        dispatch(removeFromCart(data))
    }

    const totalPrice = cart.reduce((acc: any, item: any) => acc + item.qty * item.discountPrice, 0)

    const quantityChangeHandler = (data: any) => {
        dispatch(addTocart(data))
    }

    return (
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
            <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm'>
                <div>
                    <div className='flex w-full justify-end pt-5 pr-5'>
                        <RxCross1
                            size={25}
                            className='cursor-pointer'
                            onClick={() => setOpenCart(false)}
                        />
                    </div>
                    {/* Item length */}
                    <div className={`${styles.noramlFlex} p-4`}>
                        <IoBagHandleOutline size={25} />
                        <h5 className='pl-2 text-[20px] font-[500]'>
                            {cart.length} Items
                        </h5>
                    </div>

                    {/* cart single Items */}
                    <br />
                    <div className='w-full border-t overflow-y-auto' style={{ maxHeight: '400px' }} >
                        {
                            cart && cart.map((i: any, index: any) => (
                                <CartSingle key={index} data={i} quantityChangeHandler={quantityChangeHandler} removeFromCartHandler={removeFromCartHandler} />
                            ))
                        }
                    </div>
                </div>
                <div className="px-5 mb-3">
                    {/* checkout buttons */}
                    <Link to="/checkout">
                        <div
                            className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                            style={{ marginBottom: "40px" }}
                        >
                            <h1 className="text-[#fff] text-[18px] font-[600]">
                                Checkout Now ({totalPrice} USD)
                            </h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

interface CartSingleProps {
    data: any,
    quantityChangeHandler: any,
    removeFromCartHandler: any
}
const CartSingle: React.FC<CartSingleProps> = ({ data, quantityChangeHandler, removeFromCartHandler }) => {

    const [value, setValue] = useState(data?.qty)
    const totalPrice = data.discountPrice * value;

    const increment = (data: any) => {
        if (data?.stock < value) {
            toast.error("Product stock limited")
        } else {
            setValue(value + 1);
            const updatedCartData = { ...data, qty: value + 1 }
            quantityChangeHandler(updatedCartData)
        }
    }

    const decrement = (data: any) => {
        if (value > 1) {
            setValue(value - 1);
            const updatedCartData = { ...data, qty: value - 1 }
            quantityChangeHandler(updatedCartData)
        }
    }

    return (
        <>
            <div className='border-b p-4'>
                <div className='w-full flex items-center'>
                    <div>
                        <div className={`bg-[#e44343] border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
                            onClick={() => increment(data)}
                        >
                            <HiPlus size={18} color="#fff" />
                        </div>
                        <span className='pl-[10px]'>
                            {value}
                        </span>
                        <div className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
                            onClick={() => decrement(data)}
                        >
                            <HiOutlineMinus size={16} color="#7d879c" />
                        </div>
                    </div>
                    <img src={`${backend_url}${data?.images[0]}`} alt="" className='w-[80px] h-[80px] ml-2' />
                    <div className='pl-[5px]'>
                        <h1>{data?.name}</h1>
                        <h4 className='font-[400] text-[15px] text-[#00000082]'>$ {data.discountPrice} * {value}</h4>
                        <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>
                            US${totalPrice}
                        </h4>
                    </div>
                    <RxCross1
                        className="cursor-pointer"
                        onClick={() => removeFromCartHandler(data)}
                    />
                </div>
            </div>
        </>
    )
}

export default Cart