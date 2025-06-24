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
- **Navegação SPA (Single Page Application):1** Utiliza `JavaScript` para manipulação do DOM, proporcionando uma transição suave entre as seções sem recarregamento completo da página.

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

O plano de testes do projeto focou na verificação das operações CRUD (Criar, Ler, Atualizar, Excluir) de produtos, no cadastro e gerenciamento de usuários, e na simulação do processo de compra via API. Para isso, o **Postman** foi utilizado como ferramenta principal para enviar requisições diretas ao backend e validar as respostas.

Os testes incluíram os seguintes cenários:

* **Gerenciamento de Usuários:**
    * Cadastro de um novo usuário (cliente).
    * Promoção de um usuário existente a administrador.
    * Listagem de todos os usuários cadastrados.
    * Tentativa de alterar o administrador principal (teste de validação de regra de negócio).
* **Gerenciamento de Produtos:**
    * Cadastro de um novo produto.
    * Listagem de todos os produtos.
    * Atualização de atributos de um produto existente.
    * Exclusão de um produto.
* **Processo de Compra:**
    * Simulação de uma compra com itens no carrinho.

Cada operação foi testada individualmente para confirmar a correta comunicação com o servidor (`http://localhost:5000`) e a persistência dos dados no MongoDB.

## 5. Resultados dos Testes

Os testes de API realizados via Postman confirmaram o funcionamento esperado das operações de gerenciamento de produtos e usuários, bem como do processo de compra. As respostas HTTP `200 OK` (sucesso), `201 Created` (recurso criado) e as mensagens de confirmação do servidor validaram a integridade do backend e a implementação das regras de negócio.

Abaixo estão os registros detalhados dos testes e seus resultados:

### Testes de Gerenciamento de Usuários

#### Teste 1.1: Cadastro de Usuário (Cliente)
* **Requisição:** `POST` para `http://localhost:5000/api/register` com dados de um novo cliente.
* **Resultado Esperado:** Criação bem-sucedida do usuário com tipo "client".
* **Resultado Obtido:** Status `201 Created` e retorno do objeto do usuário com `userType: "client"`.

    ![Cadastro de Usuário Cliente no Postman][postman-register-client]

#### Teste 1.2: Cadastro de Usuário (Administrador)
* **Requisição:** `POST` para `http://localhost:5000/api/register` com dados de um novo administrador.
* **Resultado Esperado:** Criação bem-sucedida do usuário.
* **Resultado Obtido:** Status `201 Created` e retorno do objeto do usuário.

    ![Cadastro de Usuário Administrador no Postman][postman-register-admin]

#### Teste 1.3: Promoção de Usuário a Administrador
* **Requisição:** `PUT` para `http://localhost:5000/api/users/<ID_DO_USUARIO_CLIENTE>` com `{ "userType": "admin" }`.
* **Resultado Esperado:** O `userType` do usuário deve ser alterado para "admin".
* **Resultado Obtido:** Status `200 OK` e o objeto do usuário com `userType: "admin"`.

    ![Promoção de Usuário para Admin no Postman][postman-promote-admin]

#### Teste 1.4: Listagem de Usuários
* **Requisição:** `GET` para `http://localhost:5000/api/users`.
* **Resultado Esperado:** Retorno de uma lista contendo todos os usuários cadastrados (clientes e administradores).
* **Resultado Obtido:** Status `200 OK` e um array JSON com os detalhes de todos os usuários.

    ![Listagem de Usuários no Postman][postman-list-users]

#### Teste 1.5: Tentativa de Alterar Administrador Principal (Cenário de Erro)
* **Requisição:** `PUT` para `http://localhost:5000/api/users/<ID_DO_ADMIN_PRINCIPAL>` com `{ "userType": "client" }` (ou qualquer alteração de um admin já existente).
* **Resultado Esperado:** Recusa da operação com um erro de permissão ou regra de negócio.
* **Resultado Obtido:** Status `403 Forbidden` e a mensagem "O administrador principal não pode ser alterado.".

    ![Erro ao Alterar Admin Principal no Postman][postman-error-admin-change]

### Testes de Gerenciamento de Produtos

#### Teste 2.1: Cadastro de Produto
* **Requisição:** `POST` para `http://localhost:5000/api/products` com os dados de um novo produto (ex: "Jersey Lakers Kobe Bryant").
* **Resultado Esperado:** Produto criado com sucesso.
* **Resultado Obtido:** Status `201 Created` e retorno do objeto do produto recém-cadastrado.

    ![Cadastro de Produto no Postman][postman-create-product]

#### Teste 2.2: Listagem de Produtos
* **Requisição:** `GET` para `http://localhost:5000/api/products`.
* **Resultado Esperado:** Retorno da lista de produtos existentes, incluindo o produto recém-criado.
* **Resultado Obtido:** Status `200 OK` e um array JSON com os detalhes dos produtos.

    ![Listagem de Produtos no Postman][postman-list-products]

#### Teste 2.3: Atualização de Produto
* **Requisição:** `PUT` para `http://localhost:5000/api/products/<ID_DO_PRODUTO>` para atualizar o preço de um produto existente.
* **Resultado Esperado:** Preço do produto atualizado com sucesso.
* **Resultado Obtido:** Status `200 OK` e o objeto do produto com o preço modificado.

    ![Atualização de Produto no Postman][postman-update-product]

#### Teste 2.4: Exclusão de Produto
* **Requisição:** `DELETE` para `http://localhost:5000/api/products/<ID_DO_PRODUTO>` para remover um produto.
* **Resultado Esperado:** Produto removido com sucesso.
* **Resultado Obtido:** Status `200 OK` e a mensagem "Produto deletado com sucesso".

    ![Exclusão de Produto no Postman][postman-delete-product]

### Testes de Processo de Compra

#### Teste 3.1: Simulação de Compra
* **Requisição:** `POST` para `http://localhost:5000/api/purchase` com um array de itens no carrinho.
* **Resultado Esperado:** Confirmação da compra.
* **Resultado Obtido:** Status `200 OK` e a mensagem "Compra realizada com sucesso!".

    ![Simulação de Compra no Postman][postman-purchase]

---

## 6. Procedimentos para Executar
 

Para executar o projeto U-Player Online Store em um ambiente de desenvolvimento local, siga os passos abaixo.

### 6.1. Pré-requisitos
Certifique-se de que os seguintes softwares estão instalados em seu sistema:

* **Node.js:** Versão 14.0 ou superior. Inclui o gerenciador de pacotes npm. Baixe em [nodejs.org](https://nodejs.org/).
* **MongoDB:** Banco de dados NoSQL utilizado no backend. É necessário que o serviço do MongoDB esteja em execução na máquina local. Baixe em [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community/).
* **Git:** Para clonar o repositório do projeto. Baixe em [git-scm.com](https://git-scm.com/).
* **(Opcional) Postman:** Recomendado para testar os endpoints da API. Baixe em [postman.com/downloads/](https://www.postman.com/downloads/).

### 6.2. Instalação
Siga os passos abaixo para clonar o código-fonte e instalar todas as dependências do frontend e do backend.

1.  **Clonar o Repositório:**
    Abra um terminal (como o Terminal do VS Code) e clone o repositório do projeto:

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO_GITHUB>
    # Exemplo: git clone [https://github.com/pedrosuzuki-12/Trabalho_Intro_Dev_Web.git](https://github.com/pedrosuzuki-12/Trabalho_Intro_Dev_Web.git)
    ```
   

2.  **Acessar a Pasta Raiz do Projeto:**
    Navegue até a pasta que foi clonada, que é a raiz do seu repositório:

    ```bash
    cd Trabalho_Intro_Dev_Web
    ```
   

3.  **Instalar Dependências do Backend:**
    Navegue para a pasta do servidor (localizada dentro de `U-Player`) e instale suas dependências:

    ```bash
    cd U-Player/server
    npm install
    ```
   

4.  **Instalar Dependências do Frontend:**
    Volte para a pasta raiz do projeto (`Trabalho_Intro_Dev_Web`), navegue até a pasta do cliente (`client` dentro de `U-Player`) e instale suas dependências:

    ```bash
    cd ../../U-Player/client # Volta duas pastas para a raiz do repositório e entra em U-Player/client
    npm install
    ```
   
    *Ao final deste processo, todas as dependências necessárias para a aplicação estarão instaladas.*

### 6.3. Configuração Inicial do Banco de Dados
O banco de dados inicia vazio. Os passos a seguir são necessários para cadastrar o administrador principal e os produtos, permitindo o uso completo da aplicação.

1.  **Inicie o Serviço MongoDB:**
    Certifique-se de que o serviço do MongoDB esteja em execução em sua máquina local.

2.  **Inicie o Servidor Backend:**
    Em um terminal, navegue até a pasta do servidor (`U-Player/server`) e execute:

    ```bash
    cd U-Player/server
    node index.js
    ```
   
    *Mantenha este terminal aberto. Você deverá ver a mensagem "Servidor rodando na porta 5000" e "Conectado ao MongoDB com sucesso!".*

3.  **Cadastre o Usuário Administrador:**
    Use o Postman (ou outra ferramenta de API) para fazer uma requisição `POST` para criar o usuário admin:

    * **Método:** `POST`
    * **URL:** `http://localhost:5000/api/register`
    * **Body (raw, JSON):**
        ```json
        {
          "name": "Administrador",
          "email": "admin@admin.com",
          "password": "admin"
        }
        ```
       
    *Na resposta, copie o valor do campo `_id` do usuário recém-criado.*

4.  **Promova o Usuário a Administrador:**
    Faça uma requisição `PUT` para alterar o tipo do usuário (substitua `<ID_DO_ADMIN_COPIADO_ACIMA>` pelo ID que você copiou):

    * **Método:** `PUT`
    * **URL:** `http://localhost:5000/api/users/<ID_DO_ADMIN_COPIADO_ACIMA>`
    * **Body (raw, JSON):**
        ```json
        {
          "userType": "admin"
        }
        ```
       

5.  **Cadastre os Produtos Iniciais:**
    Para cada produto que deseja adicionar, faça uma requisição `POST` para `http://localhost:5000/api/products`. Abaixo está um exemplo para o primeiro produto:

    * **Método:** `POST`
    * **URL:** `http://localhost:5000/api/products`
    * **Body (raw, JSON):**
        ```json
        {
          "name": "Jersey Bulls Michael Jordan (Hardwood Classics)",
          "price": 799.00,
          "description": "Um clássico atemporal: jersey Michael Jordan do Chicago Bulls (Authentic Hardwood Classics). Indispensável para qualquer fã, representa a era de ouro da NBA.",
          "image": "images/oCRUxMA.png",
          "stockBySize": { "P": 12, "M": 20, "G": 10, "GG": 12 },
          "isFeatured": true,
          "playerMoments": [
            { "image": "images/jordan.jpg", "text": "Air jordan enterrando com a língua de fora" },
            { "image": "images/jordan2.jpg", "text": "Jordan cobrando lance livre de olhos fechados!" }
          ]
        }
        ```
       
    *Repita este passo para os outros produtos desejados, usando os dados apropriados para cada um.*

### 6.4. Executando a Aplicação
Com as dependências instaladas e o banco de dados populado, a aplicação pode ser iniciada. Você precisará de dois terminais abertos simultaneamente.

1.  **Terminal 1 - Iniciar o Backend:**
    Navegue até a pasta do servidor (`U-Player/server`) e execute:

    ```bash
    cd U-Player/server
    node index.js
    ```
   
    *Deixe este terminal aberto.*

2.  **Terminal 2 - Iniciar o Frontend:**
    Abra um novo terminal, navegue até a pasta do cliente (`U-Player/client`) e execute:

    ```bash
    cd U-Player/client
    npm start
    ```
   

3.  **Acessar a Aplicação:**
    Uma nova aba deverá abrir automaticamente no seu navegador. Caso não abra, acesse manualmente o seguinte endereço:
    `http://localhost:3000`

    *A aplicação estará pronta para ser utilizada.*

## 7. Problemas Encontrados

Durante a fase de desenvolvimento e integração, identificamos os seguintes pontos:

* **Validação de Administrador Principal:** Foi implementada uma regra no backend que impede a alteração do tipo de usuário do administrador principal. Tentativas de modificar este usuário resultam em um erro `403 Forbidden` com a mensagem "O administrador principal não pode ser alterado.". Esta é uma funcionalidade intencional para garantir a segurança e integridade do sistema.
* **Gestão de Estoque e Vendas:** A simulação de compra (`/api/purchase`) foi testada com sucesso via API, porém, a implementação completa da atualização do estoque (`stockBySize`) e do contador de vendas (`sold`) no backend após a compra precisa ser verificada em cenários mais complexos e integrada ao fluxo do frontend.
* **Nenhum problema crítico impedindo a funcionalidade básica do frontend foi encontrado até o momento, dado o escopo atual do projeto.**

---

## 📝 8. Comentários Finais

Este projeto **U-Player Online Store** representa uma base sólida para uma aplicação de e-commerce de produtos de basquete, com um backend funcional capaz de gerenciar usuários e produtos, além de simular compras. O uso do **Node.js** com **Express** no backend e o **MongoDB** como banco de dados NoSQL demonstram uma arquitetura moderna e escalável.

A aplicação frontend, construída com **React** oferece uma experiência de usuário SPA (Single Page Application) com navegação fluida e design responsivo. Os testes de API com **Postman** foram cruciais para validar a robustez das operações de backend, incluindo a gestão de usuários (com casos de sucesso e regras de segurança para o administrador principal) e produtos, além da simulação de processos de compra.

Embora o projeto já conte com funcionalidades essenciais, há oportunidades para futuras melhorias, como:
* Implementação de autenticação baseada em tokens (JWT) para maior segurança nas requisições da API.
* Expansão das funcionalidades do painel administrativo no frontend.
* Aprimoramento da interface de usuário e experiência de compra.

Acreditamos que este projeto atende aos requisitos propostos e serve como um excelente ponto de partida para um sistema de e-commerce mais complexo.


