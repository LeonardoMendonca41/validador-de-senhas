# Validador de Senhas

Validador de senhas feito em HTML, CSS e JavaScript para a disciplina de Teoria de Linguagens (IFMG). Projeto: **Além da Senha: Validação e Segurança Digital**.

A senha é tratada como uma palavra de uma linguagem regular. O programa decide se a palavra pertence a essa linguagem usando uma expressão regular.

## Como usar

Não precisa instalar nada.

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` no navegador.
3. Digite uma senha. Os requisitos ficam verdes (✔) ou vermelhos (✘) enquanto você digita, e o resultado mostra se a senha foi aceita ou rejeitada.

```bash
git clone https://github.com/LeonardoMendonca41/validador-de-senhas.git
cd validador-de-senhas
# abra index.html no navegador
```

## Regras

| Item | Regra |
|------|-------|
| Alfabeto | `A-Z`, `a-z`, `0-9` e os símbolos `! @ # $ % & *` |
| Tamanho | de 8 a 20 caracteres |
| Obrigatório | 1 maiúscula, 1 minúscula, 1 número e 1 símbolo |
| Proibido | espaços, acentos e qualquer caractere fora do alfabeto |

## Expressão regular

```
^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*])[A-Za-z0-9!@#$%&*]{8,20}$
```

As quatro partes `(?=...)` são lookaheads. Cada uma exige um tipo de caractere. A parte final limita o alfabeto e o tamanho.

## Estrutura

```
.
├── index.html       # estrutura da página
├── style.css        # aparência
├── script.js        # regex e lógica de validação
└── README.md
```

## Uso em testes automáticos (Node)

O `script.js` também funciona fora do navegador e exporta `REGEX_SENHA`, `REQUISITOS`, `validar` e `caracteresProibidos`:

```js
const { validar } = require("./script.js");

validar("Senha123!").valida; // true
validar("senha123!").valida; // false (sem maiúscula)
```

## Aviso

Passar na validação não significa que a senha é segura. `Senha123!` é aceita, mas é previsível. `vT8!pQ4#zL` também é aceita e é muito mais difícil de adivinhar.


