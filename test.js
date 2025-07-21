const http = require("http");

// Função para fazer requisições HTTP
function fazerRequisicao(opcoes, dados = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(opcoes, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          resolve({
            statusCode: res.statusCode,
            data: JSON.parse(body),
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            data: body,
          });
        }
      });
    });

    req.on("error", reject);

    if (dados) {
      req.write(JSON.stringify(dados));
    }

    req.end();
  });
}

// Função para executar testes
async function executarTestes() {
  console.log("🧪 Iniciando testes da API de Validação de CPF\n");

  const baseUrl = {
    hostname: "localhost",
    port: 3000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // Teste 1: Rota principal
    console.log("📋 Teste 1: Rota principal (GET /)");
    const teste1 = await fazerRequisicao({
      ...baseUrl,
      path: "/",
      method: "GET",
    });
    console.log(`Status: ${teste1.statusCode}`);
    console.log(`Resposta:`, teste1.data);
    console.log("✅ Teste 1 concluído\n");

    // Teste 2: Validar CPF válido
    console.log("📋 Teste 2: Validar CPF válido");
    const teste2 = await fazerRequisicao(
      {
        ...baseUrl,
        path: "/validar",
        method: "POST",
      },
      { cpf: "11144477735" }
    );
    console.log(`Status: ${teste2.statusCode}`);
    console.log(`Resposta:`, teste2.data);
    console.log("✅ Teste 2 concluído\n");

    // Teste 3: Validar CPF inválido
    console.log("📋 Teste 3: Validar CPF inválido");
    const teste3 = await fazerRequisicao(
      {
        ...baseUrl,
        path: "/validar",
        method: "POST",
      },
      { cpf: "12345678901" }
    );
    console.log(`Status: ${teste3.statusCode}`);
    console.log(`Resposta:`, teste3.data);
    console.log("✅ Teste 3 concluído\n");

    // Teste 4: Validar CPF com formatação
    console.log("📋 Teste 4: Validar CPF formatado");
    const teste4 = await fazerRequisicao(
      {
        ...baseUrl,
        path: "/validar",
        method: "POST",
      },
      { cpf: "111.444.777-35" }
    );
    console.log(`Status: ${teste4.statusCode}`);
    console.log(`Resposta:`, teste4.data);
    console.log("✅ Teste 4 concluído\n");

    // Teste 5: Formatar CPF
    console.log("📋 Teste 5: Formatar CPF");
    const teste5 = await fazerRequisicao(
      {
        ...baseUrl,
        path: "/formatar",
        method: "POST",
      },
      { cpf: "11144477735" }
    );
    console.log(`Status: ${teste5.statusCode}`);
    console.log(`Resposta:`, teste5.data);
    console.log("✅ Teste 5 concluído\n");

    // Teste 6: Gerar CPF
    console.log("📋 Teste 6: Gerar CPF válido");
    const teste6 = await fazerRequisicao({
      ...baseUrl,
      path: "/gerar",
      method: "GET",
    });
    console.log(`Status: ${teste6.statusCode}`);
    console.log(`Resposta:`, teste6.data);
    console.log("✅ Teste 6 concluído\n");

    // Teste 7: Validar CPF sem enviar dados
    console.log("📋 Teste 7: Validar sem enviar CPF (erro 400)");
    const teste7 = await fazerRequisicao(
      {
        ...baseUrl,
        path: "/validar",
        method: "POST",
      },
      {}
    );
    console.log(`Status: ${teste7.statusCode}`);
    console.log(`Resposta:`, teste7.data);
    console.log("✅ Teste 7 concluído\n");

    // Teste 8: Rota inexistente
    console.log("📋 Teste 8: Rota inexistente (erro 404)");
    const teste8 = await fazerRequisicao({
      ...baseUrl,
      path: "/inexistente",
      method: "GET",
    });
    console.log(`Status: ${teste8.statusCode}`);
    console.log(`Resposta:`, teste8.data);
    console.log("✅ Teste 8 concluído\n");

    console.log("🎉 Todos os testes foram executados!");
  } catch (error) {
    console.error("❌ Erro durante os testes:", error.message);
    console.log(
      "\n💡 Dica: Verifique se o servidor está rodando na porta 3000"
    );
    console.log("Execute: npm start ou node server.js");
  }
}

// Executa os testes se o arquivo for chamado diretamente
if (require.main === module) {
  executarTestes();
}

module.exports = { executarTestes };
