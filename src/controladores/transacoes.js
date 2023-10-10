const bancoDeDados = require("../bancodedados");

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body;

  if (!numero_conta) {
    return res
      .status(404)
      .json({ mensagem: "O número da conta é obrigatório" });
  }

  if (valor <= 0) {
    return res.status(404).json({ mensagem: "Valor inválido" });
  }

  if (!valor) {
    return res
      .status(404)
      .json({ mensagem: "O número da conta é obrigatório" });
  }

  const numeroConta = Number(numero_conta);
  const valorDeposito = Number(valor);

  const contaExiste = bancoDeDados.contas.find(
    (conta) => conta.numeroConta === numeroConta
  );

  if (!contaExiste) {
    return res.status(404).json({ mensagem: "Conta nâo encontrada" });
  }

  if (valorDeposito <= 0) {
    return res
      .status(404)
      .json({ mensagem: "O valor a ser depositado deve ser maior que 0" });
  }

  contaExiste.saldo += valorDeposito;

  const registroDeposito = {
    data: new Date(),
    numero_conta: numeroConta,
    valor: valorDeposito,
  };

  bancoDeDados.depositos.push(registroDeposito);

  return res.status(204).send();
};

const sacar = (req, res) => {
  const { numero_conta, valor, senha } = req.body;

  if (!numero_conta) {
    return res
      .status(404)
      .send({ mensagem: "O campo numero da conta e obrigatório" });
  }

  if (!valor) {
    return res.status(404).send({ mensagem: "O campo valor é obrigatório" });
  }

  if (!senha) {
    return res.status(404).send({ mensagem: "O campo da senha é obrigatório" });
  }

  const numeroConta = Number(numero_conta);
  const valorSacar = Number(valor);

  const contaExiste = bancoDeDados.contas.find(
    (conta) => conta.numeroConta === numeroConta
  );

  if (!contaExiste) {
    return res.status(404).json({ mensagem: "Conta nâo encontrada" });
  }

  if (valorSacar > contaExiste.saldo) {
    return res.status(404).json({ mensagem: "Saldo insuficiente!" });
  }

  if (senha !== contaExiste.usuario.senha) {
    return res
      .status(404)
      .json({ mensagem: "A senha do banco informada é inválida!" });
  }

  contaExiste.saldo -= valorSacar;

  const registroSaque = {
    data: new Date(),
    numero_conta: numeroConta,
    valor: valorSacar,
  };

  bancoDeDados.saques.push(registroSaque);

  return res.status(204).send();
};

const transferir = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (!numero_conta_origem) {
    return res
      .status(404)
      .json({ mensagem: "O número da conta de origem é obrigatório!" });
  }

  if (!numero_conta_destino) {
    return res
      .status(404)
      .json({ mensagem: "O número da conta de origem é obrigatório!" });
  }

  if (!valor) {
    return res.status(404).json({ mensagem: "Valor inválido" });
  }

  if (!senha) {
    return res.status(404).json({ mensagem: "O campom senha e obrigatório" });
  }

  const numeroContaOrigem = Number(numero_conta_origem);
  const numeroContaDestino = Number(numero_conta_destino);
  const valorTransferencia = Number(valor);

  const contaOrigemExiste = bancoDeDados.contas.find(
    (conta) => conta.numeroConta === numeroContaOrigem
  );
  const contaDestinoExiste = bancoDeDados.contas.find(
    (conta) => conta.numeroConta === numeroContaDestino
  );

  if (!contaOrigemExiste) {
    return res.status(404).json({ mensagem: "Conta origem não encontrada" });
  }

  if (!contaDestinoExiste) {
    return res.status(404).json({ mensagem: "Conta destino não encontrada" });
  }

  if (contaOrigemExiste.saldo < 0) {
    return res.status(404).json({ mensagem: "Saldo insulficiente" });
  }

  if (senha !== contaOrigemExiste.usuario.senha) {
    return res.status(404).json({ mensagem: "Senha inválida" });
  }

  contaOrigemExiste.saldo -= valorTransferencia;
  contaDestinoExiste.saldo += valorTransferencia;

  const registroTransferencia = {
    data: new Date(),
    numero_conta_origem: numeroContaOrigem,
    numero_conta_destino: numeroContaDestino,
    valor: valorTransferencia,
  };

  bancoDeDados.transferencias.push(registroTransferencia);

  return res.status(204).send();
};

module.exports = {
  depositar,
  sacar,
  transferir,
};
