import React, { useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';

function AdminProductManagement() {
    const { products, addProduct, updateProduct, deleteProduct } = useProduct();

    const [currentProductEditingId, setCurrentProductEditingId] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '', price: '', description: '',
        stockP: 0, stockM: 0, stockG: 0, stockGG: 0,
        image: '', isFeatured: false,
        momentImage1: '', momentDescription1: '',
        momentImage2: '', momentDescription2: '',
    });

    useEffect(() => {
        if (currentProductEditingId) {
            const productToEdit = products.find(p => p._id === currentProductEditingId);
            if (productToEdit) {
                setProductForm({
                    name: productToEdit.name || '',
                    price: productToEdit.price || '',
                    description: productToEdit.description || '',
                    stockP: productToEdit.stockBySize?.P || 0,
                    stockM: productToEdit.stockBySize?.M || 0,
                    stockG: productToEdit.stockBySize?.G || 0,
                    stockGG: productToEdit.stockBySize?.GG || 0,
                    image: productToEdit.image || '',
                    isFeatured: productToEdit.isFeatured || false,
                    momentImage1: productToEdit.playerMoments?.[0]?.image || '',
                    momentDescription1: productToEdit.playerMoments?.[0]?.text || '',
                    momentImage2: productToEdit.playerMoments?.[1]?.image || '',
                    momentDescription2: productToEdit.playerMoments?.[1]?.text || '',
                });
            }
        } else {
            // Limpa o formulário se não estiver editando
            cancelEditProduct();
        }
    }, [currentProductEditingId, products]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const playerMoments = [];
        if (productForm.momentImage1 && productForm.momentDescription1) {
            playerMoments.push({ image: productForm.momentImage1, text: productForm.momentDescription1 });
        }
        if (productForm.momentImage2 && productForm.momentDescription2) {
            playerMoments.push({ image: productForm.momentImage2, text: productForm.momentDescription2 });
        }

        const productData = {
            name: productForm.name,
            price: parseFloat(productForm.price),
            description: productForm.description,
            stockBySize: {
                'P': parseInt(productForm.stockP) || 0,
                'M': parseInt(productForm.stockM) || 0,
                'G': parseInt(productForm.stockG) || 0,
                'GG': parseInt(productForm.stockGG) || 0,
            },
            image: productForm.image,
            isFeatured: productForm.isFeatured,
            playerMoments: playerMoments,
        };

        if (currentProductEditingId) {
            updateProduct({ ...productData, id: currentProductEditingId });
        } else {
            addProduct(productData);
        }
        cancelEditProduct();
    };

    const handleEditProduct = (productId) => {
        setCurrentProductEditingId(productId);
        window.scrollTo(0, 0); // Rola a página para o topo para ver o formulário
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            deleteProduct(productId);
            if (currentProductEditingId === productId) {
                cancelEditProduct();
            }
        }
    };

    const cancelEditProduct = () => {
        setCurrentProductEditingId(null);
        setProductForm({
            name: '', price: '', description: '',
            stockP: 0, stockM: 0, stockG: 0, stockGG: 0,
            image: '', isFeatured: false,
            momentImage1: '', momentDescription1: '',
            momentImage2: '', momentDescription2: '',
        });
    };

    return (
        <div id="adminProductManagement" className="admin-section-content">
            <h2 id="admin-product-title">{currentProductEditingId ? 'Editando Produto' : 'Adicionar Novo Produto'}</h2>

            <form id="productForm" onSubmit={handleSubmit} aria-label="Formulário para adicionar ou editar produto">
                <label htmlFor="name">Nome do Produto</label>
                <input name="name" type="text" placeholder="Nome da Jersey" required value={productForm.name} onChange={handleChange} />
                
                <label htmlFor="price">Preço (R$)</label>
                <input name="price" type="number" placeholder="Preço" min="0" step="0.01" required value={productForm.price} onChange={handleChange} />
                
                <label htmlFor="description">Descrição</label>
                <textarea name="description" placeholder="Descrição detalhada da jersey" required value={productForm.description} onChange={handleChange}></textarea>
                
                <div className="form-group-stock-sizes">
                    <label>Quantidade em Estoque por Tamanho:</label>
                    <div><label>P:</label><input name="stockP" type="number" min="0" value={productForm.stockP} onChange={handleChange} /></div>
                    <div><label>M:</label><input name="stockM" type="number" min="0" value={productForm.stockM} onChange={handleChange} /></div>
                    <div><label>G:</label><input name="stockG" type="number" min="0" value={productForm.stockG} onChange={handleChange} /></div>
                    <div><label>GG:</label><input name="stockGG" type="number" min="0" value={productForm.stockGG} onChange={handleChange} /></div>
                </div>

                <label htmlFor="image">URL da Imagem Principal</label>
                <input name="image" type="text" placeholder="https://i.imgur.com/imagem.png" required value={productForm.image} onChange={handleChange} />

                <div className="form-group-moments">
                    <label>Momentos Marcantes (Opcional):</label>
                    <div>
                        <label>URL Imagem 1:</label><input name="momentImage1" type="text" value={productForm.momentImage1} onChange={handleChange} />
                        <label>Descrição 1:</label><input name="momentDescription1" type="text" value={productForm.momentDescription1} onChange={handleChange} />
                    </div>
                    <hr />
                    <div>
                        <label>URL Imagem 2:</label><input name="momentImage2" type="text" value={productForm.momentImage2} onChange={handleChange} />
                        <label>Descrição 2:</label><input name="momentDescription2" type="text" value={productForm.momentDescription2} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-group-featured">
                    <input type="checkbox" name="isFeatured" checked={productForm.isFeatured} onChange={handleChange} />
                    <label className="checkbox-label">Destaque na Home Page?</label>
                </div>
                
                <button type="submit">{currentProductEditingId ? 'Atualizar Produto' : 'Salvar Produto'}</button>
                {currentProductEditingId && (<button type="button" className="secondary" onClick={cancelEditProduct}>Cancelar Edição</button>)}
            </form>

            <section className="product-list-admin-container">
                <h3 style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1.5rem' }}>Produtos Cadastrados</h3>
                <div id="adminProductList">
                    {products.map(p => (
                        <div key={p._id} className="product-item-admin">
                            <img src={p.image} alt={p.name} />
                            <div className="product-info-wrapper">
                                <h4>{p.name}</h4>
                                <p><strong>ID:</strong> {p._id}</p>
                                <p><strong>Preço:</strong> R$ {p.price.toFixed(2)}</p>
                                <p><strong>Vendidos:</strong> {p.sold || 0}</p>
                            </div>
                            <div className="product-actions-admin">
                                <button onClick={() => handleEditProduct(p._id)}>Editar</button>
                                <button className="secondary" onClick={() => handleDeleteProduct(p._id)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default AdminProductManagement;