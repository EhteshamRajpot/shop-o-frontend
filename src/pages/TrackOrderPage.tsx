import React from 'react'
import Header from '../components/Layout/Header.tsx'
import Footer from '../components/Layout/Footer.tsx'
import TrackOrder from "../components/Profile/TrackOrder.tsx";
import { getAllOrdersOfUser } from '../redux/actions/order.tsx';

const TrackOrderPage = () => {
    return (
        <div>
            <Header activeHeading={""} />
            <TrackOrder getAllOrdersOfUser={getAllOrdersOfUser} />
            <Footer />
        </div>
    )
}

export default TrackOrderPage