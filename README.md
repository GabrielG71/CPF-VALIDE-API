# 🔎 CPF-VALIDE-API

**API de Validação, Formatação e Geração de CPF em Node.js**

API desenvolvida com Express para validar, formatar e gerar CPFs automaticamente. Ideal para sistemas que necessitam verificar a integridade de números de CPF no backend.

---

## 🚀 Tecnologias utilizadas

<p align="left">
    <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
    <img alt="Express" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
    <img alt="Nodemon" src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white"/>
</p>

---

## 📌 Funcionalidades

- ✅ **Validação de CPF** - Verificação completa da integridade do número
- 🔧 **Formatação de CPF** - Conversão para formato padrão XXX.XXX.XXX-XX
- 🎲 **Geração de CPF** - Criação de CPFs válidos aleatórios

---

## 🔌 Principais Endpoints

### `POST /api/cpf/validate`
```json
// Request
{ "cpf": "123.456.789-10" }

// Response
{ "valid": true, "formatted": "123.456.789-10" }
```

### `POST /api/cpf/format`
```json
// Request
{ "cpf": "12345678910" }

// Response
{ "formatted": "123.456.789-10" }
```

### `GET /api/cpf/generate`
```json
// Response
{ "cpf": "12345678910", "formatted": "123.456.789-10" }
```

---

## ⚙️ Como rodar o projeto

### 🔧 Pré-requisitos
- [Node.js 18+](https://nodejs.org/)
- npm ou yarn

### 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/GabrielG71/CPF-VALIDE-API.git
cd CPF-VALIDE-API

# Instale as dependências
npm install

# Execute a aplicação
npm run dev     # Desenvolvimento
npm run start   # Produção
npm test        # Testes
```

A API estará disponível em: `http://localhost:3000`

---

## 📂 Estrutura do Projeto

```
cpf-valide-api/
├── .editorconfig           # Configurações do editor
├── .gitattributes          # Atributos do Git
├── .gitignore              # Arquivos ignorados pelo Git
├── LICENSE                 # Licença do projeto
├── README.md               # Documentação
├── package-lock.json       # Lock das dependências
├── package.json            # Dependências e scripts
├── server.js               # Servidor principal da aplicação
└── test.js                 # Testes da aplicação
```

---

## 🚀 Deploy com Docker

```bash
# Construir a imagem
docker build -t cpf-valide-api .

# Executar o container
docker run -p 3000:3000 cpf-valide-api
```

---

Feito com 💙 por **Gabriel Gonçalves**
