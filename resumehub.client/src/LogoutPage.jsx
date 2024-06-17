import { Navigate } from 'react-router-dom';
import { useAuth } from './AppContext';

export default function LogoutPage() {

    const { isAuthenticated, setIsAuthenticated } = useAuth();
    if (isAuthenticated) {

        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    }

    return <Navigate to='/login' replace />;
}