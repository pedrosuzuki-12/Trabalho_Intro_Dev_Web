import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa o hook de autenticação

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth(); // Pega a função de login do contexto
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const success = await login(email, password); 
        
        if (success) {
            navigate('/');
        } else {
            setError('Usuário ou senha inválidos.');
        }
    };

    return (
        <section id="loginView">
            <div className="login-container" role="main" aria-labelledby="login-title-main">
                <h2 id="login-title-main">Login U-Player</h2>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <label htmlFor="loginEmail">Email</label>
                    <input
                        type="email"
                        id="loginEmail"
                        placeholder="exemplo@dominio.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="loginPassword">Senha</label>
                    <input
                        type="password"
                        id="loginPassword"
                        placeholder="Sua senha"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" aria-label="Entrar">Entrar</button>
                </form>
                {error && <div id="loginError" className="error-message" role="alert" aria-live="assertive">{error}</div>}
                <p className="register-link">Não tem uma conta? <Link to="/register">Registre-se aqui</Link></p>
            </div>
        </section>
    );
}

export default LoginPage;