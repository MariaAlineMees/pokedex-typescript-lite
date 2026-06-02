import type { PokemonResumo } from "../models/Pokemon.js";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export class CatalogoPokemon {
  private pokemons: PokemonResumo[] = [];

  private caminhoArquivo = join(process.cwd(), "pc_box.json");

  async inicializar(): Promise<void> {
    try {
      const dados = await readFile(this.caminhoArquivo, "utf-8");
      this.pokemons = JSON.parse(dados);
    } catch (erro) {
      this.pokemons = [];
    }
  }

  private async salvarNoArquivo(): Promise<void> {
    await writeFile(this.caminhoArquivo, JSON.stringify(this.pokemons, null, 2), "utf-8");
  }

  async adicionar(pokemon: PokemonResumo): Promise<void> {
    const jaExiste = this.pokemons.some((item) => item.id === pokemon.id);

    if (jaExiste) {
      console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
      return;
    }

    this.pokemons.push(pokemon);
    console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);

    await this.salvarNoArquivo();
  }

  listar(): void {
    if (this.pokemons.length === 0) {
      console.log("[⚠️] Catálogo vazio.");
      return;
    }

    this.pokemons.sort((a, b) => a.id - b.id);

    console.log("\n" + "=".repeat(85));
    console.log(
      `|🆔 ID | 🏷️ Nome      | 🧬 Tipos              | ❤️ HP | ⚔️ ATK|📏Alt |⚖️ Peso |`
    );
    console.log("-".repeat(85));

    this.pokemons.forEach((p) => {

      console.log(
        `| #${p.id.toString().padEnd(3)} | ${p.nome.padEnd(12)} | ${p.tipos.join(", ").padEnd(20)} | ${p.hp.toString().padEnd(4)} | ${p.ataque.toString().padEnd(4)} | ${p.altura.toString().padEnd(4)} | ${p.peso.toString().padEnd(6)} |`
      );
    });
    console.log("=".repeat(85) + "\n");
  }

  async remover(id: number): Promise<void> {
    const existe = this.pokemons.some((pokemon) => pokemon.id === id);

    if (!existe) {
      console.log("[AVISO] Nenhum Pokémon encontrado com esse ID.");
      return;
    }

    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    console.log("[OK] Pokémon removido do catálogo.");

    await this.salvarNoArquivo();
  }
}