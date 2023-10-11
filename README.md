![visitors](https://visitor-badge.laobi.icu/badge?page_id=matiasjr85.js-desafio-cubos-modulo-02)

# Desafio modulo 02 - Cubos Academy

Um desafio para desenvolver uma API para um Banco Digital. Nesta versão, com a possibilidade de futuras funcionalidades, os dados bancários (nome, agência, etc.) são imutáveis. O objetivo é criar uma RESTful API que permita realizar as seguintes operações:

## :man_mechanic: Linguagens e Ferramentas

- Javascript
- Node.js
- Insomnia
- Vscode
- Git

## :paintbrush: Layout

### :desktop_computer: Desktop

![BancoDigital](https://github.com/matiasjr85/js-desafio-cubos-modulo-02/assets/116046520/b6d85e07-8528-483c-b9ae-887a63825bc2)

## :triangular_flag_on_post: Contribua com o projeto

- Realize o Fork
- Faça as modificações necessárias
- Realize a Pull Request (PR)

## :ladder: Fucionalidades do Projeto

- [x] Criar conta bancária
- [x] Listar contas bancárias
- [x] Atualizar dados do usuário da conta bancária
- [x] Excluir uma conta bancária
- [x] Depositar em uma conta bancária
- [x] Sacar de uma conta bancária
- [x] Transferir valores entre contas bancárias
- [x] Consultar saldo da conta bancária
- [x] Emitir extrato bancário

## :computer: Rodando o Projeto

```shell
# 1. Clone o projeto

git clone https://github.com/matiasjr85/js-desafio-cubos-modulo-02.git

# 2. Inicie um projeto

npm init -y

# 3. Instale a dependencia Express

npm install express

# 4. Instale a dependencia Nodemon

npm install -D nodemon

# 5. Configurar Nodemon

Entrar na pasta package.json, ir em scripts, apagar oque tem dentro e colocar "dev": "nodemon ./src/index.js"

# 6. Rodando o projeto

npm run dev
```

## :sassy_man: Endpoints

- get /contas;
- post /contas;
- put /contas/:numeroConta/usuario;
- delete /contas/:numeroConta;
- post /transacoes/depositar;
- post /transacoes/sacar;
- post /transacoes/transferir;
- get /contas/saldo;
- get /contas/extrato;

## :technologist: Autor

<a href="https://github.com/matiasjr85">
<img src="https://avatars.githubusercontent.com/u/116046520?v=4" width="50px" />
</a>

## :writing_hand: Dados do Projeto

<img src="https://img.shields.io/github/stars/matiasjr85/js-desafio-cubos-modulo-02?style=social">
<img src="https://img.shields.io/github/issues-pr-raw/matiasjr85/js-desafio-cubos-modulo-02?style=social">
<img src="https://img.shields.io/github/issues-closed/matiasjr85/js-desafio-cubos-modulo-02?style=social">
