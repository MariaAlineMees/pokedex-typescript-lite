import { createInterface } from "readline/promises";
import { stdin as entradaTeclado, stdout as saidaTela } from "process";
import { PokeApiService } from "../services/PokeApiService.js";
import { CatalogoPokemon } from "../services/BoxService.js";

export class TerminalController {
    private apiService = new PokeApiService();
    private catalogo = new CatalogoPokemon();

    async iniciar(): Promise<void> {
        await this.catalogo.inicializar();


        const leitorTerminal = createInterface({ input: entradaTeclado, output: saidaTela });
        let programaDeveContinuar = true;

        while (programaDeveContinuar) {
            console.log("\n=========================================");
            console.log("             MENU POKÉDEX                ");
            console.log("=========================================");
            console.log("[1] Buscar e Adicionar Pokémon");
            console.log("[2] Listar Catálogo");
            console.log("[3] Remover Pokémon do Catálogo");
            console.log("[0] Sair do Programa");
            console.log("=========================================");


            const opcaoEscolhida = await leitorTerminal.question("Escolha uma opção: ");

            switch (opcaoEscolhida) {
                case "1":
                    const nomeOuIdDigitado = await leitorTerminal.question("\nDigite o nome ou ID do Pokémon: ");

                    const pokemonEncontrado = await this.apiService.buscarPokemon(nomeOuIdDigitado.toLowerCase().trim());

                    if (pokemonEncontrado) {
                        await this.catalogo.adicionar(pokemonEncontrado);
                    }
                    break;

                case "2":
                    console.log("");
                    this.catalogo.listar();
                    break;

                case "3":
                    const idDigitadoParaRemover = await leitorTerminal.question("\nDigite o ID do Pokémon para remover: ");
                    const idComoNumero = parseInt(idDigitadoParaRemover);

                    if (isNaN(idComoNumero)) {
                        console.log("[ERRO] ID inválido. Digite um número válido.");
                    } else {
                        await this.catalogo.remover(idComoNumero);
                    }
                    break;

                case "0":
                    console.log("\nSaindo... Até a próxima, mestre Pokémon!");
                    programaDeveContinuar = false;
                    leitorTerminal.close();
                    break;

                default:
                    console.log("\n[ERRO] Opção inválida. Tente novamente.");
            }
        }
    }
}