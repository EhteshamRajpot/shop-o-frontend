import React, { useEffect } from 'react'
import styles from '../../../styles/styles';
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';

interface FeaturedProductProps {
    getAllProducts: any
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ getAllProducts }) => {
    const dispatch = useDispatch()
    const { products } = useSelector((state: any) => state.products);
    
    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    console.log("All Products", products)

    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Featured Products</h1>
                </div>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                    {products && products?.length > 0 ? (
                        products.map((i: any, index: any) => (
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

export default FeaturedProduct