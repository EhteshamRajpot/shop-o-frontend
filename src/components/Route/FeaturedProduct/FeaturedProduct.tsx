import React, { useEffect } from 'react'
import styles from '../../../styles/styles';
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addTocart } from '../../../redux/actions/cart';
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';

interface FeaturedProductProps {
    getAllProducts: any
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ getAllProducts }) => {
    const dispatch = useDispatch()
    const { allProducts } = useSelector((state: any) => state.products);


    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Featured Products</h1>
                </div>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                    {allProducts && allProducts?.length > 0 ? (
                        allProducts.map((i: any, index: any) => (
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

export default FeaturedProduct