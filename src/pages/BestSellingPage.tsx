import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { productData } from '../static/data';
import styles from '../styles/styles';
import ProductCard from '../components/Route/ProductCard/ProductCard.tsx';

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
    useEffect(() => {
        const d = productData && productData?.sort((a, b) => b.total_sell - a.total_sell);
        setData((d || []) as Product[])
    }, [])
    return (
        <>
            <div>
                <Header activeHeading={"2"} />
                <br />
                <br />
                <div className={`${styles.section}`}>
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                        {productData && productData.map((i, index) => <ProductCard data={i} key={index} />)}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default BestSellingPage