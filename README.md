# 💬 Big Chat Brasil – Desafio Frontend

Este é o projeto Big chat Brasil. A aplicação simula uma **interface de chat interativa** entre empresas e clientes, com suporte a mensagens, saldo, histórico de consumo e diferenciação de urgência.

---

## 🚀 Funcionalidades Implementadas

### ✅ Funcionalidades essenciais:
- Tela de login com CPF/CNPJ (com máscara e validação)
- Lista de conversas recentes
- Interface de chat com estilo "WhatsApp Web"
- Envio de mensagens com bolhas visuais
- Exibição de saldo do cliente

### ✅ Aprimoramentos:
- Urgência nas mensagens (🟥)
- Feedback visual de status (✓, ✓✓, ❌)
- Simulação de "digitando..."
- Histórico de consumo com desconto no saldo
- Busca de conversas por nome
- Design responsivo e modo escuro

---

🧪 Tecnologias Utilizadas

React com TypeScript

React Router DOM para navegação

Context API para gerenciamento global de usuário

Estilização inline com tema escuro (modo dark)

Mock de dados via arrays locais (contacts, conversations, messages)

---

📌 Considerações
Este projeto utiliza dados mockados para simulação de API.

O foco foi na entrega de funcionalidades funcionais, bem estruturadas e visualmente claras.

O design é escuro, responsivo e inspirado no WhatsApp Web.

---

## 🐳 Rodando com Docker

### 📋 Pré-requisitos:
- [Docker](https://www.docker.com/) instalado

### ▶️ Executando:

```bash
# 1. Clone o projeto
git clone https://github.com/WilliamAgostinho/BCB-PROJECT.git
cd bcb-chat-frontend

# 2. Build da imagem
docker build -t bcb-chat-frontend .

# 3. Execução do container
docker run -p 3000:3000 bcb-chat-frontend

---
Feito Por: 

William Souza
Desenvolvedor Frontend
