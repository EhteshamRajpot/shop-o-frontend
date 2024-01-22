import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductDetails from '../components/Products/ProductDetails.tsx';
import { useParams } from 'react-router-dom';
import { productData } from '../static/data.tsx';
import SuggestedProduct from "../components/Products/SuggestedProduct.tsx";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getAllProductsShop } from '../redux/actions/product.tsx';

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
    const { allProducts, loading } = useSelector((state: any) => state.products)
    console.log("Product Data", allProducts)
    const { name } = useParams();
    const [data, setData] = useState<Product | null>(null);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const productName = name?.replace(/-/g, " ");
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            const product = allProducts.find((i: any) => i.name === productName);
            setData(product || null);
            setProductsLoaded(true);
        }
    }, [allProducts, productName]);

    console.log("Products", data);

    if (!productsLoaded && loading) {
        // You can render a loading indicator here
        return <p>Loading...</p>;
    }
    return (
        <div>
            <Header activeHeading="" />
            <ProductDetails data={data} getAllProductsShop={getAllProductsShop} />
            {/* {
                data && <SuggestedProduct data={data}/>
            } */}
            <Footer />
        </div>
    );
};

export default ProductDetailsPage;
