import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Importa o logo se estiver em src/assets

function Header({ currentUserType, onLogout }) {
    return (
        <header id="mainHeader">
            <Link to="/" className="logo-title">
                <img src={logo} alt="Logo U-Player" className="logo" />
                <h1 className="title">U-Player</h1>
            </Link>
            <nav>
                <div className="nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/jerseys" className="nav-link">Jerseys</Link>
                    <Link to="/cart" className="nav-link">Carrinho</Link>
                    {currentUserType === 'guest' ? (
                        <Link to="/login" className="nav-link">Login</Link>
                    ) : (
                        <>
                            {currentUserType === 'admin' && (
                                <Link to="/admin" className="nav-link">Admin</Link>
                            )}
                            <a href="#" onClick={onLogout} className="nav-link">Logout</a> {/* Usa <a> com onClick para logout, pois não é uma navegação de rota simples */}
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;