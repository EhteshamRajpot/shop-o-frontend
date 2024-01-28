import React from 'react'
import CheckoutSteps from '../components/Checkout/CheckoutSteps.tsx'
import Footer from '../components/Layout/Footer.tsx'
import Header from '../components/Layout/Header.tsx'
import Payment from "../components/Payment/Payment.tsx";

interface PaymentPageProps {
    activeHeading: Number
}

const PaymentPage:React.FC<PaymentPageProps> = () => {
    return (
        <div className='w-full min-h-screen bg-[#f6f9fc]'>
            <Header activeHeading={""}/>
            <br />
            <br />
            <CheckoutSteps active={2} />
            <Payment />
            <br />
            <br />
            <Footer />
        </div>
    )
}

export default PaymentPage