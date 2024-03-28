import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import Ratings from "../Products/Ratings";
import { backend_url } from "../../server";
import { toast } from "react-toastify";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import ProductDetailsCard from "../Route/ProductDetailsCard/ProductDetailsCard";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
// import Ratings from "../Products/Ratings";

interface ShopProfileDataProps {
    isOwner: boolean,
    isEvent: any,
    getAllProductsShop: any,
    getAllEventsShop: any
}
const ShopProfileData: React.FC<ShopProfileDataProps> = ({ isOwner, getAllEventsShop, getAllProductsShop, isEvent }) => {
    const { products } = useSelector((state: any) => state.products);
    const { events } = useSelector((state: any) => state.events);
    const dispatch = useDispatch();
    const [active, setActive] = useState(1);

    const { id } = useParams();
    useEffect(() => {
        dispatch(getAllProductsShop(id));
        dispatch(getAllEventsShop(id));
    }, [dispatch]);

    const allReviews =
        products && products.map((product: any) => product.reviews).flat();

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <div className="w-full flex">
                    <div className="flex items-center" onClick={() => setActive(1)}>
                        <h5
                            className={`font-[600] text-[20px] ${active === 1 ? "text-red-500" : "text-[#333]"
                                } cursor-pointer pr-[20px]`}
                        >
                            Shop Products
                        </h5>
                    </div>
                    <div className="flex items-center" onClick={() => setActive(2)}>
                        <h5
                            className={`font-[600] text-[20px] ${active === 2 ? "text-red-500" : "text-[#333]"
                                } cursor-pointer pr-[20px]`}
                        >
                            Running Events
                        </h5>
                    </div>

                    <div className="flex items-center" onClick={() => setActive(3)}>
                        <h5
                            className={`font-[600] text-[20px] ${active === 3 ? "text-red-500" : "text-[#333]"
                                } cursor-pointer pr-[20px]`}
                        >
                            Shop Reviews
                        </h5>
                    </div>
                </div>
                <div>
                    {isOwner && (
                        <div>
                            <Link to="/dashboard">
                                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                                    <span className="text-[#fff]">Go Dashboard</span>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <br />
            {active === 1 && (
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
                    {products && products?.length > 0 ? (
                        products.map((i: any, index: any) => (
                            // <ProductCard data={i} key={index} isShop={true} isEvent={true} />
                            <ShopProductCard
                                data={i}
                                key={index}
                                isShop={true}
                                isEvent={true}
                                addTocart={addTocart}
                                addToWishlist={addToWishlist}
                                removeFromWishlist={removeFromWishlist}
                            />
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            )}

            {active === 2 && (
                <div className="w-full">
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
                        {events &&
                            events.map((i: any, index: any) => (
                                // <ProductCard
                                //     data={i}
                                //     key={index}
                                //     isShop={true}
                                //     isEvent={true}
                                // />
                                <ProductCardEvent
                                    data={i}
                                    key={index}
                                    isShop={true}
                                    isEvent={true}
                                    addTocart={addTocart}
                                    addToWishlist={addToWishlist}
                                    removeFromWishlist={removeFromWishlist}
                                />
                            ))}
                    </div>
                    {events && events.length === 0 && (
                        <h5 className="w-full text-center py-5 text-[18px]">
                            No Events for this shop!
                        </h5>
                    )}
                </div>
            )}

            {active === 3 && (
                <div className="w-full">
                    {allReviews &&
                        allReviews.map((item: any, index: any) => (
                            <div className="w-full flex my-4">
                                <img
                                    src={`${backend_url}${item.user.avatar}`}
                                    className="w-[50px] h-[50px] rounded-full"
                                    alt=""
                                />
                                <div className="pl-2">
                                    <div className="flex w-full items-center">
                                        <h1 className="font-[600] pr-2">{item.user.name}</h1>
                                        <Ratings rating={item?.rating} />
                                    </div>
                                    <p className="font-[400] text-[#000000a7]">{item?.comment}</p>
                                    <p className="text-[#000000a7] text-[14px]">{item?.createdAt.slice(0, 10)}</p>
                                </div>
                            </div>
                        ))}
                    {allReviews && allReviews.length === 0 && (
                        <h5 className="w-full text-center py-5 text-[18px]">
                            No Reviews for this shop!
                        </h5>
                    )}
                </div>
            )}
        </div>
    );
};




interface ProductCardProps {
    data: any,
    isShop: any,
    isEvent: any,
    addTocart: any,
    addToWishlist: any,
    removeFromWishlist: any,
};
const ShopProductCard: React.FC<ProductCardProps> = ({ data, isShop, isEvent, removeFromWishlist, addToWishlist, addTocart }) => {
    const { wishlist } = useSelector((state: any) => state.wishlist);
    const { cart } = useSelector((state: any) => state.cart);
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (wishlist && wishlist.find((i: any) => i._id === data._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist]);

    const removeFromWishlistHandler = (data: any) => {
        setClick(!click);
        dispatch(removeFromWishlist(data));
    };

    const addToWishlistHandler = (data: any) => {
        setClick(!click);
        dispatch(addToWishlist(data));
    };

    const addToCartHandler = (id: any) => {
        const isItemExists = cart && cart.find((i: any) => i._id === id);
        if (isItemExists) {
            toast.error("Item already in cart!");
        } else {
            if (data.stock < 1) {
                toast.error("Product stock limited!");
            } else {
                const cartData = { ...data, qty: 1 };
                dispatch(addTocart(cartData));
                toast.success("Item added to cart successfully!");
            }
        }
    };

    return (
        <>
            <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
                <div className='flex justify-end'>

                </div>
                <Link to={`/product/${data?._id}`}>
                    <img
                        src={`${backend_url}${data?.images[0]}`}
                        alt=""
                        className="w-full h-[170px] object-contain"
                    />
                </Link>
                <Link to={`/shop/preview/${data?.shop?._id}`}>
                    <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
                </Link>
                <Link to={`/product/${data?._id}`}>
                    <h4 className='pb-3 font-[500]'>
                        {data?.name?.length > 40 ? data?.name?.slice(0, 40) + "..." : data?.name}
                    </h4>
                    <div className='flex'>
                        <Ratings rating={data?.ratings} />
                    </div>
                    <div className='py-2 flex items-center justify-between'>
                        <div className='flex'>
                            <h5 className={`${styles.productDiscountPrice}`}>
                                {data?.price === 0 ? data?.price : data?.discountPrice}$
                            </h5>
                            <h4 className={`${styles.price}`}>
                                {data?.originalPrice ? data?.originalPrice + " $" : null}
                            </h4>
                        </div>
                        <span className='font-[400] text-[17px] text-[#68d]'>
                            {data?.sold_out} sold
                        </span>
                    </div>
                </Link>
                {/* side options */}
                {/* <div>
                    {click ? (
                        <AiFillHeart
                            size={22}
                            className='cursor-pointer absolute right-2 top-5'
                            onClick={() => removeFromWishlistHandler(data)}
                            color={click ? "red" : "#333"}
                            title="Remove from wishlist"
                        />
                    ) : (
                        <AiOutlineHeart
                            size={22}
                            className='cursor-pointer absolute right-2 top-5'
                            onClick={() => addToWishlistHandler(data)}
                            color={click ? "red" : "#333"}
                            title="Add to wishlist"
                        />
                    )}
                    <AiOutlineEye
                        size={22}
                        className='cursor-pointer absolute right-2 top-14'
                        onClick={() => setOpen(!open)}
                        color="#333"
                        title="Quick View"
                    />
                    <AiOutlineShoppingCart
                        size={22}
                        className='cursor-pointer absolute right-2 top-24'
                        onClick={() => addToCartHandler(data._id)}
                        color="#333"
                        title="Add to cart"
                    />
                    {
                        open ? (
                            <ProductDetailsCard
                                data={data}
                                setOpen={setOpen}
                                addTocart={addTocart}
                                addToWishlist={addToWishlist}
                                removeFromWishlist={removeFromWishlist}
                            />
                        ) : null
                    }

                </div> */}


                <div>
                    <AiOutlineEye
                        size={22}
                        className='cursor-pointer absolute right-2'
                        style={{ marginTop: "-95px" }}
                        onClick={() => setOpen(!open)}
                        color="#333"
                        title="Quick View"
                    />
                    {
                        open ? (
                            <ProductDetailsCard
                                data={data}
                                setOpen={setOpen}
                                addTocart={addTocart}
                                addToWishlist={addToWishlist}
                                removeFromWishlist={removeFromWishlist}
                            />
                        ) : null
                    }

                </div>
            </div>
        </>
    )
}


interface ProductCardEventProps {
    data: any,
    isShop: any,
    isEvent: any,
    addTocart: any,
    addToWishlist: any,
    removeFromWishlist: any,
};

const ProductCardEvent: React.FC<ProductCardEventProps> = ({ data, isShop, isEvent, removeFromWishlist, addToWishlist, addTocart }) => {
    const { wishlist } = useSelector((state: any) => state.wishlist);
    const { cart } = useSelector((state: any) => state.cart);
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (wishlist && wishlist.find((i: any) => i._id === data._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist]);

    const removeFromWishlistHandler = (data: any) => {
        setClick(!click);
        dispatch(removeFromWishlist(data));
    };

    const addToWishlistHandler = (data: any) => {
        setClick(!click);
        dispatch(addToWishlist(data));
    };

    const addToCartHandler = (id: any) => {
        const isItemExists = cart && cart.find((i: any) => i._id === id);
        if (isItemExists) {
            toast.error("Item already in cart!");
        } else {
            if (data.stock < 1) {
                toast.error("Product stock limited!");
            } else {
                const cartData = { ...data, qty: 1 };
                dispatch(addTocart(cartData));
                toast.success("Item added to cart successfully!");
            }
        }
    };



    return (
        <>
            <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
                <div className='flex justify-end'>

                </div>
                <Link to={`/product/${data?._id}`}>
                    <img
                        src={`${backend_url}${data?.images[0]}`}
                        alt=""
                        className="w-full h-[170px] object-contain"
                    />
                </Link>
                <Link to={`/shop/preview/${data?.shop?._id}`}>
                    <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
                </Link>
                <Link to={`/product/${data?._id}`}>
                    <h4 className='pb-3 font-[500]'>
                        {data?.name?.length > 40 ? data?.name?.slice(0, 40) + "..." : data?.name}
                    </h4>
                    <div className='flex'>
                        <Ratings rating={data?.ratings} />
                    </div>
                    <div className='py-2 flex items-center justify-between'>
                        <div className='flex'>
                            <h5 className={`${styles.productDiscountPrice}`}>
                                {data?.price === 0 ? data?.price : data?.discountPrice}$
                            </h5>
                            <h4 className={`${styles.price}`}>
                                {data?.originalPrice ? data?.originalPrice + " $" : null}
                            </h4>
                        </div>
                        <span className='font-[400] text-[17px] text-[#68d]'>
                            {data?.sold_out} sold
                        </span>
                    </div>
                </Link>
                {/* side options */}
                <div>
                    <AiOutlineEye
                        size={22}
                        className='cursor-pointer absolute right-2 top-14'
                        style={{ marginTop: "175px" }}
                        onClick={() => setOpen(!open)}
                        color="#333"
                        title="Quick View"
                    />
                    {
                        open ? (
                            <ProductDetailsCard
                                data={data}
                                setOpen={setOpen}
                                addTocart={addTocart}
                                addToWishlist={addToWishlist}
                                removeFromWishlist={removeFromWishlist}
                            />
                        ) : null
                    }

                </div>
            </div>
        </>
    )
}



export default ShopProfileData;