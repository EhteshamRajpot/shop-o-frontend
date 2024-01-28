import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const Payment = () => {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const storedOrder = localStorage.getItem("latestOrder");

        // Check if the storedOrder is not null before parsing
        if (storedOrder !== null) {
            const parsedOrder = JSON.parse(storedOrder);
            setOrderData(parsedOrder);
        }
    }, []);

    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
                <div className="w-full 800px:w-[65%]">
                    <PaymentInfo
                    // user={user}
                    // open={open}
                    // setOpen={setOpen}
                    // onApprove={onApprove}
                    // createOrder={createOrder}
                    // paymentHandler={paymentHandler}
                    // cashOnDeliveryHandler={cashOnDeliveryHandler}
                    />
                </div>
                <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                    <CartData
                        orderData={orderData}
                    />
                </div>
            </div>
        </div>
    );
};

interface PaymentInfoProps {
    // user: any,
    // open: any,
    // setOpen: any,
    // onApprove: any,
    // createOrder: any,
    // paymentHandler: any,
    // cashOnDeliveryHandler: any,
}
const PaymentInfo: React.FC<PaymentInfoProps> = ({
    // user,
    // open,
    // setOpen,
    // onApprove,
    // createOrder,
    // paymentHandler,
    // cashOnDeliveryHandler,
}) => {
    const [select, setSelect] = useState(1);
    const [open, setOpen] = useState(false);

    const paymentHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your payment handling logic here
    };

    const onApprove = async (data: any, actions: any) => {
        // Add your PayPal onApprove logic here
    };

    const createOrder = (data: any, actions: any) => {
        // Add your PayPal createOrder logic here
    };

    const cashOnDeliveryHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your Cash on Delivery handling logic here
    };

    return (
        <>
            <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
                {/* select buttons */}
                <div>
                    <div className="flex w-full pb-5 border-b mb-2">
                        <div
                            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                            onClick={() => setSelect(1)}
                        >
                            {select === 1 ? (
                                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                            ) : null}
                        </div>
                        <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                            Pay with Debit/credit card
                        </h4>
                    </div>

                    {/* pay with card */}
                    {select === 1 ? (
                        <div className="w-full flex border-b">
                            <form className="w-full" onSubmit={paymentHandler}>
                                <div className="w-full flex pb-3">
                                    <div className="w-[50%]">
                                        <label className="block pb-2">Name On Card</label>
                                        <input
                                            required
                                            // placeholder={user && user.name}
                                            placeholder={"Muhammad Ehtesham"}
                                            className={`${styles.input} !w-[95%] text-[#444]`}
                                            // value={user && user.name}
                                            value={"Muhammad Ehtesham"}
                                        />
                                    </div>
                                    <div className="w-[50%]">
                                        <label className="block pb-2">Exp Date</label>
                                        {/* <CardExpiryElement
                                            className={`${styles.input}`}
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: "19px",
                                                        lineHeight: "1.5",
                                                        color: "#444",
                                                    },
                                                    empty: {
                                                        color: "#3a120a",
                                                        backgroundColor: "transparent",
                                                        "::placeholder": {
                                                            color: "#444",
                                                        },
                                                    },
                                                },
                                            }}
                                        /> */}
                                    </div>
                                </div>

                                <div className="w-full flex pb-3">
                                    <div className="w-[50%]">
                                        <label className="block pb-2">Card Number</label>
                                        {/* <CardNumberElement
                                            className={`${styles.input} !h-[35px] !w-[95%]`}
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: "19px",
                                                        lineHeight: "1.5",
                                                        color: "#444",
                                                    },
                                                    empty: {
                                                        color: "#3a120a",
                                                        backgroundColor: "transparent",
                                                        "::placeholder": {
                                                            color: "#444",
                                                        },
                                                    },
                                                },
                                            }}
                                        /> */}
                                    </div>
                                    <div className="w-[50%]">
                                        <label className="block pb-2">CVV</label>
                                        {/* <CardCvcElement
                                            className={`${styles.input} !h-[35px]`}
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: "19px",
                                                        lineHeight: "1.5",
                                                        color: "#444",
                                                    },
                                                    empty: {
                                                        color: "#3a120a",
                                                        backgroundColor: "transparent",
                                                        "::placeholder": {
                                                            color: "#444",
                                                        },
                                                    },
                                                },
                                            }}
                                        /> */}
                                    </div>
                                </div>
                                <input
                                    type="submit"
                                    value="Submit"
                                    className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                                />
                            </form>
                        </div>
                    ) : null}
                </div>

                <br />
                {/* paypal payment */}
                <div>
                    <div className="flex w-full pb-5 border-b mb-2">
                        <div
                            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                            onClick={() => setSelect(2)}
                        >
                            {select === 2 ? (
                                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                            ) : null}
                        </div>
                        <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                            Pay with Paypal
                        </h4>
                    </div>

                    {/* pay with payement */}
                    {select === 2 ? (
                        <div className="w-full flex border-b">
                            <div
                                className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                                onClick={() => setOpen(true)}
                            >
                                Pay Now
                            </div>
                            {open && (
                                <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                                    <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                                        <div className="w-full flex justify-end p-3">
                                            <RxCross1
                                                size={30}
                                                className="cursor-pointer absolute top-3 right-3"
                                                onClick={() => setOpen(false)}
                                            />
                                        </div>
                                        {/* <PayPalScriptProvider
                                            options={{
                                                "client-id":
                                                    "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                                            }}
                                        >
                                            <PayPalButtons
                                                style={{ layout: "vertical" }}
                                                onApprove={onApprove}
                                                createOrder={createOrder}
                                            />
                                        </PayPalScriptProvider> */}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>

                <br />
                {/* cash on delivery */}
                <div>
                    <div className="flex w-full pb-5 border-b mb-2">
                        <div
                            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                            onClick={() => setSelect(3)}
                        >
                            {select === 3 ? (
                                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                            ) : null}
                        </div>
                        <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                            Cash on Delivery
                        </h4>
                    </div>

                    {/* cash on delivery */}
                    {select === 3 ? (
                        <div className="w-full flex">
                            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
                                <input
                                    type="submit"
                                    value="Confirm"
                                    className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                                />
                            </form>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

interface CartDataProps {
    orderData: any
}
const CartData: React.FC<CartDataProps> = ({ orderData }) => {
// const CartData = () => {
    // const shipping = orderData?.shipping?.toFixed(2);
    return (
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
                <h5 className="text-[18px] font-[600]">$ {orderData?.subTotalPrice}</h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
                <h5 className="text-[18px] font-[600]">$ {orderData?.shipping}</h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                <h5 className="text-[18px] font-[600]">
                    {/* {orderData?.discountPrice ? "$" + orderData.discountPrice : "-"} */}
                    $ {orderData?.discountPrice}
                </h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">
                $ {orderData?.totalPrice}
            </h5>
            <br />
        </div>
    );
};

export default Payment;