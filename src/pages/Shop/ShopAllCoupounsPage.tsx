import React from 'react';
import { useDispatch } from 'react-redux';
import AllCoupouns from "../../components/Shop/AllCoupouns.tsx";
import { getAllProductsShop } from '../../redux/actions/product.tsx';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.tsx';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar.tsx';

const ShopAllCoupounsPage = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSideBar active={9} />
                </div>
                <div className="w-full justify-center flex">
                    <AllCoupouns dispatch={dispatch} getAllProductsShop={getAllProductsShop} />
                </div>
            </div>
        </div>
    )
}

export default ShopAllCoupounsPage