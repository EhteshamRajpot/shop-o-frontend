import React, { useState, useEffect } from 'react';
import styles from '../../../styles/styles';
import ProductCard from "../ProductCard/ProductCard.tsx";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist.tsx';
import { addTocart } from '../../../redux/actions/cart.tsx';

interface BestDealsProps {
    getAllProducts: any
}
const BestDeals: React.FC<BestDealsProps> = ({ getAllProducts }) => {
    const dispatch = useDispatch()
    const { allProducts } = useSelector((state: any) => state.products);
    const [data, setData] = useState<typeof allProducts | undefined>();

    useEffect(() => {
      const allProductsData = allProducts ? [...allProducts] : [];
      const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
      const firstFive = sortedData && sortedData.slice(0, 5);
      setData(firstFive);
    }, [allProducts]);

    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Best Deals</h1>
                </div>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                    {/* {
                        data && data.length !== 0 && (
                            <>
                                {data && data.map((i, index) => <ProductCard data={i} key={index} isEvent={""} isShop={""} />)}
                            </>
                        )
                    } */}

                    {data && data?.length > 0 ? (
                        data && data.map((i: any, index: any) => (
                            <ProductCard
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
            </div>
        </div>
    )
}

export default BestDeals