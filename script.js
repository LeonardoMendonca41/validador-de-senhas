// Regex completa do grupo (a mesma do teste_regex.py do Integrante 2),.
// Em JavaScript, "$" sem a flag "m" só casa no fim da string, então "\n" no final é rejeitado.
const REGEX_SENHA =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*])[A-Za-z0-9!@#$%&*]{8,20}$/;

// Uma Regex para cada requisito, usada só para mostrar o que foi atendido.
const REQUISITOS = {
  tamanho:   (s) => s.length >= 8 && s.length <= 20,
  maiuscula: (s) => /[A-Z]/.test(s),
  minuscula: (s) => /[a-z]/.test(s),
  numero:    (s) => /[0-9]/.test(s),
  simbolo:   (s) => /[!@#$%&*]/.test(s),
  alfabeto:  (s) => s.length > 0 && /^[A-Za-z0-9!@#$%&*]*$/.test(s),
};

function validar(senha) {
  const status = {};
  for (const [nome, teste] of Object.entries(REQUISITOS)) {
    status[nome] = teste(senha);
  }
  return { status, valida: REGEX_SENHA.test(senha) };
}

function caracteresProibidos(senha) {
  const set = new Set(senha.replace(/[A-Za-z0-9!@#$%&*]/g, ""));
  return [...set].map((c) => (c === " " ? "(espaço)" : c === "\n" ? "(quebra de linha)" : c));
}

// Permite reaproveitar validar() em testes automáticos (Node).
if (typeof document === "undefined") {
  module.exports = { REGEX_SENHA, REQUISITOS, validar, caracteresProibidos };
} else {
  const campo = document.getElementById("senha");
  const botaoMostrar = document.getElementById("mostrar");
  const contador = document.getElementById("contador");
  const resultado = document.getElementById("resultado");
  const detalhe = document.getElementById("detalhe");
  const itens = document.querySelectorAll("#requisitos li");

  function atualizar() {
    const senha = campo.value;
    contador.textContent = senha.length;

    if (senha === "") {
      itens.forEach((li) => li.classList.remove("ok", "erro"));
      resultado.className = "resultado neutro";
      resultado.textContent = "Digite uma senha para validar.";
      detalhe.textContent = "";
      return;
    }

    const { status, valida } = validar(senha);

    itens.forEach((li) => {
      const ok = status[li.dataset.req];
      li.classList.toggle("ok", ok);
      li.classList.toggle("erro", !ok);
    });

    resultado.className = "resultado " + (valida ? "valida" : "invalida");
    resultado.textContent = valida
      ? "Senha ACEITA (pertence à linguagem)"
      : "Senha REJEITADA (não pertence à linguagem)";

    const proibidos = caracteresProibidos(senha);
    detalhe.textContent = proibidos.length
      ? "Caracteres não permitidos: " + proibidos.join("  ")
      : "";
  }

  botaoMostrar.addEventListener("click", () => {
    const oculto = campo.type === "password";
    campo.type = oculto ? "text" : "password";
    botaoMostrar.textContent = oculto ? "Ocultar" : "Mostrar";
  });

  campo.addEventListener("input", atualizar);

  document.getElementById("regex-texto").textContent = REGEX_SENHA.source;
  atualizar();
}
