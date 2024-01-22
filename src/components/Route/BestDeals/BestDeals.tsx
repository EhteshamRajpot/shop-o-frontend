import React, { useState, useEffect } from 'react';
import { productData } from '../../../static/data';
import styles from '../../../styles/styles';
import ProductCard from "../ProductCard/ProductCard.tsx";
import { useDispatch, useSelector } from 'react-redux';

interface BestDealsProps {
    getAllProducts: any
}
const BestDeals: React.FC<BestDealsProps> = ({ getAllProducts }) => {
    const dispatch = useDispatch()
    const [data, setData] = useState<typeof productData | undefined>();
    const { allProducts  } = useSelector((state: any) => state.products);

    useEffect(() => {
        const d = productData && productData.sort((a, b) => b.total_sell - a.total_sell);
        const firstFive = d?.slice(0, 5);
        setData(firstFive);
        dispatch(getAllProducts())
    }, []);

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

                    {allProducts  && allProducts ?.length > 0 ? (
                        allProducts .map((i: any, index: any) => (
                            <ProductCard data={i} key={index} isShop={true} isEvent={true} />
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