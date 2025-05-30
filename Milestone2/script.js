// U-Player Store - scriptM2.js
// Script principal para todas as funcionalidades da loja online U-Player.
// Gerencia navegação SPA, autenticação, dados de produtos com estoque por tamanho,
// carrinho, página de detalhes, registro de cliente, e funcionalidades administrativas avançadas.

// ==========================================================================
// 0. Configuração Inicial e Variáveis Globais
// Define constantes e variáveis globais para controle de estado e URLs.
// ==========================================================================
const BEECEPTOR_BASE_URL = "https://u-player.free.beeceptor.com";
const GUEST = 'guest';
const CLIENT = 'client';
const ADMIN = 'admin';

let currentUserType = GUEST;
let currentProductEditingId = null;
let previousSectionId = 'Home';
let activeSectionId = null; // Inicia como null para forçar renderização na primeira carga
let currentSelectedSize = null;

// ==========================================================================
// 1. Inicialização da Aplicação e Dados de Exemplo
// Configura o estado inicial e carrega dados padrão no localStorage.
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    setupEventListeners();
    updateLoginLogoutLinks();
    showSection('Home'); // Mostra a Home ao carregar
});

// Popula o localStorage com dados iniciais se estiverem ausentes ou vazios.
function initializeData() {
    const initialProducts = [
        // Kobe Bryant
        {
            id: 'jersey_lakers_kobe',
            name: 'Jersey Lakers Kobe Bryant',
            price: 699.00,
            description: 'Jersey autêntica Mitchell & Ness de Kobe Bryant dos Los Angeles Lakers. Celebre seu legado e conquistas com esta peça icônica de alta qualidade.',
            image: 'https://i.imgur.com/h1JkbhT.png',
            stockBySize: { 'P': 10, 'M': 15, 'G': 5, 'GG': 3 },
            sold: 3,

        playerMoments: [ 
            {
                image: 'images/kobe.jpg',
                text: 'Iconica Imagem de Kobe campeão da NBA'
            },
            {
                image: 'images/kobe2.jpg',
                text: 'Kobe Bryant em enterrada Iconica'
            },
            {
                image: 'images/kobe3.jpg',
                text: 'Kobe Bryant comemorando a taça de campeão no desfile tradicional pós temporada!'
            },
        ]

        },
        {
            id: 'jersey_lakers_kobe_24_black',
            name: 'Jersey Lakers Kobe Bryant #24 (Preta)',
            price: 749.00,
            description: 'Jersey preta de Kobe Bryant #24 dos Los Angeles Lakers. Uma homenagem à Mamba Mentality e ao seu legado eterno na NBA.',
            image: 'https://imgur.com/V3L8WC9.png',
            stockBySize: { 'P': 8, 'M': 10, 'G': 6, 'GG': 12 },
            sold: 0,
        playerMoments: [ 
            {
                image: 'images/kobe.jpg',
                text: 'Iconica Imagem de Kobe campeão da NBA'
            },
            {
                image: 'images/kobe2.jpg',
                text: 'Kobe Bryant em enterrada Iconica'
            },
            {
                image: 'images/kobe3.jpg',
                text: 'Kobe Bryant comemorando a taça de campeão no desfile tradicional pós temporada!'
            },
        ]
        },
        // LeBron James
        {
            id: 'jersey_lakers_lebron_23_white',
            name: 'Jersey Lakers LeBron James #23 (Branca)',
            price: 699.00,
            description: 'Jersey oficial branca de LeBron James #23 dos Los Angeles Lakers. Conforto e estilo para os fãs do "King" James.',
            image: 'https://imgur.com/C33zQTG.png',
            stockBySize: { 'P': 8, 'M': 10, 'G': 6, 'GG': 11 },
            sold: 2,
        playerMoments: [ 
            {
                image: 'images/lebron.jpg',
                text: 'Iconica Imagem de Lebron abraçando a taça de campeão da NBA'
            },
            {
                image: 'images/lebron2.jpg',
                text: 'Lebron James em sua marca registrada: O King James!'
            },
            {
                image: 'images/lebron3.jpg',
                text: 'Lebron James em seu ritual pré jogo'
            },
        ]
        },
        {
            id: 'jersey_cavs_lebron_23_black',
            name: 'Jersey Cavaliers LeBron James #23 (Preta)',
            price: 699.00,
            description: 'Jersey preta de LeBron James #23 do Cleveland Cavaliers. Relembre os momentos históricos e o impacto do jogador com esta peça.',
            image: 'https://imgur.com/Lx0LNq5.png',
            stockBySize: { 'P': 8, 'M': 10, 'G': 6, 'GG': 9 },
            sold: 1,
        playerMoments: [ 
            {
                image: 'images/lebron.jpg',
                text: 'Iconica Imagem de Lebron abraçando a taça de campeão da NBA'
            },
            {
                image: 'images/lebron2.jpg',
                text: 'Lebron James em sua marca registrada: O King James!'
            },
            {
                image: 'images/lebron3.jpg',
                text: 'Lebron James em seu ritual pré jogo'
            },
        ]
        },
        // Stephen Curry
        {
            id: 'jersey_warriors_curry',
            name: 'Jersey Warriors Stephen Curry (Association Edition)',
            price: 699.00,
            description: 'Celebre o maior arremessador de todos os tempos com esta jersey Stephen Curry do Golden State Warriors (Association Edition).',
            image: 'https://i.imgur.com/BaaObxi.png',
            stockBySize: { 'P': 15, 'M': 18, 'G': 9, 'GG': 4 },
            sold: 11,
        playerMoments: [ 
            {
                image: 'images/curry.jpg',
                text: 'Iconica Imagem de Curry mordendo seu protetor bucal'
            },
            {
                image: 'images/curry2.jpg',
                text: 'Curry em sua comemoração "Night Night!"'
            },
            {
                image: 'images/curry3.jpg',
                text: 'Curry e sua marra...'
            },
        ]
        },
        {
            id: 'jersey_warriors_curry_30_blue',
            name: 'Jersey Warriors Stephen Curry #30 (Azul)',
            price: 699.00,
            description: 'Jersey azul de Stephen Curry #30 do Golden State Warriors. Celebre o talento e a história de um dos maiores arremessadores da NBA.',
            image: 'https://imgur.com/Kngsp2q.png',
            stockBySize: { 'P': 8, 'M': 10, 'G': 6, 'GG': 1 },
            sold: 0,
        playerMoments: [ 
            {
                image: 'images/curry.jpg',
                text: 'Iconica Imagem de Curry mordendo seu protetor bucal'
            },
            {
                image: 'images/curry2.jpg',
                text: 'Curry em sua comemoração "Night Night!"'
            },
            {
                image: 'images/curry3.jpg',
                text: 'Curry e sua marra...'
            },
        ]
            
        },
        // Dwyane Wade
        {
            id: 'jersey_miami_wade',
            name: 'Jersey Miami Heat Dwyane Wade (Swingman)',
            price: 699.00,
            description: 'Reviva os momentos de glória com esta jersey Dwyane Wade do Miami Heat (Swingman). Detalhes autênticos e tecido respirável para máximo conforto.',
            image: 'https://imgur.com/E2s8Mp2.png',
            stockBySize: { 'P': 8, 'M': 12, 'G': 7, 'GG': 5 },
            sold: 7,
        playerMoments: [ 
            {
                image: 'images/wade.jpg',
                text: 'Wade em pose iconica de enterrada'
            },
            {
                image: 'images/wade2.jpg',
                text: 'Wade no desfile de comemoração de campeão, com o troféu em seus braços'
            },
            {
                image: 'images/wade3.jpg',
                text: 'Wade em arremesso de 3 no estouro do cronômetro'
            },
        ]
        },
        {
            id: 'jersey_miami_wade_3_black',
            name: 'Jersey Miami Heat Dwyane Wade #3 (Preta)',
            price: 699.00,
            description: 'Jersey preta de Dwyane Wade #3 do Miami Heat. Celebre a lenda do Heat com este design clássico e arrojado.',
            image: 'https://imgur.com/biOXGuf.png',
            stockBySize: { 'P': 8, 'M': 10, 'G': 7, 'GG': 2 },
            sold: 5,
        playerMoments: [ 
            {
                image: 'images/wade.jpg',
                text: 'Wade em pose iconica de enterrada'
            },
            {
                image: 'images/wade2.jpg',
                text: 'Wade no desfile de comemoração de campeão, com o troféu em seus braços'
            },
            {
                image: 'images/wade3.jpg',
                text: 'Wade em arremesso de 3 no estouro do cronômetro'
            },
        ]
        },
        // Michael Jordan
        {
            id: 'jersey_bulls_jordan',
            name: 'Jersey Bulls Michael Jordan (Hardwood Classics)',
            price: 799.00,
            description: 'Um clássico atemporal: jersey Michael Jordan do Chicago Bulls (Authentic Hardwood Classics). Indispensável para qualquer fã, representa a era de ouro da NBA.',
            image: 'https://i.imgur.com/oCRUxMA.png',
            stockBySize: { 'P': 12, 'M': 20, 'G': 10, 'GG': 12 },
            sold: 9,
        playerMoments: [ 
            {
                image: 'images/jordan.jpg',
                text: 'Air jordan enterrando com a língua de fora'
            },
            {
                image: 'images/jordan2.jpg',
                text: 'Jordan cobrando lance livre de olhos fechados!'
            },
            {
                image: 'images/jordan3.jpg',
                text: 'Jordan celebrando com charutos o título da NBA!'
            },
        ]
        },
        // Ja Morant
        {
            id: 'jersey_grizzlies_morant',
            name: 'Jersey Grizzlies Ja Morant (Statement Edition)',
            price: 649.00,
            description: 'Mostre seu apoio a uma das estrelas mais eletrizantes da atualidade com esta jersey Ja Morant do Memphis Grizzlies (Statement Edition).',
            image: 'https://i.imgur.com/n3tukjR.png',
            stockBySize: { 'P': 7, 'M': 10, 'G': 4, 'GG': 12 },
            sold: 6,
        playerMoments: [ 
            {
                image: 'images/morant.jpg',
                text: 'Morant voando!'
            },
            {
                image: 'images/morant2.jpg',
                text: 'Morant sendo ovacionado!'
            },
            {
                image: 'images/morant3.jpg',
                text: 'Morant celebrando cesta de 3 pontos!'
            },
        ]
        }
    ];

    const productsInStorage = localStorage.getItem('products');
    if (!productsInStorage || JSON.parse(productsInStorage).length === 0) {
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }
    if (!localStorage.getItem('cart')) { localStorage.setItem('cart', JSON.stringify([])); }
    const clientsInStorage = localStorage.getItem('clients');
    if (!clientsInStorage || JSON.parse(clientsInStorage).length === 0) {
        const initialClients = [{ id: 'cli_001', name: 'Cliente U-Player', email: 'cliente@cliente.com', password: 'cliente', address: 'Rua da Loja, 123', phone: '111111111' }];
        localStorage.setItem('clients', JSON.stringify(initialClients));
    }
    const adminsInStorage = localStorage.getItem('admins');
    if (!adminsInStorage || JSON.parse(adminsInStorage).length === 0) {
        const initialAdmins = [{ id: 'admin_001', name: 'Admin Principal', email: 'admin@admin.com', phone: '000000000', password: 'admin' }];
        localStorage.setItem('admins', JSON.stringify(initialAdmins));
    }
}

// Funções auxiliares para acesso e gravação no localStorage.
function getProducts() { return JSON.parse(localStorage.getItem('products')) || []; }
function saveProducts(products) { localStorage.setItem('products', JSON.stringify(products)); }
function getCart() { return JSON.parse(localStorage.getItem('cart')) || []; }
function saveCart(cart) { localStorage.setItem('cart', JSON.stringify(cart)); }
function getClients() { return JSON.parse(localStorage.getItem('clients')) || []; }
function saveClients(clients) { localStorage.setItem('clients', JSON.stringify(clients)); }
function getAdmins() { return JSON.parse(localStorage.getItem('admins')) || []; }
function saveAdmins(admins) { localStorage.setItem('admins', JSON.stringify(admins)); }

// ==========================================================================
// 2. Lógica de Navegação SPA
// Controla a exibição das diferentes "páginas" (seções HTML) da aplicação.
// ==========================================================================
const mainSections = ['Home', 'Jerseys', 'carrinho', 'loginView', 'registerView', 'productDetailView'];
const adminSubSections = ['adminProductManagement', 'adminUserManagementView'];

// Gerencia a visibilidade das seções principais e da interface de administração.
function showSection(sectionIdToShow) {
    const mainHeader = document.getElementById('mainHeader');
    const mainContent = document.getElementById('mainContent');
    const adminViewSection = document.getElementById('adminView');
    const mainFooter = document.getElementById('mainFooter');

    if (activeSectionId === sectionIdToShow && !['carrinho', 'productDetailView', 'registerView', 'loginView', 'adminView'].includes(sectionIdToShow)) {
        return; 
    }

    if (sectionIdToShow === 'productDetailView' && activeSectionId !== 'productDetailView' && activeSectionId !== null) {
        previousSectionId = activeSectionId;
    } else if (!['loginView', 'registerView', 'productDetailView'].includes(sectionIdToShow)) {
        if (activeSectionId !== 'productDetailView' && activeSectionId !== 'loginView' && activeSectionId !== 'registerView' && activeSectionId !== null) {
             previousSectionId = activeSectionId;
        }
    }
    activeSectionId = sectionIdToShow;

    if (sectionIdToShow === 'adminView') {
        if(mainHeader) mainHeader.style.display = 'none';
        if(mainContent) mainContent.style.display = 'none';
        if(mainFooter) mainFooter.style.display = 'none';
        if(adminViewSection) adminViewSection.style.display = 'flex';
        showAdminSection('adminProductManagement');
    } else {
        if(mainHeader) mainHeader.style.display = 'flex';
        if(mainContent) mainContent.style.display = 'block';
        if(mainFooter) mainFooter.style.display = 'block';
        if(adminViewSection) adminViewSection.style.display = 'none';

        mainSections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                section.style.display = (id === sectionIdToShow) ? ((id === 'loginView' || id === 'registerView' || id === 'productDetailView') ? 'flex' : 'block') : 'none';
            }
        });
    }

    const mainNavLinks = document.querySelectorAll('header#mainHeader nav .nav-link');
    mainNavLinks.forEach(link => {
        let linkCorrespondsToSection = link.getAttribute('onclick')?.includes(`showSection('${sectionIdToShow}')`);
        if ((sectionIdToShow === 'productDetailView' || sectionIdToShow === 'registerView') && link.getAttribute('onclick')?.includes(`showSection('${previousSectionId}')`)) {
            linkCorrespondsToSection = true;
        }
        if (sectionIdToShow === 'loginView' && link.id === 'loginNavLink') {
            linkCorrespondsToSection = true;
        }
        if (linkCorrespondsToSection) { link.classList.add('active'); } else { link.classList.remove('active'); }
    });

    if (sectionIdToShow === 'carrinho') { renderCart(); }
    else if (sectionIdToShow === 'Home') { renderProductListHome(); }
    else if (sectionIdToShow === 'Jerseys') { renderJerseysProducts(); }
    
    if (sectionIdToShow === 'loginView') document.getElementById('loginForm').reset();
    if (sectionIdToShow === 'registerView') document.getElementById('registerForm').reset();
}

// Função para o botão "Voltar" da página de detalhes, retornando à seção anterior.
function goBackToPreviousSection() { showSection(previousSectionId || 'Home'); }

// Mostra uma subseção específica dentro do painel de administração e renderiza seu conteúdo.
function showAdminSection(adminSectionIdToShow) {
    adminSubSections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.style.display = (id === adminSectionIdToShow) ? 'block' : 'none';
        }
    });
    const adminNavLinks = document.querySelectorAll('#adminNav a');
    adminNavLinks.forEach(link => {
        if (link.getAttribute('onclick').includes(adminSectionIdToShow)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    if (adminSectionIdToShow === 'adminProductManagement') { renderAdminProductList(); }
    else if (adminSectionIdToShow === 'adminUserManagementView') {
        renderAdminCustomerList();
        renderAdminAdminUserList();
    }
}

// Atualiza os links de Login/Logout na navegação principal com base no status do usuário.
function updateLoginLogoutLinks() {
    const loginLink = document.getElementById('loginNavLink');
    const logoutLink = document.getElementById('logoutNavLink');
    if (!loginLink || !logoutLink) return;
    if (currentUserType === ADMIN || currentUserType === CLIENT) {
        loginLink.style.display = 'none';
        logoutLink.style.display = 'inline-block';
    } else {
        loginLink.style.display = 'inline-block';
        logoutLink.style.display = 'none';
    }
}

// ==========================================================================
// 3. Lógica de Autenticação e REGISTRO DE CLIENTE
// Gerencia o login de administradores e clientes, e o registro de novos clientes.
// ==========================================================================

// Processa a submissão do formulário de login.
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginError = document.getElementById('loginError');
    const admins = getAdmins();
    const foundAdmin = admins.find(admin => admin.email === email && admin.password === password);

    if (foundAdmin) {
        currentUserType = ADMIN;
        showSection('adminView');
        loginError.style.display = 'none';
    } else {
        const clients = getClients();
        const foundClient = clients.find(client => client.email === email && client.password === password);
        if (foundClient) {
            currentUserType = CLIENT;
            showSection('Home');
            loginError.style.display = 'none';
        } else {
            loginError.textContent = 'Usuário ou senha inválidos.';
            loginError.style.display = 'block';
            currentUserType = GUEST;
        }
    }
    document.getElementById('loginForm').reset();
    updateLoginLogoutLinks();
}

// Processa o logout do usuário (admin ou cliente).
function logoutUser() {
    if (confirm("Tem certeza que deseja sair?")) {
        currentUserType = GUEST;
        showSection('Home');
        updateLoginLogoutLinks();
    }
}

// Processa o formulário de registro de um novo cliente.
function handleRegistrationSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const address = document.getElementById('registerAddress').value;
    const phone = document.getElementById('registerPhone').value;
    const registerError = document.getElementById('registerError');

    registerError.style.display = 'none'; registerError.textContent = '';
    if (!name || !email || !password || !confirmPassword) {
        registerError.textContent = "Preencha os campos obrigatórios."; registerError.style.display = 'block'; return;
    }
    if (password !== confirmPassword) {
        registerError.textContent = "As senhas não coincidem."; registerError.style.display = 'block'; return;
    }
    if (password.length < 6) {
        registerError.textContent = "A senha deve ter pelo menos 6 caracteres."; registerError.style.display = 'block'; return;
    }
    const clients = getClients(); const admins = getAdmins();
    if (clients.find(c => c.email === email) || admins.find(a => a.email === email)) {
        registerError.textContent = "Este email já está cadastrado."; registerError.style.display = 'block'; return;
    }
    const newClient = { id: `cli_${Date.now()}`, name, email, password, address, phone };
    clients.push(newClient); saveClients(clients);
    currentUserType = CLIENT; // Loga o cliente automaticamente após o registro
    alert("Registro realizado com sucesso! Você já está logado.");
    document.getElementById('registerForm').reset();
    updateLoginLogoutLinks();
    showSection('Home');
}

// ==========================================================================
// 4. Funcionalidades do Administrador
// Gerenciamento de produtos e usuários (clientes e outros administradores).
// ==========================================================================

// 4.1 Gerenciamento de Produtos
// Exibe a lista de produtos no painel de admin, mostrando estoque por tamanho.
function renderAdminProductList() {
    const products = getProducts();
    const productListDiv = document.getElementById('adminProductList');
    productListDiv.innerHTML = '';
    if (products.length === 0) { productListDiv.innerHTML = '<p>Nenhum produto cadastrado.</p>'; return; }
    products.forEach(p => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'product-item-admin';
        const totalStock = (p.stockBySize?.P || 0) + (p.stockBySize?.M || 0) + (p.stockBySize?.G || 0) + (p.stockBySize?.GG || 0); 
        const stockBySizeString = `P: ${p.stockBySize?.P || 0}, M: ${p.stockBySize?.M || 0}, G: ${p.stockBySize?.G || 0}, GG: ${p.stockBySize?.GG || 0}`;
        itemDiv.innerHTML = `
            <img src="${p.image || 'https://via.placeholder.com/100'}" alt="${p.name}" />
            <div class="product-info-wrapper">
                <div class="product-info-admin">
                    <h4>${p.name}</h4>
                    <p><strong>ID:</strong> ${p.id}</p>
                    <p><strong>Preço:</strong> R$ ${parseFloat(p.price).toFixed(2)}</p>
                    <p><strong>Estoque (Total):</strong> ${totalStock}</p>
                    <p><strong>Estoque (P,M,G):</strong> ${stockBySizeString}</p>
                    <p><strong>Vendidos:</strong> ${p.sold || 0}</p>
                </div>
                <div class="product-description-admin">
                    <h5>Descrição:</h5>
                    <p>${p.description}</p>
                </div>
            </div>
            <div class="product-actions-admin">
                <button onclick="editProduct('${p.id}')">Editar</button>
                <button class="secondary" onclick="deleteProduct('${p.id}')">Excluir</button>
            </div>
        `;
        productListDiv.appendChild(itemDiv);
    });
}
// Processa o formulário de adicionar/editar produto, agora com estoque por tamanho.
function handleProductFormSubmit(event) {
    event.preventDefault();
    let products = getProducts();
    const productData = {
        id: currentProductEditingId || `prod_${Date.now()}`,
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value,
        stockBySize: {
            'P': parseInt(document.getElementById('productStockP').value) || 0,
            'M': parseInt(document.getElementById('productStockM').value) || 0,
            'G': parseInt(document.getElementById('productStockG').value) || 0,
            'GG': parseInt(document.getElementById('productStockGG').value) || 0,

        },
        image: document.getElementById('productImage').value,
        sold: 0 // 'sold' é inicializado ou mantido abaixo
    };
    if (currentProductEditingId) {
        const index = products.findIndex(p => p.id === currentProductEditingId);
        if (index !== -1) {
            productData.sold = products[index].sold || 0;
            products[index] = productData;
        }
    } else {
        products.push(productData);
    }
    saveProducts(products);
    renderAdminProductList(); renderProductListHome(); renderJerseysProducts();
    document.getElementById('productForm').reset();
    document.getElementById('productStockP').value = 0; 
    document.getElementById('productStockM').value = 0; 
    document.getElementById('productStockG').value = 0;
    document.getElementById('productStockGG').value = 0;
    currentProductEditingId = null;
    document.getElementById('saveProductButton').textContent = 'Salvar Produto';
    document.getElementById('cancelEditButton').style.display = 'none';
    document.getElementById('productId').value = '';
}
// Preenche o formulário de produto para edição, incluindo estoque por tamanho.
function editProduct(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
        currentProductEditingId = productId;
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productStockP').value = product.stockBySize?.P || 0;
        document.getElementById('productStockM').value = product.stockBySize?.M || 0;
        document.getElementById('productStockG').value = product.stockBySize?.G || 0;
        document.getElementById('productStockGG').value = product.stockBySize?.GG || 0;
        document.getElementById('productImage').value = product.image;
        document.getElementById('saveProductButton').textContent = 'Atualizar Produto';
        document.getElementById('cancelEditButton').style.display = 'inline-block';
        showAdminSection('adminProductManagement');
        document.getElementById('productName').focus();
    }
}
// Cancela a edição de um produto, limpando o formulário.
function cancelEditProduct() {
    currentProductEditingId = null;
    document.getElementById('productForm').reset();
    document.getElementById('productStockP').value = 0;
    document.getElementById('productStockM').value = 0;
    document.getElementById('productStockG').value = 0;
    document.getElementById('productStockGG').value = 0;
    document.getElementById('saveProductButton').textContent = 'Salvar Produto';
    document.getElementById('cancelEditButton').style.display = 'none';
    document.getElementById('productId').value = '';
}
// Exclui um produto após confirmação.
function deleteProduct(productId) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        let products = getProducts();
        products = products.filter(p => p.id !== productId);
        saveProducts(products);
        renderAdminProductList(); renderProductListHome(); renderJerseysProducts();
        if (currentProductEditingId === productId) cancelEditProduct();
    }
}

// 4.2 Gerenciamento de Clientes (Listar, Excluir, Promover a Admin)
function renderAdminCustomerList() {
    const clients = getClients();
    const listDiv = document.getElementById('adminCustomerList');
    listDiv.innerHTML = ''; 
    if (clients.length === 0) {
        listDiv.innerHTML = '<p>Nenhum cliente cadastrado.</p>'; return;
    }
    clients.forEach(c => {
        const item = document.createElement('div');
        item.className = 'list-item-admin customer-item-admin';
        item.innerHTML = `
            <div>
                <h4>${c.name} (ID: ${c.id})</h4>
                <p>Email: ${c.email}</p>
                <p>Telefone: ${c.phone || 'N/A'}</p>
                <p>Endereço: ${c.address || 'N/A'}</p>
            </div>
            <div class="admin-user-actions">
                <button class="button-style secondary" onclick="promoteClientToAdmin('${String(c.id)}')">Tornar Admin</button>
                <button class="button-style danger" onclick="deleteClient('${String(c.id)}')">Excluir</button>
            </div>
        `;
        listDiv.appendChild(item);
    });
}
function deleteClient(clientId) {
    if (confirm(`Tem certeza que deseja excluir o cliente ID: ${clientId}? Esta ação não pode ser desfeita.`)) {
        let clients = getClients();
        clients = clients.filter(c => c.id !== clientId);
        saveClients(clients);
        renderAdminCustomerList();
        alert('Cliente excluído com sucesso.');
    }
}
function promoteClientToAdmin(clientId) {
    const cleanClientId = String(clientId).replace(/<[^>]*>/g, "");
    if (confirm(`Tem certeza que deseja transformar o cliente ID: ${cleanClientId} em administrador? O registro de cliente será removido.`)) {
        let clients = getClients();
        let admins = getAdmins();
        const clientIndex = clients.findIndex(c => String(c.id) === cleanClientId);
        if (clientIndex === -1) {
            alert('Cliente não encontrado.'); return;
        }
        const clientToPromote = clients[clientIndex];
        if (admins.find(a => a.email === clientToPromote.email)) {
            alert(`Já existe um administrador com o email ${clientToPromote.email}.`); return;
        }
        const newAdmin = {
            id: `adm_${Date.now()}`, name: clientToPromote.name, email: clientToPromote.email,
            phone: clientToPromote.phone || '', password: clientToPromote.password
        };
        admins.push(newAdmin);
        clients.splice(clientIndex, 1);
        saveAdmins(admins); saveClients(clients);
        renderAdminCustomerList(); renderAdminAdminUserList();
        alert(`Cliente ${clientToPromote.name} promovido a administrador!`);
    }
}

// 4.3 Gerenciamento de Administradores (Listar, Excluir, Rebaixar para Cliente)
function renderAdminAdminUserList() {
    const admins = getAdmins();
    const listDiv = document.getElementById('adminAdminUserList');
    listDiv.innerHTML = ''; 
    if (admins.length === 0) {
        listDiv.innerHTML = '<p>Nenhum administrador cadastrado.</p>'; return;
    }
    admins.forEach(a => {
        const item = document.createElement('div');
        item.className = 'list-item-admin admin-user-item';
        let actionButtonsHtml = '';
        if (a.email === 'admin@admin.com') {
            actionButtonsHtml = `<span class="admin-actions-placeholder" title="Ações não disponíveis para o admin principal."></span>`;
        } else {
            actionButtonsHtml = `
                <button class="button-style secondary" onclick="demoteAdminToClient('${String(a.id)}')">Tornar Cliente</button>
                <button class="button-style danger" onclick="deleteAdminUser('${String(a.id)}')">Excluir</button>
            `;
        }
        item.innerHTML = `
            <div>
                <h4>${a.name} (ID: ${a.id})</h4>
                <p>Email: ${a.email}</p>
                <p>Telefone: ${a.phone || 'N/A'}</p>
            </div>
            <div class="admin-user-actions">${actionButtonsHtml}</div>
        `;
        listDiv.appendChild(item);
    });
}
function deleteAdminUser(adminId) {
    let admins = getAdmins();
    const adminToDelete = admins.find(a => a.id === adminId);
    if (!adminToDelete) { alert('Administrador não encontrado.'); return; }
    if (adminToDelete.email === 'admin@admin.com') {
        alert('O administrador principal não pode ser excluído.'); return;
    }
    if (admins.length <= 1) {
        alert('Não é possível excluir o único administrador restante.'); return;
    }
    if (confirm(`Tem certeza que deseja excluir o administrador ${adminToDelete.name} (ID: ${adminId})?`)) {
        admins = admins.filter(a => a.id !== adminId);
        saveAdmins(admins);
        renderAdminAdminUserList();
        alert('Administrador excluído com sucesso.');
    }
}
function demoteAdminToClient(adminId) {
    let admins = getAdmins();
    let clients = getClients();
    const adminIndex = admins.findIndex(a => String(a.id) === String(adminId));
    if (adminIndex === -1) { alert('Administrador não encontrado.'); return; }
    const adminToDemote = admins[adminIndex];
    if (adminToDemote.email === 'admin@admin.com') {
        alert('O administrador principal não pode ser rebaixado.'); return;
    }
    if (confirm(`Tem certeza que deseja transformar o administrador ${adminToDemote.name} (ID: ${adminId}) em cliente? O registro de administrador será removido.`)) {
        if (clients.find(c => c.email === adminToDemote.email)) {
            alert(`Já existe um cliente com o email ${adminToDemote.email}.`); return;
        }
        const newClient = {
            id: `cli_${Date.now()}`, name: adminToDemote.name, email: adminToDemote.email,
            phone: adminToDemote.phone || '', password: adminToDemote.password, address: ''
        };
        clients.push(newClient);
        admins.splice(adminIndex, 1);
        saveClients(clients); saveAdmins(admins);
        renderAdminCustomerList(); renderAdminAdminUserList();
        alert(`Administrador ${adminToDemote.name} transformado em cliente!`);
    }
}

// ==========================================================================
// 5. Funcionalidades do Cliente
// Exibição de produtos, página de detalhes, carrinho e checkout.
// ==========================================================================

// 5.1 Listar Produtos e Página de Detalhes
function renderProductListHome() {
    const allProducts = getProducts();
    const productListDiv = document.getElementById('productListHome');
    productListDiv.innerHTML = '';
    if (allProducts.length === 0) { productListDiv.innerHTML = '<p>Nenhum produto disponível no momento.</p>'; return; }
    const featuredProductIds = ['jersey_miami_wade_3_black','jersey_lakers_lebron_23_white', 'jersey_grizzlies_morant','jersey_cavs_lebron_23_black', 'jersey_warriors_curry'];
    let featuredProducts = allProducts.filter(p => featuredProductIds.includes(p.id)).slice(0, 5);
    if (featuredProducts.length === 0 && allProducts.length > 0) {
        featuredProducts = allProducts.slice(0, 5);
    }
    if (featuredProducts.length === 0) { productListDiv.innerHTML = '<p>Nenhuma jersey em destaque para exibir.</p>'; return; }
    featuredProducts.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card-dynamic';
        card.setAttribute('onclick', `viewProductDetails('${p.id}')`);
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <img src="${p.image || 'https://via.placeholder.com/250'}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>R$ ${parseFloat(p.price).toFixed(2)}</p>
        `;
        productListDiv.appendChild(card);
    });
}
function renderJerseysProducts() { // Esta função agora lista todos os produtos (que são jerseys)
    const allProducts = getProducts();
    const productListDiv = document.getElementById('productListJerseys');
    productListDiv.innerHTML = '';
    if (allProducts.length === 0) {
        productListDiv.innerHTML = '<p>Nenhuma jersey disponível no momento.</p>';
        return;
    }
    allProducts.forEach(p => { 
        const card = document.createElement('div');
        card.className = 'product-card-dynamic';
        card.setAttribute('onclick', `viewProductDetails('${p.id}')`);
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <img src="${p.image || 'https://via.placeholder.com/250'}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>R$ ${parseFloat(p.price).toFixed(2)}</p>
        `;
        productListDiv.appendChild(card);
    });
}
// Exibe detalhes de um produto, incluindo seleção de tamanho e estoque por tamanho.
function viewProductDetails(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    currentSelectedSize = null;

    // Referências aos elementos DOM para DOIS momentos marcantes
    const playerMomentContainerEl = document.getElementById('playerMomentContainer');
    const momentTitleEl = playerMomentContainerEl ? playerMomentContainerEl.querySelector('h4') : null;

    const momentItem1El = document.getElementById('momentItem1');
    const playerMomentImage1El = document.getElementById('playerMomentImage1');
    const playerMomentDescription1El = document.getElementById('playerMomentDescription1');

    const momentItem2El = document.getElementById('momentItem2');
    const playerMomentImage2El = document.getElementById('playerMomentImage2');
    const playerMomentDescription2El = document.getElementById('playerMomentDescription2');

    // Limpa e esconde os itens de momento e o container principal inicialmente
    if (momentItem1El) momentItem1El.style.display = 'none';
    if (playerMomentImage1El) { playerMomentImage1El.src = ''; playerMomentImage1El.alt = ''; }
    if (playerMomentDescription1El) playerMomentDescription1El.textContent = '';

    if (momentItem2El) momentItem2El.style.display = 'none';
    if (playerMomentImage2El) { playerMomentImage2El.src = ''; playerMomentImage2El.alt = ''; }
    if (playerMomentDescription2El) playerMomentDescription2El.textContent = '';

    if (playerMomentContainerEl) playerMomentContainerEl.style.display = 'none';


    if (product) {
        document.getElementById('detailProductImage').src = product.image || 'https://via.placeholder.com/400';
        document.getElementById('detailProductImage').alt = product.name;
        document.getElementById('detailProductName').textContent = product.name;
        document.getElementById('detailProductPrice').textContent = `R$ ${parseFloat(product.price).toFixed(2)}`;
        document.getElementById('detailProductDescription').textContent = product.description;
        
        let momentsActuallyDisplayed = 0;
        if (product.playerMoments && Array.isArray(product.playerMoments) && product.playerMoments.length > 0) {
            const momentsArray = product.playerMoments;
            const numAvailableMoments = momentsArray.length;
            const playerNameForAlt = product.name.replace(/Jersey | \([^)]*\)| #\d+/gi, '').trim();

            let moment1Data = null;
            let moment2Data = null;

            if (numAvailableMoments === 1) {
                // Se houver apenas 1 momento, mostra esse momento
                moment1Data = momentsArray[0];
            } else if (numAvailableMoments >= 2) {
                // Se houver 2 ou mais, seleciona dois momentos distintos aleatoriamente
                let index1 = Math.floor(Math.random() * numAvailableMoments);
                let index2;
                do {
                    index2 = Math.floor(Math.random() * numAvailableMoments);
                } while (index1 === index2); // Garante que os índices sejam diferentes

                moment1Data = momentsArray[index1];
                moment2Data = momentsArray[index2];
            }

            // Exibe o primeiro momento selecionado (se houver)
            if (moment1Data && moment1Data.image && typeof moment1Data.text === 'string') {
                if (playerMomentImage1El) playerMomentImage1El.src = moment1Data.image;
                if (playerMomentImage1El) playerMomentImage1El.alt = `Momento de ${playerNameForAlt}: ${moment1Data.text.substring(0, 50)}...`;
                if (playerMomentDescription1El) playerMomentDescription1El.textContent = moment1Data.text;
                if (momentItem1El) momentItem1El.style.display = 'flex';
                momentsActuallyDisplayed++;
            }

            // Exibe o segundo momento selecionado (se houver)
            if (moment2Data && moment2Data.image && typeof moment2Data.text === 'string') {
                if (playerMomentImage2El) playerMomentImage2El.src = moment2Data.image;
                if (playerMomentImage2El) playerMomentImage2El.alt = `Outro momento de ${playerNameForAlt}: ${moment2Data.text.substring(0, 50)}...`;
                if (playerMomentDescription2El) playerMomentDescription2El.textContent = moment2Data.text;
                if (momentItem2El) momentItem2El.style.display = 'flex';
                momentsActuallyDisplayed++;
            }
        }

        // Mostra o container principal e ajusta o título se pelo menos um momento foi exibido
        if (momentsActuallyDisplayed > 0 && playerMomentContainerEl) {
            playerMomentContainerEl.style.display = 'block';
            if (momentTitleEl) {
                momentTitleEl.textContent = momentsActuallyDisplayed > 1 ? 'Momentos Marcantes:' : 'Momento Marcante:';
            }
        } else if (playerMomentContainerEl) {
             playerMomentContainerEl.style.display = 'none';
        }

        // Lógica para opções de tamanho, estoque e botão de adicionar ao carrinho (mantida)
        const sizeOptionsContainer = document.getElementById('detailSizeOptionsContainer');
        const stockDisplay = document.getElementById('detailProductStock');
        const addToCartButton = document.getElementById('detailAddToCartButton');
        sizeOptionsContainer.innerHTML = '';
        if (product.stockBySize && typeof product.stockBySize === 'object') {
            ['P', 'M', 'G', 'GG'].forEach(size => { 
            const stockForSize = product.stockBySize[size] || 0;
            const sizeButton = document.createElement('button');
            sizeButton.textContent = size;
            sizeButton.disabled = stockForSize === 0;
            sizeButton.onclick = () => {
            currentSelectedSize = size;
            document.querySelectorAll('#detailSizeOptionsContainer button').forEach(btn => btn.classList.remove('selected'));
            sizeButton.classList.add('selected');
            stockDisplay.textContent = `Estoque (${size}): ${stockForSize > 0 ? stockForSize : 'Indisponível'}`;
            addToCartButton.disabled = stockForSize === 0;
        };
        sizeOptionsContainer.appendChild(sizeButton);
    });
} else {
            sizeOptionsContainer.innerHTML = '<p>Informação de tamanho indisponível.</p>';
        }
        stockDisplay.textContent = 'Selecione um tamanho para ver o estoque.';
        addToCartButton.disabled = true;
        addToCartButton.onclick = () => {
            if (currentSelectedSize && product.stockBySize[currentSelectedSize] > 0) {
                handleAddToCart(product.id, currentSelectedSize);
            } else {
                alert('Por favor, selecione um tamanho com estoque disponível.');
            }
        };
        showSection('productDetailView');
    } else {
        alert("Produto não encontrado!");
        // Limpa e esconde os elementos de momento se o produto não for encontrado
        if (playerMomentContainerEl) playerMomentContainerEl.style.display = 'none';
        
        if (momentItem1El) momentItem1El.style.display = 'none';
        if (playerMomentImage1El) { playerMomentImage1El.src = ''; playerMomentImage1El.alt = ''; }
        if (playerMomentDescription1El) playerMomentDescription1El.textContent = '';

        if (momentItem2El) momentItem2El.style.display = 'none';
        if (playerMomentImage2El) { playerMomentImage2El.src = ''; playerMomentImage2El.alt = ''; }
        if (playerMomentDescription2El) playerMomentDescription2El.textContent = '';

        showSection(previousSectionId || 'Home');
    }
}

// 5.2 Gerenciamento do Carrinho de Compras (com tamanho)
// Adiciona um item ao carrinho, considerando o tamanho selecionado.
function handleAddToCart(productId, selectedSize, quantity = 1) {
    const allProducts = getProducts();
    const product = allProducts.find(p => p.id === productId);
    if (!product) { alert('Produto não encontrado!'); return; }
    if (!selectedSize) {
        alert('Tamanho não selecionado. Por favor, escolha um tamanho na página do produto.');
        viewProductDetails(productId); return;
    }
    const stockOfSelectedSize = product.stockBySize?.[selectedSize] || 0;
    if (stockOfSelectedSize < quantity) {
        alert(`Estoque insuficiente para ${product.name} no tamanho ${selectedSize}. Disponível: ${stockOfSelectedSize}`);
        return;
    }
    let cart = getCart();
    const cartItemId = `${productId}_${selectedSize}`;
    const existingItemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
    if (existingItemIndex > -1) {
        if (cart[existingItemIndex].quantity + quantity > stockOfSelectedSize) {
            alert(`Não é possível adicionar mais. Quantidade máxima (${stockOfSelectedSize}) para ${product.name} (Tam: ${selectedSize}) no carrinho.`);
            cart[existingItemIndex].quantity = stockOfSelectedSize;
        } else {
            cart[existingItemIndex].quantity += quantity;
        }
    } else {
        cart.push({
            cartItemId, id: product.id, name: product.name, price: product.price,
            image: product.image, size: selectedSize, quantity
        });
    }
    saveCart(cart);
    alert(`${product.name} (Tamanho: ${selectedSize}) adicionado ao carrinho!`);
    renderCart();
}
// Exibe os itens atuais do carrinho.
function renderCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalEl = document.getElementById('cartTotal');
    cartItemsContainer.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        cartTotalEl.textContent = 'Total: R$ 0,00';
        return;
    }
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name} ${item.size ? `(Tamanho: ${item.size})` : ''}</h4>
                <p>Preço Un.: R$ ${parseFloat(item.price).toFixed(2)}</p>
                <p>Subtotal: R$ ${itemTotal.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <label for="qty-${item.cartItemId}">Qtd:</label>
                <input type="number" id="qty-${item.cartItemId}" value="${item.quantity}" min="1" 
                       onchange="updateCartItemQuantity('${item.cartItemId}', this.value)">
                <button onclick="removeCartItem('${item.cartItemId}')" title="Remover Item">&times;</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
    cartTotalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}
// Atualiza a quantidade de um item no carrinho, respeitando o estoque do tamanho.
function updateCartItemQuantity(cartItemId, newQuantityString) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
    const newQuantity = parseInt(newQuantityString);
    if (itemIndex === -1) return;
    const products = getProducts();
    const productInStorage = products.find(p => p.id === cart[itemIndex].id);
    if (!productInStorage) {
        alert('Produto original não encontrado. Removendo do carrinho.');
        cart.splice(itemIndex, 1); saveCart(cart); renderCart(); return;
    }
    const stockToCheck = cart[itemIndex].size ? (productInStorage.stockBySize?.[cart[itemIndex].size] || 0) : 0;
    if (newQuantity <= 0) {
        cart.splice(itemIndex, 1);
    } else if (newQuantity > stockToCheck) {
        alert(`Quantidade solicitada excede o estoque (${stockToCheck}). Ajustando para o máximo.`);
        cart[itemIndex].quantity = stockToCheck;
    } else {
        cart[itemIndex].quantity = newQuantity;
    }
    saveCart(cart); renderCart();
}
// Remove um item específico (produto + tamanho) do carrinho.
function removeCartItem(cartItemId) {
    let cart = getCart();
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    saveCart(cart); renderCart();
}
// Esvazia completamente o carrinho.
function emptyCart() {
    if (confirm('Tem certeza que deseja esvaziar o carrinho?')) {
        saveCart([]); renderCart();
    }
}

// 5.3 Checkout (com formulário de cartão e estoque por tamanho)
// Inicia o processo de checkout, verificando o login e mostrando o formulário do cartão.
function initiateCheckout() {
    const cart = getCart();
    if (cart.length === 0) { alert('Seu carrinho está vazio!'); return; }
    if (currentUserType === GUEST) {
        alert("Por favor, faça login ou registre-se para finalizar a compra.");
        showSection('loginView'); return;
    }
    document.getElementById('creditCardFormContainer').style.display = 'block';
    document.getElementById('cartInitialActions').style.display = 'none';
    document.getElementById('ccNumber').focus();
}
// Cancela a etapa de inserção do cartão, voltando aos botões iniciais do carrinho.
function cancelPayment() {
    document.getElementById('creditCardFormContainer').style.display = 'none';
    document.getElementById('cartInitialActions').style.display = 'block';
    document.getElementById('ccNumber').value = '';
}
// Processa o pagamento após a inserção do número do cartão, interagindo com Beeceptor.
async function processPaymentAfterCardEntry() {
    const cardNumber = document.getElementById('ccNumber').value;
    if (!cardNumber) {
        alert("Por favor, insira o número do seu cartão de crédito.");
        document.getElementById('ccNumber').focus(); return;
    }
    const cart = getCart();
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        document.getElementById('creditCardFormContainer').style.display = 'none';
        document.getElementById('cartInitialActions').style.display = 'block'; return;
    }
    let allProducts = getProducts();
    let purchaseSuccessful = true;
    for (const itemInCart of cart) {
        try {
            const productInStorage = allProducts.find(p => p.id === itemInCart.id);
            if (!productInStorage) {
                alert(`Produto ${itemInCart.name} não disponível.`); purchaseSuccessful = false; break;
            }
            if (!itemInCart.size || !productInStorage.stockBySize || productInStorage.stockBySize[itemInCart.size] === undefined) {
                alert(`Info de tamanho/estoque inválida para ${itemInCart.name}.`); purchaseSuccessful = false; break;
            }
            let currentStockOfSize = productInStorage.stockBySize[itemInCart.size];
            if (itemInCart.quantity > currentStockOfSize) {
                alert(`Estoque insuficiente para ${itemInCart.name} (Tam: ${itemInCart.size}). Disp: ${currentStockOfSize}.`);
                purchaseSuccessful = false; break;
            }
            const purchaseUrl = `${BEECEPTOR_BASE_URL}/purchase`;
            const purchasePayload = {
                productId: itemInCart.id, size: itemInCart.size,
                stock: currentStockOfSize, quantity: itemInCart.quantity
            };
            const purchaseResponse = await fetch(purchaseUrl, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(purchasePayload)
            });
            if (!purchaseResponse.ok) {
                const errorText = await purchaseResponse.text();
                throw new Error(`API Falhou (${purchaseResponse.status}): ${errorText}`);
            }
            const purchaseResult = await purchaseResponse.json();
            const productIndex = allProducts.findIndex(p => p.id === itemInCart.id);
            if (productIndex !== -1) {
                allProducts[productIndex].stockBySize[itemInCart.size] = purchaseResult.new_quantity;
                allProducts[productIndex].sold = (allProducts[productIndex].sold || 0) + itemInCart.quantity;
            }
        } catch (error) {
            alert(`Erro ao processar ${itemInCart.name} (Tam: ${itemInCart.size}): ${error.message}.`);
            purchaseSuccessful = false; break;
        }
    }
    if (purchaseSuccessful) {
        saveProducts(allProducts); saveCart([]); renderCart();
        renderAdminProductList(); renderProductListHome(); renderJerseysProducts();
        alert('Compra finalizada com sucesso!');
        document.getElementById('creditCardFormContainer').style.display = 'none';
        document.getElementById('cartInitialActions').style.display = 'block'; // Ou 'flex' dependendo do CSS
        document.getElementById('ccNumber').value = '';
        showSection('Home');
    } else {
        alert('A compra não pôde ser completada.'); renderCart();
    }
}

// ==========================================================================
// 6. Configuração de Event Listeners
// Define os listeners para interações do usuário com formulários e botões.
// ==========================================================================
function setupEventListeners() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegistrationSubmit);
    document.getElementById('productForm').addEventListener('submit', handleProductFormSubmit);
    document.getElementById('cancelEditButton').addEventListener('click', cancelEditProduct);
    document.getElementById('initiateCheckoutButton').addEventListener('click', initiateCheckout);
    document.getElementById('confirmPaymentButton').addEventListener('click', processPaymentAfterCardEntry);
    document.getElementById('cancelPaymentButton').addEventListener('click', cancelPayment);
}