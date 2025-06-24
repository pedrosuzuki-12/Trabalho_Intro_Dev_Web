import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!name || !email || !password || !confirmPassword) {
            setError("Preencha os campos obrigatórios.");
            return;
        }
        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }
        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        const newUser = { name, email, password, address, phone };
        const result = await register(newUser); 

        if (result.success) {
            alert("Registro realizado com sucesso! Você já está logado.");
            navigate('/'); // Redireciona para a home
        } else {
            setError(result.message); // Exibe a mensagem de erro do contexto
        }
    };

    return (
        <section id="registerView">
            <div className="register-container" role="main" aria-labelledby="register-title-main">
                <h2 id="register-title-main">Registrar Nova Conta</h2>
                <form id="registerForm" onSubmit={handleSubmit}>
                    <label htmlFor="registerName">Nome Completo:</label>
                    <input type="text" id="registerName" value={name} onChange={(e) => setName(e.target.value)} required />
                    <label htmlFor="registerEmail">Email:</label>
                    <input type="email" id="registerEmail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="registerPassword">Senha:</label>
                    <input type="password" id="registerPassword" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label htmlFor="registerConfirmPassword">Confirmar Senha:</label>
                    <input type="password" id="registerConfirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <label htmlFor="registerAddress">Endereço:</label>
                    <textarea id="registerAddress" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                    <label htmlFor="registerPhone">Telefone:</label>
                    <input type="tel" id="registerPhone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <button type="submit">Registrar</button>
                </form>
                {error && <div id="registerError" className="error-message">{error}</div>}
                <p className="login-link-alt">Já tem uma conta? <Link to="/login">Faça login</Link></p>
            </div>
        </section>
    );
}

export default RegisterPage;