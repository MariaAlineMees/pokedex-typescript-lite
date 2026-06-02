import { PokeApiService } from "./services/PokeApiService.js";
import { CatalogoPokemon } from "./services/BoxService.js";

async function main() {
    // 1. Instanciamos os serviços
    const apiService = new PokeApiService();
    const catalogo = new CatalogoPokemon();

    console.log("=========================================");
    console.log("🦊 INICIANDO POKÉDEX TYPESCRIPT LITE 🦊");
    console.log("=========================================\n");

    // 2. Testando Busca Válida
    console.log("--- 1. TESTANDO BUSCA VÁLIDA ---");
    const pikachu = await apiService.buscarPokemon("pikachu");
    if (pikachu !== null) {
        catalogo.adicionar(pikachu);
    }

    const charmander = await apiService.buscarPokemon("charmander");
    if (charmander !== null) {
        catalogo.adicionar(charmander);
    }

    // 3. Testando Duplicidade
    console.log("\n--- 2. TESTANDO DUPLICIDADE ---");
    const pikachuDuplicado = await apiService.buscarPokemon("pikachu");
    if (pikachuDuplicado !== null) {
        catalogo.adicionar(pikachuDuplicado); 
    }

    // 4. Testando Busca Inválida
    console.log("\n--- 3. TESTANDO BUSCA INVÁLIDA ---");
    await apiService.buscarPokemon("pokemon-inexistente"); 

    // 5. Testando Listagem
    console.log("\n--- 4. TESTANDO LISTAGEM DO CATÁLOGO ---");
    catalogo.listar();

    // 6. Testando Remoção
    console.log("\n--- 5. TESTANDO REMOÇÃO ---");
    catalogo.remover(25); 
    
    console.log("\n--- LISTAGEM APÓS REMOÇÃO ---");
    catalogo.listar();
}

main();