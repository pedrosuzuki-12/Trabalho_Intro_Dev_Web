import React, { createContext, useState, useContext, useEffect } from 'react';
import { purchaseApi } from '../services/dataService';
import { useProduct } from './ProductContext';

const CartContext = createContext();

const getCartFromStorage = () => JSON.parse(localStorage.getItem('cart')) || [];
const saveCartToStorage = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(getCartFromStorage());
    const { products, refetchProducts } = useProduct(); // Pegamos a lista de produtos aqui

    useEffect(() => {
        saveCartToStorage(cart);
    }, [cart]);

    const addToCart = (product, selectedSize, quantity = 1) => {
        const stockOfSelectedSize = product.stockBySize?.[selectedSize] || 0;
        if (stockOfSelectedSize < quantity) {
            alert(`Estoque insuficiente para ${product.name} no tamanho ${selectedSize}. Disponível: ${stockOfSelectedSize}`);
            return;
        }

        const cartItemId = `${product._id}_${selectedSize}`;
        const existingItem = cart.find(item => item.cartItemId === cartItemId);

        if (existingItem) {
            const newTotalQuantity = existingItem.quantity + quantity;
            if (newTotalQuantity > stockOfSelectedSize) {
                alert(`Você não pode adicionar mais deste item. Estoque máximo (${stockOfSelectedSize}) atingido no carrinho.`);
                setCart(cart.map(item =>
                    item.cartItemId === cartItemId ? { ...item, quantity: stockOfSelectedSize } : item
                ));
            } else {
                setCart(cart.map(item =>
                    item.cartItemId === cartItemId ? { ...item, quantity: newTotalQuantity } : item
                ));
            }
        } else {
            setCart([...cart, {
                cartItemId, id: product._id, name: product.name,
                price: product.price, image: product.image,
                size: selectedSize, quantity
            }]);
        }
    };

    
    const updateQuantity = (cartItemId, newQuantity) => {
        const quantity = parseInt(newQuantity, 10);
        
        // Encontra o item no carrinho
        const itemInCart = cart.find(item => item.cartItemId === cartItemId);
        if (!itemInCart) return;

        // Encontra o produto completo na lista de produtos para verificar o estoque
        const productInStore = products.find(p => p._id === itemInCart.id);
        if (!productInStore) {
            alert('Produto não encontrado na loja. Removendo do carrinho.');
            removeFromCart(cartItemId);
            return;
        }

        const availableStock = productInStore.stockBySize[itemInCart.size] || 0;

        if (isNaN(quantity) || quantity <= 0) {
            removeFromCart(cartItemId);
            return;
        }

        if (quantity > availableStock) {
            alert(`Quantidade máxima para este item é ${availableStock}. Ajustando...`);
            setCart(cart.map(item =>
                item.cartItemId === cartItemId ? { ...item, quantity: availableStock } : item
            ));
        } else {
            setCart(cart.map(item =>
                item.cartItemId === cartItemId ? { ...item, quantity: quantity } : item
            ));
        }
    };

    const removeFromCart = (cartItemId) => {
        setCart(cart.filter(item => item.cartItemId !== cartItemId));
    };

    const emptyCart = () => {
        if (window.confirm('Tem certeza que deseja esvaziar o carrinho?')) {
            setCart([]);
        }
    };

    const processPayment = async (cardNumber) => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return false;
        }
        try {
            await purchaseApi(cart);
            setCart([]);
            await refetchProducts();
            return true;
        } catch (error) {
            alert(`Erro ao processar a compra: ${error.message}`);
            await refetchProducts();
            return false;
        }
    };

    const value = {
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        emptyCart,
        processPayment
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);