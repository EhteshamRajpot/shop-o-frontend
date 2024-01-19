import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.tsx';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar.tsx';
import AllProducts from "../../components/Shop/AllProducts.tsx";
import { getAllProductsShop } from '../../redux/actions/product';
import { useDispatch } from 'react-redux';

const ShopAllProducts = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSideBar active={3} />
                </div>
                <div className="w-full justify-center flex">
                    <AllProducts dispatch={dispatch} getAllProductsShop={getAllProductsShop} />
                </div>
            </div>
        </div>
    )
}

export default ShopAllProducts