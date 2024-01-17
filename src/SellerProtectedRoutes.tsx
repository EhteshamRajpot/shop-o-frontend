import React from 'react';
import { Navigate } from 'react-router-dom';

interface SellerProtectedRoutesProps {
    isSeller: any,
    children: any,
    success: any
}

const SellerProtectedRoutes: React.FC<SellerProtectedRoutesProps> = ({ isSeller, children }) => {
    if (!isSeller) {
        return <Navigate to="/" replace />
    }
    return children
}

export default SellerProtectedRoutes