import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    return (
        <div className="product-card-dynamic">
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={product.image || 'https://via.placeholder.com/250'} alt={product.name} />
                <h4>{product.name}</h4>
                <p>R$ {parseFloat(product.price).toFixed(2)}</p>
            </Link>
        </div>
    );
}

export default ProductCard;