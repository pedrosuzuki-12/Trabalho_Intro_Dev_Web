import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const { cart, updateQuantity, removeFromCart, emptyCart, processPayment } = useCart();
    const { currentUserType } = useAuth();
    const navigate = useNavigate();

    const [showCreditCardForm, setShowCreditCardForm] = useState(false);
    const [ccNumber, setCcNumber] = useState('');
    const [NomeCartao, setNomeCartao] = useState('');
    const [ccSeguranca, setCcseguranca] = useState('');


    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    const handleInitiateCheckout = () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        if (currentUserType === 'guest') {
            alert("Por favor, faça login ou registre-se para finalizar a compra.");
            navigate('/login');
            return;
        }
        setShowCreditCardForm(true);
    };

    const handleConfirmPayment = async () => {
        if (!ccNumber) {
            alert("Por favor, insira o número do seu cartão de crédito.");
            return;
        }
        const success = await processPayment(ccNumber);
        if (success) {
            setShowCreditCardForm(false);
            alert("Compra confirmada com sucesso!");
            setCcNumber('');
            navigate('/'); // Redireciona para a home após a compra
        }
    };

    const handleCancelPayment = () => {
        setShowCreditCardForm(false);
        setCcNumber('');
    };

    return (
        <section id="carrinho">
            <h3>Seu Carrinho</h3>
            <div id="cartItemsContainer">
                {cart.length === 0 ? (
                    <p>Seu carrinho está vazio.</p>
                ) : (
                    cart.map(item => (
                        <div key={item.cartItemId} className="cart-item">
                            <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} />
                            <div className="cart-item-info">
                                <h4>{item.name} {item.size ? `(Tamanho: ${item.size})` : ''}</h4>
                                <p>Preço Un.: R$ {parseFloat(item.price).toFixed(2)}</p>
                                <p>Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div className="cart-item-actions">
                                <label htmlFor={`qty-${item.cartItemId}`}>Qtd:</label>
                                <input
                                    type="number"
                                    id={`qty-${item.cartItemId}`}
                                    value={item.quantity}
                                    min="1"
                                    onChange={(e) => updateQuantity(item.cartItemId, parseInt(e.target.value))}
                                />
                                <button onClick={() => removeFromCart(item.cartItemId)} title="Remover Item">&times;</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div id="checkoutArea" className="checkout-area-style">
                {showCreditCardForm ? (
                    <div id="creditCardFormContainer">
                        <h4>Informações de Pagamento</h4>
                        <div className="form-group-cc">
                            <label htmlFor="NomeCartao">Nome impresso no Cartão:</label>
                            <input
                                type="text"
                                id="nomeCartao"
                                placeholder="ex: Lionel Messi"
                                value={NomeCartao}
                                onChange={(e) => setNomeCartao(e.target.value)}
                            />
                            <label htmlFor="ccNumber">Número do Cartão de Crédito:</label>
                            <input
                                type="text"
                                id="ccNumber"
                                placeholder="xxxx xxxx xxxx xxxx"
                                value={ccNumber}
                                onChange={(e) => setCcNumber(e.target.value)}
                            />
                            <label htmlFor="ccSeguranca">Código de Segurança:</label>
                            <input
                                type="text"
                                id="ccNumber"
                                placeholder="xxx"
                                value={ccSeguranca}
                                onChange={(e) => setCcseguranca(e.target.value)}
                            />
                        </div>
                        <div className="payment-buttons">
                            <button id="confirmPaymentButton" className="button-style" onClick={handleConfirmPayment}>Pagar Agora</button>
                            <button id="cancelPaymentButton" className="button-style secondary" onClick={handleCancelPayment}>Cancelar</button>
                        </div>
                    </div>
                ) : (
                    <div id="cartSummaryAndActions">
                        <div id="cartSummary">
                            <h4 id="cartTotal">Total: R$ {calculateTotal()}</h4>
                        </div>
                        <div id="cartInitialActions">
                            <button id="initiateCheckoutButton" className="button-style" onClick={handleInitiateCheckout}>Finalizar Compra</button>
                            <button onClick={emptyCart} className="button-style secondary">Esvaziar Carrinho</button>
                            <button onClick={() => navigate('/')} className="button-style secondary">Continuar Comprando</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default CartPage;