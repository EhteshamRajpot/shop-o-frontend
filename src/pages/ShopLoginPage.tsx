import React, { useEffect } from 'react';
import ShopLogin from "../components/Shop/ShopLogin.tsx";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopLoginPage = () => {
    const navigate = useNavigate();
    const { isSeller, seller, isLoading } = useSelector((state: any) => state.seller);

    useEffect(() => {
        if (isSeller === true) {
            navigate(`/dashboard`)
        }
    }, [isSeller, isLoading])
    return (
        <>
            <ShopLogin />
        </>
    )
}

export default ShopLoginPage