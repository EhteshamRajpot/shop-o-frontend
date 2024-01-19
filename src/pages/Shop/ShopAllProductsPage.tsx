import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.tsx';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar.tsx';
import AllProducts from "../../components/Shop/AllProducts.tsx"

const ShopAllProducts = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSideBar active={3} />
                </div>
                <div className="w-full justify-center flex">
                    <AllProducts />
                </div>
            </div>
        </div>
    )
}

export default ShopAllProducts