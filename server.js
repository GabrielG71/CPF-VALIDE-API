const express = require("express");
const app = express();
const PORT = 3000;

// Middleware para parsing JSON
app.use(express.json());

// Função para validar CPF
function validarCPF(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, "");

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) {
    return {
      valido: false,
      motivo: "CPF deve ter 11 dígitos",
    };
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    return {
      valido: false,
      motivo: "CPF não pode ter todos os dígitos iguais",
    };
  }

  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digito1 = resto < 2 ? 0 : resto;

  if (digito1 !== parseInt(cpf.charAt(9))) {
    return {
      valido: false,
      motivo: "Primeiro dígito verificador inválido",
    };
  }

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digito2 = resto < 2 ? 0 : resto;

  if (digito2 !== parseInt(cpf.charAt(10))) {
    return {
      valido: false,
      motivo: "Segundo dígito verificador inválido",
    };
  }

  return {
    valido: true,
    motivo: "CPF válido",
  };
}

// Função para formatar CPF
function formatarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, "");
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Rota principal
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Validação de CPF",
    versao: "1.0.0",
    endpoints: {
      "POST /validar": "Valida um CPF",
      "POST /formatar": "Formata um CPF",
      "GET /gerar": "Gera um CPF válido aleatório",
    },
  });
});

// Rota para validar CPF
app.post("/validar", (req, res) => {
  const { cpf } = req.body;

  if (!cpf) {
    return res.status(400).json({
      erro: "CPF é obrigatório",
      exemplo: { cpf: "12345678901" },
    });
  }

  try {
    const resultado = validarCPF(cpf);
    const cpfLimpo = cpf.replace(/[^\d]/g, "");

    res.json({
      cpf: cpf,
      cpfFormatado: formatarCPF(cpfLimpo),
      ...resultado,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro interno do servidor",
      detalhes: error.message,
    });
  }
});

// Rota para formatar CPF
app.post("/formatar", (req, res) => {
  const { cpf } = req.body;

  if (!cpf) {
    return res.status(400).json({
      erro: "CPF é obrigatório",
      exemplo: { cpf: "12345678901" },
    });
  }

  try {
    const cpfLimpo = cpf.replace(/[^\d]/g, "");

    if (cpfLimpo.length !== 11) {
      return res.status(400).json({
        erro: "CPF deve ter 11 dígitos",
      });
    }

    res.json({
      cpfOriginal: cpf,
      cpfFormatado: formatarCPF(cpfLimpo),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro interno do servidor",
      detalhes: error.message,
    });
  }
});

// Rota para gerar CPF válido
app.get("/gerar", (req, res) => {
  try {
    // Gera os primeiros 9 dígitos aleatoriamente
    let cpf = "";
    for (let i = 0; i < 9; i++) {
      cpf += Math.floor(Math.random() * 10);
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digito1 = resto < 2 ? 0 : resto;
    cpf += digito1;

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digito2 = resto < 2 ? 0 : resto;
    cpf += digito2;

    res.json({
      cpf: cpf,
      cpfFormatado: formatarCPF(cpf),
      valido: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro interno do servidor",
      detalhes: error.message,
    });
  }
});

// Middleware para tratar rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    erro: "Endpoint não encontrado",
    endpoints_disponiveis: [
      "GET /",
      "POST /validar",
      "POST /formatar",
      "GET /gerar",
    ],
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Acesse: http://localhost:${PORT}`);
});

module.exports = app;
