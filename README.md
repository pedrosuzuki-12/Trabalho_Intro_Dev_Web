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

### Persistência de Dados (Simulada):
Para simular as requisições a um backend, utilizamos o **Beeceptor** como um mock API. As informações planejadas para serem salvas (e que atualmente são manipuladas via `localStorage` no frontend, com a estrutura para futura integração com o Beeceptor) incluem:
- Dados dos produtos (nome, preço, descrição, quantidade em estoque por tamanho, URL da imagem).
- Dados dos administradores e clientes (nome, ID, endereço, telefone, e-mail).
- Histórico de compras realizadas (estrutura para futura implementação).

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

Uma simulação de compra registrada no Beeceptor
![{CFB68B32-9DB1-4E21-AB3B-FEBD8D46F509}](https://github.com/user-attachments/assets/e104243f-fa9f-4a0a-a2ed-56d193b98536)


## 5. Resultados dos Testes

Esta seção será preenchida à medida que os testes forem executados. 

---

## 6. Procedimentos para Executar

Para executar o projeto localmente, siga os passos abaixo:

1.  **Dowload do ZIP**

2.  **Abrir no Navegador:**
     Abra o `Trabalho_Home.html` no seu navegador através do endereço fornecido pelo servidor (geralmente `http://127.0.0.1:5500/Trabalho_Home.html` ou similar).

---

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
