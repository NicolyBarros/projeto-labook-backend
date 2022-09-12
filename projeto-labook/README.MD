# Projeto Labook
- Projeto proposto para praticar programação orientada a objetos. 
- CRUD completo.

## API - Postman
- link: https://documenter.getpostman.com/view/20786077/VUjSF45c 

## Autor
- gitHub: https://github.com/NicolyBarros

## Instalação das dependências
- npm install : Instala as dependências utilizadas no desenvolvimento do projeto.
- Para conferir as dependências consultar arquivo 'package.json'.

## Criando e preenchenco arquivo .env
- Criar o arquivo .env e configurar com as informações de seu banco de dados.

PORT: 3003
DB_HOST = host
DB_USER = usuario
DB_PASSWORD = senha
DB_NAME = nome-do-banco-de-dados

JWT_KEY = senha
JWT_EXPIRES_IN = duração do token

BCRYPT_SALT_ROUNDS = 12 (padrão é 10/12)

## Popular tabelas
- npm run migrations: Cria e popula as tabelas no banco de dados com base no arquivo data.ts.

## Executar o projeto
- npm run dev: Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor localhost toda a vez que o projeto for alterado e salvo.

## Funcionalidades básicas

### Endpoint 1) Signup
Requisição de cadastro de novo usuário “NORMAL” que retorna ao final um token de acesso ao sistema.

Validações e Regras de Negócio do endpoint:

- name, email e password devem ser fornecidos e serem do tipo string
- name deve possuir ao menos 3 caracteres, enquanto password ao menos 6 caracteres
- email deve ter um formato válido e único, não podendo repetir no banco de dados

### Endpoint 2) Login
Requisição de acesso de usuários já cadastrados ao sistema. Ao final, um token de acesso é retornado.

Validações e Regras de Negócio do endpoint:

- email e password devem ser fornecidos e serem do tipo string
- password deve possuir ao menos 6 caracteres
- email deve ter um formato válido
- O usuário com o e-mail fornecido deve existir no sistema

### Endpoint 3) Create post
Resquisição protegida que cria um post. Caso tentem acessá-lo sem token é retornado uma mensagem de erro.

Validações e Regras de Negócio do endpoint:

- content deve possuir no mínimo 1 caractere

### Endpoint 4) Get posts
Requisição protegida que retorna todos os posts. Caso tentem acessá-lo sem token é retornado uma mensagem de erro.

Validações e Regras de Negócio do endpoint:

- dentre as informações dos posts, deve existir também o número de likes de cada um

### Endpoint 5) Delete post
Requisição protegida que deleta um post. Caso tentem acessá-lo sem token é retornado uma mensagem de erro. Admins podem deletar qualquer post, enquanto contas normais só podem deletar seus próprios posts.

Validações e Regras de Negócio do endpoint:

- id do post a ser deletado deve existir no sistema

### Endpoint 6) Like post
Requisição protegida que dá like em um post. Uma mesma pessoa não pode dar mais de um like a um post.

Validações e Regras de Negócio do endpoint:

- id do post que ganhará o like deve existir no sistema
- se o post já estiver com o like da pessoa é retornado um erro

### Endpoint 7) Delete user
Requisição protegida que remove o like de um post.

Validações e Regras de Negócio do endpoint:

- id do post que ganhará o like deve existir no sistema
- se o post não estiver com o like da pessoa é retornado um erro


### Endpoint 8) Edit post
Requisição protegida que edita um post. Caso tentem acessá-lo sem token é retornado uma mensagem de erro. Admins podem editar qualquer post, enquanto contas normais só podem editar seus próprios posts.

Validações e Regras de Negócio do endpoint:

- id do post a ser editado deve existir no sistema