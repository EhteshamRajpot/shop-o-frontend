import React from 'react'
import Header from '../components/Layout/Header.tsx'
import Footer from '../components/Layout/Footer.tsx'
import { getAllOrdersOfUser } from '../redux/actions/order.tsx';
import UserOrderDetails from "../components/UserOrderDetails.tsx";

const OrderDetailsPage = () => {
  return (
    <div>
        <Header activeHeading=''/>
        <UserOrderDetails getAllOrdersOfUser={getAllOrdersOfUser}/>
        <Footer />
    </div>
  )
}

export default OrderDetailsPage