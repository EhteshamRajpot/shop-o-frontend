import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductDetails from '../components/Products/ProductDetails.tsx';
import { useParams, useSearchParams } from 'react-router-dom';
import { productData } from '../static/data.tsx';
import SuggestedProduct from "../components/Products/SuggestedProduct.tsx";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsShop } from '../redux/actions/product.tsx';
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
    getAllProducts: any
}

const ProductDetailsPage: React.FC<Product> = ({ getAllProducts }) => {
    const { allProducts, loading } = useSelector((state: any) => state.products)
    const { allEvents } = useSelector((state: any) => state.events)
    const { id } = useParams();
    const [data, setData] = useState<Product | null>(null);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [searchParams] = useSearchParams();
    const eventData = searchParams.get("isEvent")
    const dispatch = useDispatch()
    // const productName = name?.replace(/-/g, " ");


    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        if (allEvents && allEvents.length > 0) {
            const eventData = allEvents.find((event: any) => event._id === id);
            if (eventData) {
                setData(eventData);
                return;
            }
        }

        if (allProducts && allProducts.length > 0) {
            const product = allProducts.find((product: any) => product._id === id);
            setData(product || null);
            setProductsLoaded(true);
        }
    }, [allProducts, allEvents, id]);


    if (!productsLoaded && loading) {
        // You can render a loading indicator here
        return <p>Loading...</p>;
    }
    return (
        <div>
            <Header activeHeading="" />
            <ProductDetails
                data={data}
                addTocart={addTocart}
                addToWishlist={addToWishlist}
                getAllProductsShop={getAllProductsShop}
                removeFromWishlist={removeFromWishlist}
            />
            {/* {
                data && <SuggestedProduct data={data}/>
            } */}
            <Footer />
        </div>
    );
};

export default ProductDetailsPage;
