import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { productData } from '../static/data';
import styles from '../styles/styles';
import ProductCard from '../components/Route/ProductCard/ProductCard.tsx';
import { getAllProducts } from '../redux/actions/product.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../redux/actions/wishlist.tsx';
import { addTocart } from '../redux/actions/cart.tsx';

interface Product {
    id: number;
    category: string;
    name: string;
    description: string;
    image_Url: { public_id: string; url: string }[];
    shop: {
        name: string;
        shop_avatar: { public_id: string; url: string };
        ratings: number;
    };
    price: number;
    discount_price?: number;
    rating: number;
    reviews?: { user: any; comment: string; rating: number }[];
    total_sell: number;
    stock: number;
}

const BestSellingPage: React.FC = () => {
    const [data, setData] = useState<Product[]>([])
    const { allProducts } = useSelector((state: any) => state.products);
    const dispatch = useDispatch();

    // First useEffect to fetch all products
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            const d = allProducts && allProducts?.slice()?.sort((a: any, b: any) => b.sold_out - a.sold_out);
            setData((d || []) as Product[])
        }
    }, [allProducts])

    return (
        <>
            <div>
                <Header activeHeading={"2"} />
                <br />
                <br />
                <div className={`${styles.section}`}>
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                        {data && data.map((i, index) => <ProductCard data={i} key={index} isShop={""} isEvent={""} addToWishlist={addToWishlist} addTocart={addTocart} removeFromWishlist={removeFromWishlist}/>)}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default BestSellingPage