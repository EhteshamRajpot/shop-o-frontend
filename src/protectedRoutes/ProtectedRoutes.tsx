import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectedRoutesProps {
    isAuthenticated: any,
    children: any,
    success: any
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
    const { isAuthenticated, success, isLoading } = useSelector((state: any) => state.user)

    if (isLoading === false) {

        if (!isAuthenticated || success === false) {
            return <Navigate to="/login" replace />
        }
    }
    return children
}

export default ProtectedRoutes