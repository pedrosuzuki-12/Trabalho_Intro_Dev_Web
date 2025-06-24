const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000; // Porta para o backend, diferente da do React (3000)

// Middlewares
app.use(cors()); // Permite que o React (rodando em outra porta) acesse esta API
app.use(express.json()); // Permite que o servidor entenda JSON

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/u-player-store')
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Falha ao conectar com o MongoDB:', err));

// Rota de teste
app.get('/', (req, res) => {
  res.send('API da U-Player Store funcionando!');
});

const apiRoutes = require('./routes/api'); // Importa o arquivo de rotas
app.use('/api', apiRoutes); // Usa as rotas com o prefixo /api

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});