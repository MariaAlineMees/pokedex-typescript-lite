# Pokédex TypeScript Lite

## Sobre o projeto
O Pokédex TypeScript Lite é uma aplicação simples em Node.js com TypeScript que consulta dados de Pokémon na PokeAPI e organiza alguns resultados em um catálogo local durante a execução do programa.

## Objetivo
Praticar os principais conceitos do desenvolvimento back-end:
- Node.js e JavaScript no back-end
- TypeScript (tipagem, interfaces, classes)
- Manipulação de arrays e objetos (JSON)
- Consumo de APIs externas (fetch, async/await)
- Tratamento de erros (try/catch)
- Versionamento e organização (Git, GitHub, GitFlow, Kanban)

## Tecnologias utilizadas
- Node.js
- TypeScript
- TSX
- PokeAPI
- Git e GitHub

## Pré-requisitos
Antes de executar o projeto, é necessário ter instalado:
- Node.js
- npm
- Git

## Como instalar

1. Clone o repositório:
```bash
git clone [https://github.com/MariaAlineMees/pokedex-typescript-lite.git](https://github.com/MariaAlineMees/pokedex-typescript-lite.git)
```

2. Acesse a pasta do projeto:
```bash
cd pokedex-typescript-lite
```

3. Instale as dependências:
```bash
npm install
```

## Como executar
Execute o projeto em ambiente de desenvolvimento:
```bash
npm run dev
```

## Estrutura do projeto
```text
pokedex-typescript-lite/
├── src/
│   ├── models/
│   │   └── Pokemon.ts
│   ├── services/
│   │   ├── BoxService.ts
│   │   └── PokeApiService.ts
│   └── main.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Funcionalidades
- [x] Buscar Pokémon por nome ou ID
- [x] Tratar erro de Pokémon inexistente
- [x] Transformar resposta da API em objeto simplificado
- [x] Adicionar Pokémon ao catálogo local
- [x] Impedir Pokémon duplicado
- [x] Listar catálogo
- [x] Remover Pokémon por ID
- [x] Exibir mensagens no terminal

## Exemplos de execução

### Busca válida
**Entrada testada:**
`pikachu` e `charmander`

**Saída obtida:**
```text
[OK] pikachu adicionado ao catálogo.
[OK] charmander adicionado ao catálogo.
```

### Duplicidade
**Entrada testada:**
adicionar `pikachu` duas vezes

**Saída obtida:**
```text
[AVISO] pikachu já está no catálogo.
```

### Busca inválida
**Entrada testada:**
`pokemon-inexistente`

**Saída obtida:**
```text
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

### Listagem
**Saída obtida:**
```text
Catálogo atual:
#25 pikachu | Tipos: electric | Altura: 4 | Peso: 60
#4 charmander | Tipos: fire | Altura: 6 | Peso: 85
```

### Remoção
**Entrada testada:**
remover ID `25`

**Saída obtida:**
```text
[OK] Pokémon removido do catálogo.

--- LISTAGEM APÓS REMOÇÃO ---
Catálogo atual:
#4 charmander | Tipos: fire | Altura: 6 | Peso: 85
```

## Conceitos aplicados

### TypeScript
A tipagem forte foi garantida através do uso de `Interfaces` para mapear os objetos esperados. As funções possuem parâmetros tipados (ex: `nomeOuId: string`, `pokemon: PokemonResumo`) e retornos explícitos (`Promise<PokemonResumo | null>`, `void`).

### Interface PokemonResumo
A interface `PokemonResumo` foi projetada para atuar como o molde da nossa entidade principal, isolando apenas as informações úteis que o catálogo precisa armazenar (ID, nome, tipos, altura e peso), descartando o excesso de dados vindos da API.

### Fetch e async/await
A integração com a PokeAPI foi implementada na classe `PokeApiService`. A função `buscarPokemon` é assíncrona (`async`), utilizando `await fetch()` para realizar a requisição HTTP nativa e aguardar a resposta sem travar a execução do Node.js.

### Tratamento de erros
O bloco `try/catch` protege a aplicação contra falhas de rede. Além disso, utilizamos a verificação `!resposta.ok` para interceptar retornos 404 da API (quando o usuário digita um Pokémon que não existe), garantindo que o programa apenas exiba o aviso no terminal e retorne `null` ao invés de quebrar o servidor.

### Métodos de array
- `map`: Utilizado para percorrer o array de tipos retornado pela API e extrair apenas a string do nome do tipo.
- `some`: Utilizado como verificador lógico para impedir a adição de Pokémon com IDs duplicados na lista.
- `forEach`: Utilizado para iterar sobre o catálogo e imprimir os dados organizados de cada Pokémon.
- `filter`: Utilizado no método de remoção para reconstruir o array do catálogo excluindo o ID especificado.

### Classe CatalogoPokemon
A classe centraliza as regras de negócio de persistência em memória. Possui o atributo `pokemons` protegido pelo modificador de acesso `private` (garantindo o encapsulamento), que só pode ser manipulado pelos métodos internos `adicionar`, `listar` e `remover`.

## Organização do Kanban
Link do Kanban: https://github.com/users/MariaAlineMees/projects/1/views/1

## Branches utilizadas
- `main`
- `develop`
- `feat/pokedex`
- `docs/readme`

## Melhorias futuras
- Criar menu interativo no terminal
- Salvar catálogo em arquivo JSON
- Exibir HP, ataque e defesa
- Criar filtros por tipo de Pokémon
- Criar uma API própria com Express