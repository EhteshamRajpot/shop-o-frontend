import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productData } from '../static/data';
import styles from '../styles/styles';
import ProductCard from '../components/Route/ProductCard/ProductCard.tsx';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { all } from 'axios';
import { getAllProducts } from '../redux/actions/product.tsx';

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


const ProductsPage: React.FC = () => {
  const { allProducts } = useSelector((state: any) => state.products);
  const dispatch = useDispatch();

  // First useEffect to fetch all products
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState<Product[]>([]);

  // Second useEffect to filter and sort products when allProducts is available
  useEffect(() => {
    if (allProducts) {
      const filteredAndSortedProducts = categoryData === null
        ? allProducts.slice().sort((a: any, b: any) => a?.sold_out - b?.sold_out)
        : allProducts.filter((i: any) => i?.category === categoryData);

      setData(filteredAndSortedProducts);
    }
  }, [allProducts, categoryData]);

  return (
    <div>
      <Header activeHeading={"3"} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data?.map((i, index) => <ProductCard data={i} key={index} isShop={""} isEvent={""} />)}
        </div>
        {data && data?.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
