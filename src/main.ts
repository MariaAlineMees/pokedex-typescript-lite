import { PokeApiService } from "./services/PokeApiService.js";
import { CatalogoPokemon } from "./services/BoxService.js";

async function main() {
    const apiService = new PokeApiService();
    const catalogo = new CatalogoPokemon();

    console.log("=========================================");
    console.log("🦊 INICIANDO POKÉDEX TYPESCRIPT LITE 🦊");
    console.log("=========================================\n");

    // 1. Inicializa o catálogo lendo o arquivo pc_box.json se ele já existir
    await catalogo.inicializar();

    // 2. Testando Busca e Adição 
    console.log("--- 1. TESTANDO BUSCA VÁLIDA ---");
    const pikachu = await apiService.buscarPokemon("pikachu");
    if (pikachu !== null) {
        await catalogo.adicionar(pikachu); 
    }

    const charmander = await apiService.buscarPokemon("charmander");
    if (charmander !== null) {
        await catalogo.adicionar(charmander); 
    }

    // 3. Testando Duplicidade
    console.log("\n--- 2. TESTANDO DUPLICIDADE ---");
    const pikachuDuplicado = await apiService.buscarPokemon("pikachu");
    if (pikachuDuplicado !== null) {
        await catalogo.adicionar(pikachuDuplicado); 
    }

    // 4. Testando Listagem
    console.log("\n--- 3. TESTANDO LISTAGEM DO CATÁLOGO ---");
    catalogo.listar();

    // 5. Testando Remoção (agora com await)
    console.log("\n--- 4. TESTANDO REMOÇÃO ---");
    await catalogo.remover(25); 
    
    console.log("\n--- LISTAGEM APÓS REMOÇÃO ---");
    catalogo.listar();
}

main();