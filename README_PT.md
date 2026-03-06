# 🌐 Social Network Backend

Backend para plataforma de rede social desenvolvido com **NestJS**, **TypeORM** e **PostgreSQL**.

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL 13+
- npm ou yarn

## 🚀 Instalação

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar banco de dados

Crie um banco de dados PostgreSQL:
```sql
CREATE DATABASE social_network;
```

Com PostGIS habilitado:
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

### 3. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais de banco de dados:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=social_network
JWT_SECRET=sua_chave_secreta_aqui
```

## 📦 Scripts disponíveis

```bash
# Executar em modo desenvolvimento (com hot-reload)
npm run start:dev

# Build para produção
npm run build

# Executar em produção
npm run start:prod

# Testes
npm run test

# Testes e2e
npm run test:e2e
```

## 🔐 Autenticação

O sistema usa **JWT (JSON Web Tokens)** para autenticação. 

### Endpoints de Autenticação

#### Registrar novo usuário
```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "username": "usuario123",
  "password": "senha_segura_123",
  "firstName": "João",
  "lastName": "Silva",
  "bio": "Meu perfil"
}
```

**Resposta (201):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "username": "usuario123",
    "firstName": "João",
    "lastName": "Silva"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "senha_segura_123"
}
```

**Resposta (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "username": "usuario123",
    "firstName": "João",
    "lastName": "Silva"
  }
}
```

#### Obter perfil do usuário autenticado
```http
GET /auth/me
Authorization: Bearer {access_token}
```

**Resposta (200):**
```json
{
  "userId": "uuid",
  "email": "usuario@example.com",
  "username": "usuario123"
}
```

## 📊 Entidades

### User
A entidade principal do sistema com os seguintes campos:

- `id` (UUID) - Identificador único
- `email` (String, único) - Email do usuário
- `username` (String, único) - Nome de usuário
- `password` (String) - Senha criptografada
- `firstName` (String, opcional) - Primeiro nome
- `lastName` (String, opcional) - Último nome
- `bio` (String, opcional) - Biografia
- `profilePicture` (String, opcional) - URL da foto de perfil
- `location` (Geometry/Point, opcional) - Localização geográfica (PostGIS)
- `isVerified` (Boolean) - Se o email foi verificado
- `isActive` (Boolean) - Se a conta está ativa
- `createdAt` (Date) - Data de criação
- `updatedAt` (Date) - Data de última atualização

## 🏗️ Estrutura do Projeto

```
src/
├── auth/              # Módulo de autenticação
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── auth-response.dto.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── strategies/
│       └── jwt.strategy.ts
├── users/             # Módulo de usuários
│   ├── users.service.ts
│   ├── users.module.ts
│   ├── dto/
│   │   └── create-user.dto.ts
│   └── entities/
│       └── user.entity.ts
├── database/          # Configuração de banco de dados
│   └── database.module.ts
├── app.module.ts
├── app.service.ts
├── app.controller.ts
└── main.ts
```

## 🔐 Validações

- Email válido e único
- Username único, entre 3 e 100 caracteres
- Senha com mínimo de 8 caracteres
- Conflitos de email/username tratados com erro 409

## 🛡️ Segurança

- Senhas criptografadas com bcrypt (10 saltos)
- Autenticação com JWT (Token de 24 horas)
- Validação de entrada com class-validator
- Proteção de rotas com JwtAuthGuard

## 📝 Próximas etapas

- [ ] Verificação de email
- [ ] Recuperação de senha
- [ ] Atualização de perfil
- [ ] Sistema de seguidores
- [ ] Feed de posts
- [ ] Comentários e likes
- [ ] Mensagens diretas
- [ ] Notificações

## 🤝 Contribuindo

Feel free to fork, modify and use this code for your project.

## 📄 Licença

MIT
