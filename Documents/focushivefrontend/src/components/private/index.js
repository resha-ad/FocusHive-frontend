// This file will contain private route component
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    // return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;