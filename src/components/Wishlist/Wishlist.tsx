import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../styles/styles';
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { backend_url } from '../../server';

interface CartProps {
    addTocart: any,
    setOpenWishlist: any,
    removeFromWishlist: any,
}

const Wishlist: React.FC<CartProps> = ({ setOpenWishlist, removeFromWishlist, addTocart }) => {
    const { wishlist } = useSelector((state: any) => state.wishlist)

    const dispatch = useDispatch();

    const removeFromWishlistHandler = (data: any) => {
        dispatch(removeFromWishlist(data));
    };

    const addToCartHandler = (data: any) => {
        const newData = { ...data, qty: 1 };
        dispatch(addTocart(newData));
        setOpenWishlist(false);
    }


    return (
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
            <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm'>
                <div>
                    <div className='flex w-full justify-end pt-5 pr-5'>
                        <RxCross1
                            size={25}
                            className='cursor-pointer'
                            onClick={() => setOpenWishlist(false)}
                        />
                    </div>
                    {/* Item length */}
                    <div className={`${styles.noramlFlex} p-4`}>
                        <AiOutlineHeart size={25} />
                        <h5 className='pl-2 text-[20px] font-[500]'>
                            {wishlist.length}
                        </h5>
                    </div>

                    {/* cart single Items */}
                    <br />
                    <div className='w-full border-t overflow-y-auto' style={{ maxHeight: '400px' }} >
                        {
                            wishlist && wishlist.map((i: any, index: any) => (
                                <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

interface CartSingleProps {
    data: any,
    addToCartHandler: any,
    removeFromWishlistHandler: any,

}
const CartSingle: React.FC<CartSingleProps> = ({ data, removeFromWishlistHandler, addToCartHandler }) => {

    const [value, setValue] = useState(1);
    const totalPrice = data.discountPrice * value;

    return (
        <>
            <div className='border-b p-4'>
                <div className='w-full flex items-center'>
                    <RxCross1 className='cursor-pointer' onClick={() => removeFromWishlistHandler(data)} />
                    <img src={`${backend_url}${data?.images[0]}`} alt="" className='w-[80px] h-[80px] ml-2' />
                    <div className='pl-[5px]'>
                        <h1>{data?.name}</h1>
                        <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>
                            US${totalPrice}
                        </h4>
                    </div>
                    <div>
                        <BsCartPlus size={20} className="cursor-pointer" title="Add to cart"
                            onClick={() => addToCartHandler(data)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wishlist