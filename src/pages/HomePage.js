import React from 'react';
import ProductCard from '../components/ProductCard';
import { useProduct } from '../context/ProductContext'; // Usa o hook do contexto de produtos

function HomePage() {
    const { products } = useProduct(); // Pega os produtos do contexto
    const featuredProducts = products.filter(p => p.isFeatured === true); // Filtra os produtos em destaque

    return (
        <section id="Home">
            <section className="banner">
                <h2>Se Sinta Igual sua Maior Inspiração!</h2>
                <p>U-Player, a loja em que você se ve em seu jogador favorito!</p>
            </section>
            <h3>Jerseys em Destaque</h3>
            <div id="productListHome" className="produtos">
                {featuredProducts.length === 0 ? (
                    <p>Nenhuma jersey em destaque para exibir no momento.</p>
                ) : (
                    featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </section>
    );
}

export default HomePage;