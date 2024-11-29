import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext); 
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (newToken) => {
        localStorage.setItem('token', newToken); 
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
      };


    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api/v1',
        headers: { Authorization: `Bearer ${token}` },
      });

    return (
        <AuthContext.Provider value={{ token, login, logout, axiosInstance }}>
            {children}
        </AuthContext.Provider>
    );
};