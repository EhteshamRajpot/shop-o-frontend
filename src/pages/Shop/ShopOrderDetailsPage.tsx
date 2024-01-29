import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.tsx'
import Footer from '../../components/Layout/Footer.tsx'
import OrderDetails from "../../components/Shop/OrderDetails.tsx";
import { getAllOrdersOfShop } from '../../redux/actions/order.tsx';

const ShopOrderDetailsPage = () => {
    return (
        <div>
            <DashboardHeader />
            <OrderDetails getAllOrdersOfShop={getAllOrdersOfShop}/>
            <Footer />
        </div>
    )
}

export default ShopOrderDetailsPage