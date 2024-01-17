import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductDetails from '../components/Products/ProductDetails.tsx';
import { useParams } from 'react-router-dom';
import { productData } from '../static/data.tsx';
import SuggestedProduct from "../components/Products/SuggestedProduct.tsx";

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

const ProductDetailsPage: React.FC<Product> = () => {
    const { name } = useParams();
    const [data, setData] = useState<Product | null>(null);
    const productName = name?.replace(/-/g, " ");

    useEffect(() => {
        const data = productData.find((i) => i.name === productName);
        setData((data || []) as Product);
    }, []);

    return (
        <div>
            <Header activeHeading="" />
            <ProductDetails data={data} />
            {
                data && <SuggestedProduct data={data}/>
            }
            <Footer />
        </div>
    );
};

export default ProductDetailsPage;
