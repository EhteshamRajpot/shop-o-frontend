import React from 'react';
import Header from '../components/Layout/Header.tsx';
import Footer from '../components/Layout/Footer.tsx';
import Checkout from '../components/Checkout/Checkout.tsx';
import CheckoutSteps from "../components/Checkout/CheckoutSteps.tsx";

interface CheckoutPageProps {
    active: number
    activeHeading: any
}

const CheckoutPage: React.FC<CheckoutPageProps> = () => {
    return (
        <div>
            <Header activeHeading={""} />
            <br />
            <br />
            <CheckoutSteps active={1} />
            <Checkout />
            <br />
            <br />
            <Footer />
        </div>
    )
}

export default CheckoutPage