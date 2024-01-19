import React from 'react';
import CreateProduct from "../../components/Shop/CreateProduct.tsx";
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.tsx';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar.tsx';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../redux/actions/product.tsx';

const ShopCreateProduct = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSideBar active={4} />
                </div>
                <div className="w-full justify-center flex">
                    <CreateProduct dispatch={dispatch} createProduct={createProduct}/>
                </div>
            </div>
        </div>
    )
}

export default ShopCreateProduct