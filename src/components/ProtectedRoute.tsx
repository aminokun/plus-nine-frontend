import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const authContext = useContext(AuthContext);
    const location = useLocation();

    if (!authContext) {
        return null;
    }

    return authContext.isAuthenticated ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default ProtectedRoute;
