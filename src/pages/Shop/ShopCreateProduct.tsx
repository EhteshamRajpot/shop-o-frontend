import React from 'react';
import CreateProduct from "../../components/Shop/CreateProduct.tsx";
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';


const ShopCreateProduct = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSideBar active={4} />
                </div>
                <div className="w-full justify-center flex">
                    <CreateProduct />
                </div>
            </div>
        </div>
    )
}

export default ShopCreateProduct