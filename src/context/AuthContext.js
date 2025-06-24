// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginApi, registerApi, updateUserApi, deleteUserApi } from '../services/dataService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUserType, setCurrentUserType] = useState('guest');
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedUserType = sessionStorage.getItem('currentUserType');
        const storedUser = sessionStorage.getItem('loggedInUser');
        if (storedUserType && storedUser) {
            setCurrentUserType(storedUserType);
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const data = await loginApi(email, password);
            if (data.success) {
                setCurrentUserType(data.userType);
                setLoggedInUser(data.user);
                sessionStorage.setItem('currentUserType', data.userType);
                sessionStorage.setItem('loggedInUser', JSON.stringify(data.user));
                return true;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const register = async (newUser) => {
        try {
            const data = await registerApi(newUser);
            if (data.success) {
                setCurrentUserType('client');
                setLoggedInUser(data.user);
                sessionStorage.setItem('currentUserType', 'client');
                sessionStorage.setItem('loggedInUser', JSON.stringify(data.user));
                return { success: true };
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    };

    const logoutUser = () => {
        setCurrentUserType('guest');
        setLoggedInUser(null);
        sessionStorage.removeItem('currentUserType');
        sessionStorage.removeItem('loggedInUser');
    };

    // --- FUNÇÕES DE ADMIN ---
    const promoteClient = async (clientId) => {
        return await updateUserApi(clientId, { userType: 'admin' });
    };

    const demoteAdmin = async (adminId) => {
        return await updateUserApi(adminId, { userType: 'client' });
    };

    const deleteUser = async (userId) => {
        await deleteUserApi(userId);
        if (loggedInUser && loggedInUser._id === userId) {
            logoutUser();
        }
    };

    return (
        <AuthContext.Provider value={{ currentUserType, loggedInUser, login, logoutUser, register, promoteClient, demoteAdmin, deleteUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);