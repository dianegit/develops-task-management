import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        if (authService.isAuthenticated()) {
            try {
                const userData = await authService.getProfile();
                setUser(userData);
            } catch (error) {
                console.error('Auth check failed:', error);
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (credentials) => {
        await authService.login(credentials);
        await checkAuth();
    };

    const register = async (userData) => {
        await authService.register(userData);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
