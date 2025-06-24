import React from 'react';
import ProductCard from '../components/ProductCard';
import { useProduct } from '../context/ProductContext';

function JerseysPage() {
    const { products } = useProduct(); // Pega todos os produtos do contexto

    return (
        <section id="Jerseys">
            <section className="banner">
                <h2>Se Sinta Igual sua Maior Inspiração!</h2>
                <p>Encontre o seu jogador favorito e relembre momentos marcantes</p>
            </section>
            <h3>Todas as Jerseys</h3>
            <div id="productListJerseys" className="produtos">
                {products.length === 0 ? (
                    <p>Nenhuma jersey disponível no momento.</p>
                ) : (
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </section>
    );
}

export default JerseysPage;