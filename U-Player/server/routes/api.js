// Em uma nova pasta server/routes/api.js

const express = require('express');
const Product = require('../models/Product'); // Importa o model
const User = require('../models/User'); // Importa o model

const router = express.Router();

// ROTA: Listar todos os produtos
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ROTA: Obter um produto específico
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- ROTAS PARA GERENCIAMENTO DE PRODUTOS (ADMIN) ---

// ROTA: Adicionar um novo produto
router.post('/products', async (req, res) => {
  // O req.body contém os dados enviados pelo formulário do frontend
  const newProductData = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    stockBySize: req.body.stockBySize,
    isFeatured: req.body.isFeatured,
    playerMoments: req.body.playerMoments,
    sold: 0 // Inicia com 0 vendas
  };

  const product = new Product(newProductData);

  try {
    const newProduct = await product.save(); // Salva o novo produto no MongoDB
    res.status(201).json(newProduct); // Retorna o produto criado com status 201 (Criado)
  } catch (err) {
    res.status(400).json({ message: err.message }); // Se houver erro de validação, retorna 400
  }
});

// ROTA: Atualizar um produto existente
router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, // ID do produto que vem da URL
      req.body,      // Dados para atualizar, que vêm do corpo da requisição
      { new: true }  // Opção para retornar o documento atualizado
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ROTA: Deletar um produto
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- ROTAS PARA AUTENTICAÇÃO E GERENCIAMENTO DE USUÁRIOS ---

// ROTA: Registrar um novo usuário (cliente)
router.post('/register', async (req, res) => {
  try {
    // Verifica se o email já existe no banco de dados
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Este email já está cadastrado.' }); // 409 Conflict
    }

    // Cria um novo usuário. Novos registros são sempre do tipo 'client'.
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // ATENÇÃO: Em produção, isso DEVE ser criptografado!
      address: req.body.address,
      phone: req.body.phone,
      userType: 'client'
    });

    const savedUser = await newUser.save();
    
    // Não retorne a senha na resposta!
    const userResponse = { ...savedUser.toObject() };
    delete userResponse.password;

    res.status(201).json({ success: true, user: userResponse });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ROTA: Listar todos os usuários (para o painel de admin)
router.get('/users', async (req, res) => {
  try {
    // .select('-password') remove o campo da senha da resposta por segurança
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ROTA: Atualizar um usuário (usado para promover/rebaixar)
router.put('/users/:id', async (req, res) => {
  try {
    const { userType } = req.body; // Pega o novo tipo de usuário do corpo da requisição

    const userToUpdate = await User.findById(req.params.id);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (userToUpdate.email === 'admin@admin.com' && userType === 'client') {
      return res.status(403).json({ message: 'O administrador principal não pode ser rebaixado.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { userType: userType }, // Atualiza o campo userType
      { new: true }
    ).select('-password'); // .select('-password') continua aqui por segurança

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ROTA: Deletar um usuário
router.delete('/users/:id', async (req, res) => {
  try {
    // Proteção para não deletar o admin principal
    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete) return res.status(404).json({ message: 'Usuário não encontrado.' });
    
    if (userToDelete.email === 'admin@admin.com') {
      return res.status(403).json({ message: 'O administrador principal não pode ser excluído.' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuário excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// --- ROTA PARA PROCESSAR A COMPRA ---
router.post('/purchase', async (req, res) => {
  // Esperamos que o corpo da requisição tenha um objeto com a chave "cart"
  // Ex: { cart: [ { id: '...', size: 'M', quantity: 1 }, ... ] }
  const { cart } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ message: 'Carrinho inválido ou vazio.' });
  }

  try {
    // Itera por cada item no carrinho para validar e atualizar o estoque
    for (const itemInCart of cart) {
      const product = await Product.findById(itemInCart.id);

      // 1. Verifica se o produto ainda existe
      if (!product) {
        // Se um produto não existe, paramos a transação inteira
        throw new Error(`Produto com ID ${itemInCart.id} não encontrado.`);
      }

      // 2. Verifica se há estoque para o tamanho específico
      const currentStock = product.stockBySize[itemInCart.size];
      if (currentStock === undefined || currentStock < itemInCart.quantity) {
        throw new Error(`Estoque insuficiente para ${product.name} no tamanho ${itemInCart.size}.`);
      }
    }

    // Se todas as validações passaram, agora atualizamos o banco de dados
    for (const itemInCart of cart) {
      // Usamos o operador $inc do MongoDB para fazer a operação de forma segura
      // Decrementa o estoque do tamanho específico e incrementa a contagem de vendidos
      const update = {
        $inc: {
          [`stockBySize.${itemInCart.size}`]: -itemInCart.quantity, // Decrementa
          sold: +itemInCart.quantity                             // Incrementa
        }
      };
      await Product.updateOne({ _id: itemInCart.id }, update);
    }

    res.status(200).json({ success: true, message: 'Compra realizada com sucesso!' });

  } catch (err) {
    // Se qualquer erro ocorrer durante o processo, a compra falha.
    res.status(400).json({ success: false, message: err.message });
  }
});


// ROTA: Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password }); // Simples, sem hash de senha por enquanto
        if (!user) {
            return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos.' });
        }
        res.json({ success: true, userType: user.userType, user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


module.exports = router;