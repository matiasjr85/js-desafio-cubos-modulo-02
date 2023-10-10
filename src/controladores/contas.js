const bancoDeDados = require("../bancodedados");

let proximaConta = 1;

const listarContas = (req, res) => {
  return res.json(bancoDeDados.contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome) {
    return res.status(404).json({ mensagem: "O campo nome é obrigatorio" });
  }

  if (!cpf) {
    return res.status(404).json({ mensagem: "O campo cpf é obrigatorio" });
  }

  if (!data_nascimento) {
    return res
      .status(404)
      .json({ mensagem: "O campo data de nascimento é obrigatorio" });
  }

  if (!telefone) {
    return res.status(404).json({ mensagem: "O campo telefone é obrigatorio" });
  }

  if (!email) {
    return res.status(404).json({ mensagem: "O campo email é obrigatorio" });
  }

  if (!senha) {
    return res.status(404).json({ mensagem: "O campo senha é obrigatorio" });
  }

  const novaConta = {
    numeroConta: proximaConta,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };

  proximaConta++;

  bancoDeDados.contas.push(novaConta);

  return res.status(201).send();
};

const atualizarUsuario = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const numeroConta = Number(req.params.numeroConta);

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem ser preenchidos" });
  }

  const contaExiste = bancoDeDados.contas.find(
    (conta) => conta.numeroConta === numeroConta
  );

  if (!contaExiste) {
    return res.status(400).json({ mensagem: "Conta não encontrada" });
  }

  contaExiste.usuario.nome = nome;
  contaExiste.usuario.cpf = cpf;
  contaExiste.usuario.data_nascimento = data_nascimento;
  contaExiste.usuario.telefone = telefone;
  contaExiste.usuario.email = email;
  contaExiste.usuario.senha = senha;

  return res.status(204).send();
};

const excluirConta = (req, res) => {
  const numeroConta = Number(req.params.numeroConta);

  const contaExiste = bancoDeDados.contas.find(
    (conta) => conta.numeroConta === numeroConta
  );

  if (!numeroConta) {
    return res.status(404).json({ mensagem: "Conta não encontrada" });
  }

  if (contaExiste.saldo > 0) {
    return res
      .status(404)
      .json({ mensagem: "So pode ser excluidas contas que tenham 0 de saldo" });
  }

  bancoDeDados.contas.splice(bancoDeDados.contas.indexOf(contaExiste), 1);

  return res.status(204).send();
};

const saldo = (req, res) => {
  const numeroConta = Number(req.query.numero_conta);
  const senha = req.query.senha;

  if (!numeroConta) {
    return res
      .status(404)
      .json({ mensagem: "O campo numero conta é obrigatorio" });
  }

  if (!senha) {
    return res.status(404).json({ mensagem: "A senha deve ser informada" });
  }

  const contaExiste = bancoDeDados.contas.find(
    (conta) => conta.numeroConta === numeroConta
  );

  if (!contaExiste) {
    return res.status(404).json({ mensagem: "Conta não existente" });
  }

  if (senha !== contaExiste.usuario.senha) {
    return res.status(404).json({ mensagem: "Senha inválida" });
  }

  const saldo = contaExiste.saldo;

  return res.status(200).json({ saldo });
};

const extrato = (req, res) => {
  const numeroConta = Number(req.query.numero_conta);
  const senha = req.query.senha;

  if (!numeroConta) {
    return res
      .status(404)
      .json({ mensagem: "O campo numero conta é obrigatório" });
  }

  if (!senha) {
    if (!senha) {
      return res.status(404).json({ mensagem: "A senha deve ser informada" });
    }
  }

  const contaExiste = bancoDeDados.contas.find(
    (conta) => conta.numeroConta === numeroConta
  );

  if (!contaExiste) {
    return res.status(404).json({ mensagem: "Conta não existente" });
  }

  if (senha !== contaExiste.usuario.senha) {
    return res.status(404).json({ mensagem: "Senha inválida" });
  }

  const depositos = bancoDeDados.depositos.filter(
    (transacao) => transacao.numero_conta === numeroConta
  );
  const saques = bancoDeDados.saques.filter(
    (transacao) => transacao.numero_conta === numeroConta
  );
  const transferenciasEnviadas = bancoDeDados.transferencias.filter(
    (transacao) => transacao.numero_conta_origem === numeroConta
  );
  const transferenciasRecebidas = bancoDeDados.transferencias.filter(
    (transacao) => transacao.numero_conta_destino === numeroConta
  );

  return res.status(200).json({
    depositos,
    saques,
    transferenciasEnviadas,
    transferenciasRecebidas,
  });
};

module.exports = {
  listarContas,
  criarConta,
  atualizarUsuario,
  excluirConta,
  saldo,
  extrato,
};
