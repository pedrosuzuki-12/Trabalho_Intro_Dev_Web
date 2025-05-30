# U-Player Online Store

## Grupo
- Nome: Kouki Hayashi - NUSP: 13672018
- Nome: Pedro Vitor Susuki Lau - NUSP: 13837133
- Nome: Jonathan Sanchez Minaya - NUSP: 11333691


## 1. Requisitos

### Requisitos principais:
- Usuário Cliente: pode visualizar e comprar produtos.
- Usuário Administrador: pode cadastrar, editar, excluir produtos/serviços.
- Cadastro de administradores e clientes com nome, id, telefone, e-mail.
- Produtos têm nome, id, foto, descrição, preço, quantidade em estoque e quantidade vendida.
- Sistema de carrinho de compras.
- Simulação de pagamento com número de cartão de crédito.
- CRUD de produtos para administradores.
- Acessibilidade e responsividade.

### Requisitos adicionais:
- Loja especializada em produtos de basquete (Jerseys).
- Funcionalidade única planejada: quando o produto for clicado visualizar momentos marcantes do jogador profissional.

---

## 2. Descrição do Projeto

O projeto é uma loja online de produtos de basquete chamada **U-Player**.  
O site apresenta:
- Tela inicial com lançamentos (Home)
- Seção para **Jerseys** (camisetas de times/jogadores).
- Seção de carrinho para vizualizar as compras.
- Sistema de login de usuario como de administrador (Usuario:admin@admin.com Senha:admin)
- Sistema CRUD de produtos
- Sistema de gerencia de usuarios
- Sistema de navegação utilizando `JavaScript`.

### Diagrama de Navegação:

![image](https://github.com/user-attachments/assets/d49e94b2-2b9a-4adf-bbe2-a1ad04706461)

### Informações planejadas para salvar no servidor:
- Dados dos produtos (nome, preço, descrição, quantidade em estoque por tamanho, imagem).
- Dados dos administradores e clientes (nome, id, endereço, telefone, e-mail).
- Histórico de compras realizadas.

---

## 3. Comentários sobre o Código

- O código utiliza `HTML5`, `CSS3`, e `JavaScript`.
- A navegação entre as seções é feita via DOM Manipulation.
- O layout é responsivo, adaptando-se a diferentes tamanhos de tela.

---

## 4. Plano de Testes

- Testar se os links de navegação exibem as seções corretas.
- Verificar se o site carrega corretamente em diferentes navegadores.
- Testar se o layout permanece responsivo em resoluções de desktop e mobile.

---

## 5. Resultados dos Testes

 - Por enquanto ainda não temos testes feitos.

---

## 6. Procedimentos para Executar

    1. Clonar o repositório do GitHub.
    2. Abrir o arquivo `Trabalho_Home.html` no navegador.

---

## 7. Problemas Encontrados

- Nenhum problema crítico encontrado durante o desenvolvimento dos mockups.

---

## 📝 8. Comentários Finais

### Estrutura Atual do Projeto:

```
/ (root)
├── Trabalho_Home.html
├── U-Playercss.css
├── script.js
└── images
```
