import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Layout/Loader.tsx';

interface SellerProtectedRoutesProps {
    isSeller: any,
    children: any,
    success: any
}

const SellerProtectedRoutes: React.FC<SellerProtectedRoutesProps> = ({ children }) => {
    const { isSeller, isLoading } = useSelector((state: any) => state.seller)

    if (isLoading === true) {
        return <Loader />
    } else {
        if (!isSeller) {
            return <Navigate to="/shop-login" replace />
        }
        return children
    }
}

export default SellerProtectedRoutes;
