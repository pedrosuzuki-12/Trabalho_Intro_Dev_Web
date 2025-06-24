import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getProducts, addProductApi, updateProductApi, deleteProductApi } from '../services/dataService';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        const productsFromApi = await getProducts();
        setProducts(productsFromApi);
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const addProduct = async (newProductData) => {
        await addProductApi(newProductData);
        fetchProducts(); // Atualiza a lista após adicionar
    };

    const updateProduct = async (updatedProductData) => {
        await updateProductApi(updatedProductData.id, updatedProductData);
        fetchProducts(); // Atualiza a lista após editar
    };

    const deleteProduct = async (productId) => {
        await deleteProductApi(productId);
        fetchProducts(); // Atualiza a lista após deletar
    };

    const value = {
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        refetchProducts: fetchProducts 
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => useContext(ProductContext);