import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import MomentItem from '../components/MomentItem'; // Importa o componente MomentItem

function ProductDetailPage() {
    const { id } = useParams(); // Pega o ID do produto da URL
    const navigate = useNavigate();
    const { products } = useProduct();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [stockMessage, setStockMessage] = useState('Selecione um tamanho para ver o estoque.');

    useEffect(() => {
        const foundProduct = products.find(p => p._id === id);
        if (foundProduct) {
            setProduct(foundProduct);
            setSelectedSize(null); // Reseta o tamanho selecionado ao mudar de produto
            setStockMessage('Selecione um tamanho para ver o estoque.');
        } 
    }, [id, products, navigate]);

    const handleSizeSelection = (size) => {
        setSelectedSize(size);
        const stock = product.stockBySize[size] || 0;
        setStockMessage(`Estoque (${size}): ${stock > 0 ? stock : 'Indisponível'}`);
    };

    const handleAddToCartClick = () => {
        if (selectedSize && (product.stockBySize[selectedSize] || 0) > 0) {
            addToCart(product, selectedSize, 1);
            alert(`${product.name} (Tamanho: ${selectedSize}) adicionado ao carrinho!`);
        } else {
            alert('Por favor, selecione um tamanho com estoque disponível.');
        }
    };

    if (!product) {
        return <div>Carregando detalhes do produto...</div>;
    }

    // Extrair o nome do jogador para o alt text dos momentos
    const playerNameForAlt = product.name.replace(/Jersey | \([^)]*\)| #\d+/gi, '').trim();

    return (
        <section id="productDetailView">
            <div className="product-detail-container">
                <button className="back-button" onClick={() => navigate(-1)}>← Voltar</button>
                <div className="product-detail-content">
                    <div className="product-detail-image-container">
                        <img id="detailProductImage" src={product.image || 'https://via.placeholder.com/400'} alt={product.name} />
                    </div>
                    <div className="product-detail-info">
                        <h2 id="detailProductName">{product.name}</h2>
                        <p className="detail-price" id="detailProductPrice">R$ {parseFloat(product.price).toFixed(2)}</p>
                        <div className="size-selection">
                            <h4>Escolha o Tamanho:</h4>
                            <div id="detailSizeOptionsContainer">
                                {Object.keys(product.stockBySize || {}).map(size => (
                                    <button
                                        key={size}
                                        className={selectedSize === size ? 'selected' : ''}
                                        disabled={(product.stockBySize[size] || 0) === 0}
                                        onClick={() => handleSizeSelection(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <p className="detail-stock" id="detailProductStock">{stockMessage}</p>
                        </div>
                        <div className="detail-description">
                            <h4>Descrição:</h4>
                            <p id="detailProductDescription">{product.description}</p>
                        </div>
                        <button
                            id="detailAddToCartButton"
                            className="add-to-cart-button"
                            disabled={!selectedSize || (product.stockBySize[selectedSize] || 0) === 0}
                            onClick={handleAddToCartClick}
                        >
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
                {product.playerMoments && product.playerMoments.length > 0 && (
                    <div id="playerMomentContainer">
                        <h4>Momentos Marcantes:</h4>
                        <div className="moments-wrapper">
                            {product.playerMoments.map((moment, index) => (
                                <MomentItem key={index} moment={moment} playerName={playerNameForAlt} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProductDetailPage;