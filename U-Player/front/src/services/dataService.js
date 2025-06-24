// src/services/dataService.js

const API_BASE_URL = 'http://localhost:5000/api';

// --- Funções de Produto ---
export async function getProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Falha na rede ao buscar produtos.');
    return await response.json();
  } catch (error) {
    console.error("Erro em getProducts:", error);
    return []; // Retorna array vazio em caso de erro para não quebrar a UI
  }
}

export async function addProductApi(productData) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  return response.json();
}

export async function updateProductApi(id, productData) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  return response.json();
}

export async function deleteProductApi(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE'
  });
  return response.json();
}


// --- Funções de Usuário ---
export async function loginApi(email, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro de login');
  return data;
}

export async function registerApi(userData) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro de registro');
  return data;
}

export async function getUsersApi() {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) throw new Error('Falha ao buscar usuários.');
  return response.json();
}

export async function updateUserApi(id, userData) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Falha ao atualizar usuário.');
  return response.json();
}

export async function deleteUserApi(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Falha ao deletar usuário.');
    return response.json();
}

// --- Função de Compra ---
export async function purchaseApi(cart) {
  const response = await fetch(`${API_BASE_URL}/purchase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart }) // Envia o carrinho no formato esperado pelo backend
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao processar a compra.');
  return data;
}