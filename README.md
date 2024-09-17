# Easydesk

## Descrição
Este projeto é uma aplicação web para ajudar restaurantes a gerenciar seus pedidos de forma eficiente. Ele oferece funcionalidades para o cadastro de clientes, controle de mesas e gerenciamento de pedidos, desde o registro até a conclusão. O sistema é focado na simplicidade e na praticidade, permitindo que os usuários façam cadastro, login e utilizem recursos como acompanhamento de status de pedidos e fechamento de contas.

---
## Funcionalidades
1. **Cadastro de usuários**:
- Os usuários podem se cadastrar fornecendo as credenciais.
- Validação de formato do telefone e email.
- Verificação de credenciais no banco de dados.

2. **Login com autenticação JWT**:
- Os usuários se autenticam utilizando e-mail e senha.
- O token JWT é armazenado no `localStorage` para manter a sessão.
- O token é limpo automaticamente.

3. **Gerenciamento de cardápio:**
- Os usuários podem criar um cardápio.
- Itens podem serem adicionados, editados e removidos sempre que necessário.

4. **Gestão de pedidos**:
- Os usuários podem criar novos pedidos para mesas disponíveis.
- Adicionar itens de um cardápio dinâmico ao pedido.
- Alteração do estado do pedido: "Aberto", "Em Preparação", "Pronto" e "Fechado".

5. **Gestão de mesas**:
- Cadastro simples de novas mesas.
- Mesas ocupadas são filtradas e não aparecem na lista de seleção de novas mesas.
- Ajustar disponibilidade e apagar mesas quando necessário.

---
## Construção do sistema
### Front-end:
- **React.js**: Biblioteca para construção da interface.
- **React Router**: Utilizado para navegação entre páginas.
- **Axios**: Biblioteca para chamadas HTTP.
- **CSS**: Para estilização da aplicação.
### Back-end:
- A aplicação depende de uma API para persistência de dados e autenticação.
- A URL base da API está configurada em uma variável global.

---
## Instalação e configuração
### Instalação do front-end
1. Clone o repositório:
```bash
git clone https://github.com/christianestevam/easy-desk-app.git
```

2. Abra o arquivo:
```bash
cd easy-desk-app
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie a aplicação:
```bash
npm start
```
