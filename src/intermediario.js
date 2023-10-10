const bancoDeDados = require("./bancodedados");
const { contas } = require("./bancodedados");

const validarSenha = (req, res, next) => {
  const { senha_banco } = req.query;

  if (senha_banco !== "Cubos123Bank") {
    return res.status(401).json({ mensagem: "Senha está incorreta" });
  }

  next();
};

const validarCpf = (req, res, next) => {
  const { cpf } = req.body;

  const cpfExiste = contas.some((conta) => conta.usuario.cpf === cpf);

  if (cpfExiste) {
    return res
      .status(401)
      .json({ mensagem: "Já existe uma conta com o CPF informado!" });
  }

  next();
};

const validarEmail = (req, res, next) => {
  const { email } = req.body;

  const emailExiste = contas.some((conta) => conta.usuario.email === email);

  if (emailExiste) {
    return res
      .status(401)
      .json({ mensagem: "Já existe uma conta com o E-mail informado!" });
  }

  next();
};
module.exports = {
  validarSenha,
  validarCpf,
  validarEmail,
};
