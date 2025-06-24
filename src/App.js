import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import JerseysPage from './pages/JerseysPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminDashboard from './pages/AdminDashboard'; 

import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

import './styles/U-Player.css'; // Importa o CSS global

function AppContent() {
    const { currentUserType, logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/'); // Redireciona para a home após o logout
    };

    return (
        <>
            <Header currentUserType={currentUserType} onLogout={handleLogout} />
            <main id="mainContent">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/jerseys" element={<JerseysPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    {/* Rota protegida para admin */}
                    {currentUserType === 'admin' && (
                        <Route path="/admin/*" element={<AdminDashboard />} />
                    )}
                    <Route path="*" element={<div>404 - Página não encontrada</div>} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

function App() {
    return (
        <Router>
            <ProductProvider>
                <CartProvider>
                    <AuthProvider>
                        <AppContent />
                    </AuthProvider>
                </CartProvider>
            </ProductProvider>
        </Router>
    );
}

export default App;