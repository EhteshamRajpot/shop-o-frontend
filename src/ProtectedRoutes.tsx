import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRoutesProps {
    isAuthenticated: any,
    children: any, 
    success: any
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ isAuthenticated, children, success }) => {
    if (!isAuthenticated || success === false) {
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoutes