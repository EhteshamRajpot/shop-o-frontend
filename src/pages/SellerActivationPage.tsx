import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { server } from "../server";
import axios from 'axios';

const SellerActivationPage = () => {
    const { activation_token } = useParams();
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        if (activation_token) {
            const sendRequest = async () => {
                await axios
                    .post(`${server}/shop/activation`, {
                        activation_token,
                    })
                    .then((res) => {
                        console.log(res?.data?.success);
                        setStatus(res?.data?.success);
                    })
                    .catch((err) => {
                        console.log(err?.message);
                    });
            };
            sendRequest();
        }
    }, []);

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {status === "true" ? (
                <h4>Your token is expired!</h4>
            ) : (
                <h2>Your shop has been created suceessfully!</h2>
            )}
        </div>
    );
};

export default SellerActivationPage;