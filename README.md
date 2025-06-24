# U-Player Online Store

## Grupo
- Nome: Kouki Hayashi - NUSP: 13672018
- Nome: Pedro Vitor Suzuki Lau - NUSP: 13837133
- Nome: Jonathan Sanchez Minaya - NUSP: 11333691

---

## 1. Requisitos

### Requisitos Funcionais Principais:
- **Autenticação de Usuários:**
    - **Usuário Cliente:** Capacidade de visualizar e comprar produtos.
    - **Usuário Administrador:** Acesso a funcionalidades de cadastro, edição e exclusão de produtos/serviços e gerenciamento de usuários.
- **Gerenciamento de Usuários:** Cadastro de administradores e clientes, incluindo informações como nome, ID, telefone e e-mail.
- **Gerenciamento de Produtos:**
    - Produtos devem ter nome, ID, imagem (URL), descrição, preço, quantidade em estoque (por tamanho) e quantidade vendida.
    - Implementação de operações CRUD (Criar, Ler, Atualizar, Excluir) de produtos para administradores.
- **Processo de Compra:**
    - Sistema de carrinho de compras para adicionar, remover e gerenciar itens.
    - Simulação de pagamento utilizando um número de cartão de crédito.
- **Acessibilidade:** Design inclusivo e acessível para diversos usuários.
- **Responsividade:** Layout adaptável a diferentes tamanhos de tela (desktop, tablet, mobile).

### Requisitos Adicionais:
- **Nicho de Mercado:** Loja especializada em produtos de basquete, com foco em Jerseys (camisetas de times/jogadores).
- **Funcionalidade Única:** Ao clicar em um produto, visualizar momentos marcantes do jogador profissional associado à jersey, oferecendo momentos marcantes randomicos a cada acesso diferente ao card de descrição do produto.

---

## 2. Descrição do Projeto

O projeto **U-Player** é uma loja online especializada em produtos de basquete, com ênfase em Jerseys. A aplicação visa proporcionar uma experiência de simulação de compra e um gerenciamento robusto para administradores.

O site é estruturado para apresentar:
- **Página Inicial (Home):** Exibindo produtos em lançamento e destaques.
- **Seção "Jerseys":** Catálogo completo de camisetas de times e jogadores.
- **Seção "Carrinho":** Para visualização e gerenciamento dos itens selecionados para compra.
- **Sistema de Autenticação:** Permite login de usuários (clientes) e administradores, com credenciais de exemplo (`admin@admin.com` / `admin` || `cliente@cliente.com` / `client`).
- **Painel Administrativo:** Acesso exclusivo para administradores com funcionalidades de CRUD de produtos e gerenciamento de usuários.
- **Navegação SPA (Single Page Application):** Utiliza `JavaScript` para manipulação do DOM, proporcionando uma transição suave entre as seções sem recarregamento completo da página.

### Diagrama de Navegação:

![Diagrama de Navegação U-Player](https://github.com/user-attachments/assets/d49e94b2-2b9a-4adf-bbe2-a1ad04706461)

### Link para o Figma:

https://www.figma.com/design/fDdvSGY9pd2x6SHDP2jHrW/Untitled?node-id=0-1&m=dev&t=CzRNXHTVi0VLTHho-1



---

## 3. Comentários sobre o Código

O desenvolvimento do projeto é baseado nas tecnologias web padrão:
- **HTML5:** Para a estrutura e semântica do conteúdo.
- **CSS3:** Para a estilização e responsividade do layout.
- **JavaScript:** Responsável pela lógica de navegação SPA, manipulação do DOM, gerenciamento de estado (via `localStorage`), lógica de carrinho, autenticação e simulação de interações através do **Beeceptor**.
- **Navegação SPA:** A transição entre as seções é gerenciada por funções JavaScript que exibem ou ocultam elementos HTML, proporcionando uma experiência de usuário mais dinâmica.
- **Layout Responsivo:** O CSS foi desenvolvido com media queries para garantir que o site e seja funcional em diferentes tamanhos de tela.

---

## 4. Plano de Testes

Realizamos uma simulação de compra registrada no Beeceptor



## 5. Resultados dos Testes

![{CFB68B32-9DB1-4E21-AB3B-FEBD8D46F509}](https://github.com/user-attachments/assets/e104243f-fa9f-4a0a-a2ed-56d193b98536)

---

## 6. Procedimentos para Executar
 

Milestone3 em um ambiente de desenvolvimento local. 
6.1. Pré-requisitos 
Antes de iniciar, certifique-se de que os seguintes softwares estão instalados em seu sistema: 
● Node.js: Versão 14.0 ou superior. O Node.js inclui o gerenciador de pacotes npm. Você 
pode baixá-lo em nodejs.org. 
● MongoDB: O banco de dados NoSQL utilizado no projeto. É necessário que o serviço do 
MongoDB esteja em execução na máquina local. Você pode baixá-lo em 
mongodb.com/try/download/community. 
● Git: Para clonar o repositório do projeto. Você pode baixá-lo em git-scm.com. 
● (Opcional) Postman: Recomendado para testar os endpoints da API, se desejado. Você 
pode baixá-lo em postman.com/downloads/. 
6.2. Instalação 
Siga os passos abaixo para baixar o código-fonte e instalar todas as dependências do 
frontend e do backend. 
1. Clonar o Repositório: 
Abra um terminal e clone o repositório do projeto a partir do GitHub: 
Bash 
git clone <URL_DO_SEU_REPOSITORIO_GITHUB> 
2. Acessar a Pasta do Projeto: 
Bash 
cd <NOME_DA_PASTA_DO_PROJETO> 
3. Instalar Dependências do Backend: 
Navegue até a pasta do servidor e instale suas dependências. 
Bash 
cd server 
npm install 
4. Instalar Dependências do Frontend: 
Volte para a pasta raiz e navegue até a pasta do cliente para instalar suas dependências. 
Bash 
npm install 
cd ../client  # Ou o nome que você deu para a pasta do frontend 
Ao final deste processo, todas as dependências necessárias para a aplicação estarão 
instaladas. 
6.3. Configuração Inicial do Banco de Dados 
O banco de dados inicia vazio. Os passos a seguir são necessários para cadastrar o 
administrador principal e os produtos, permitindo o uso completo da aplicação. 
1. Inicie o Servidor Backend: 
Em um terminal, dentro da pasta server, execute: 
Bash 
node index.js 
Mantenha este terminal aberto. Você deverá ver a mensagem "Servidor rodando na porta 
5000" e "Conectado ao MongoDB com sucesso!". 
2. Cadastre o Usuário Administrador: 
Use o Postman (ou outra ferramenta de API) para fazer uma requisição POST para criar o 
usuário admin: 
○ Método: POST 
○ URL: http://localhost:5000/api/register 
○ Body (raw, JSON): 
JSON 
{ 
} 
"name": "Administrador", 
"email": "admin@admin.com", 
"password": "admin" 
Na resposta, copie o valor do campo _id do usuário recém-criado. 
3. Promova o Usuário a Administrador: 
Faça uma requisição PUT para alterar o tipo do usuário: 
○ Método: PUT 
○ URL: http://localhost:5000/api/users/<ID_DO_ADMIN_COPIADO_ACIMA> 
○ Body (raw, JSON): 
JSON 
{ 
"userType": "admin" 
} 
4. Cadastre os Produtos Iniciais: 
Para cada produto que deseja adicionar, faça uma requisição POST para 
http://localhost:5000/api/products. Abaixo está um exemplo para o primeiro produto: 
○ Método: POST 
○ URL: http://localhost:5000/api/products 
○ Body (raw, JSON): 
JSON 
{ 
"name": "Jersey Bulls Michael Jordan (Hardwood Classics)", 
"price": 799.00, 
"description": "Um clássico atemporal: jersey Michael Jordan do Chicago Bulls (Authentic 
Hardwood Classics). Indispensável para qualquer fã, representa a era de ouro da NBA.", 
"image": "images/oCRUxMA.png", 
"stockBySize": { "P": 12, "M": 20, "G": 10, "GG": 12 }, 
"isFeatured": true, 
"playerMoments": [ 
{ "image": "images/jordan.jpg", "text": "Air jordan enterrando com a língua de fora" }, 
{ "image": "images/jordan2.jpg", "text": "Jordan cobrando lance livre de olhos 
fechados!" } 
] 
} 
Repita este passo para os outros produtos desejados. 
6.4. Executando a Aplicação 
Com as dependências instaladas e o banco de dados populado, a aplicação pode ser 
iniciada. Você precisará de dois terminais abertos simultaneamente. 
1. Terminal 1 - Iniciar o Backend: 
Se o servidor não estiver rodando, navegue até a pasta server e execute: 
Bash 
cd server 
node index.js 
Deixe este terminal aberto. 
2. Terminal 2 - Iniciar o Frontend: 
Abra um novo terminal, navegue até a pasta client (ou frontend) e execute: 
Bash 
cd client 
npm start 
3. Acessar a Aplicação: 
Uma nova aba deverá abrir automaticamente no seu navegador. Caso não abra, acesse 
manualmente o seguinte endereço: 
http://localhost:3000 
A aplicação estará pronta para ser utilizada.

## 7. Problemas Encontrados

Durante a fase de desenvolvimento e integração dos mockups, identificamos os seguintes pontos:
- **Dependência de `localStorage` para Dados Iniciais:** Atualmente, a inicialização dos dados de produtos e usuários depende do `localStorage`. Isso significa que, para ver as alterações de código nos dados, o `localStorage` do navegador pode precisar ser limpo manualmente em algumas situações (ex: após adicionar novos produtos diretamente no `script.js`).
- **Nenhum problema crítico impedindo a funcionalidade básica do frontend foi encontrado até o momento.**

---

## 📝 8. Comentários Finais

Este projeto foca na implementação de funcionalidades essenciais de frontend e na simulação de interações com um backend. A estrutura modular do código e a utilização de `localStorage` para persistência de dados (atualmente) e **Beeceptor** para simulação de chamadas de API permitem uma base sólida para futuras expansões.

```markdown
### Estrutura do Projeto:

| Arquivo/Diretório      | Descrição                                                                         |
| :--------------------- | :-------------------------------------------------------------------------------- |
| `/ (root)`             | Diretório raiz do projeto.                                                        |
| `├── Trabalho_Home.html` | Contém a estrutura HTML principal da aplicação, incluindo todas as seções.      |
| `├── U-Playercss.css`    | Define os estilos visuais e as regras de responsividade para todo o site.       |
| `├── script.js`          | Lógica JavaScript para navegação, gerenciamento de dados, carrinho de compras, autenticação de usuários e simulação de operações CRUD. |
| `└── logo.jpg`           | O arquivo de imagem que representa o logotipo da U-Player Online Store.           |
