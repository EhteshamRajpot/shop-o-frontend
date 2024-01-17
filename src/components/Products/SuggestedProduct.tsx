import React, { useState, useEffect } from 'react'
import { productData } from '../../static/data'
import ProductCard from '../Route/ProductCard/ProductCard'
import styles from '../../styles/styles'

interface SuggestedProductProps {
    data: any
}
const SuggestedProduct: React.FC<SuggestedProductProps> = ({ data }) => {
    const [products, setProducts] = useState<SuggestedProductProps["data"] | null>(null)

    useEffect(() => {
        const d = productData && productData.filter((i) => i.category === data.category);
        setProducts(d)
    }, [])
    return (
        <div>
            {data ? (
                <div className={`p-4 ${styles.section}`}>
                    <h2
                        className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
                    >
                        Related Product
                    </h2>
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                        {
                            products && products.map((i: any, index: any) => (
                                <ProductCard data={i} key={index} />
                            ))
                        }
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default SuggestedProduct