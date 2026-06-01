import type {PokemonResumo } from "../models/Pokemon.js";

export class CatalogoPokemon {

    private pokemons: PokemonResumo[] = [];

    adicionar(pokemon: PokemonResumo): void {

        const jaExiste = this.pokemons.some((item) => item.id === pokemon.id);

        if (jaExiste){
            console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
            return;
        }

        this.pokemons.push(pokemon);
        console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
    }
}