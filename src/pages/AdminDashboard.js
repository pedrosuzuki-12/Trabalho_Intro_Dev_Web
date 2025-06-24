import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminProductManagement from './AdminProductManagement';
import AdminUserManagement from './AdminUserManagement';

function AdminDashboard() {
    const { currentUserType, logoutUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // Hook para acessar a localização atual

    // Redireciona se não for admin
    useEffect(() => {
        if (currentUserType !== 'admin') {
            navigate('/login'); // Ou para a home, se preferir
        }
    }, [currentUserType, navigate]);

    if (currentUserType !== 'admin') {
        return null; // Não renderiza nada se não for admin, o useEffect já redireciona
    }

    return (
        <section id="adminView" style={{ display: 'flex' }}> {/* Força display flex */}
            <header role="banner" className="admin-header-internal">Admin Dashboard - U-Player Store</header>
            <div className="admin-container">
                <nav id="adminNav" className="admin-nav-internal">
                    <Link to="/admin/products" className={location.pathname.includes('/admin/products') ? 'active' : ''}>Gerenciar Produtos</Link>
                    <Link to="/admin/users" className={location.pathname.includes('/admin/users') ? 'active' : ''}>Gerenciar Usuários</Link>
                    <a href="#" onClick={logoutUser}>Logout</a> {/* Usa <a> com onClick para logout */}
                </nav>
                <main id="adminMainContent" role="main" className="admin-main-content-internal">
                    <Routes>
                        <Route path="products" element={<AdminProductManagement />} />
                        <Route path="users" element={<AdminUserManagement />} />
                        <Route path="/" element={<AdminProductManagement />} /> {/* Rota padrão para /admin */}
                    </Routes>
                </main>
            </div>
        </section>
    );
}

export default AdminDashboard;