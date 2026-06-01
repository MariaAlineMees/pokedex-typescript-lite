import type { PokemonApiResponse, PokemonResumo } from "../models/Pokemon.js";

export class PokeApiService {
    async buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
        try {
            const buscaFormatada = nomeOuId.toString().trim().toLowerCase();
            const url = `https://pokeapi.co/api/v2/pokemon/${buscaFormatada}`;

            const resposta = await fetch(url);

            if (!resposta.ok) {
                console.log(`[ERRO] Pokémon não encontrado: ${nomeOuId}`);
                return null;
            }

            const dados = await resposta.json() as PokemonApiResponse;

            const tiposMapeados = dados.types.map((item) => item.type.name);

            const pokemonMapeado: PokemonResumo = {
                id: dados.id,
                nome: dados.name,
                tipos: tiposMapeados,
                altura: dados.height,
                peso: dados.weight
            };

            return pokemonMapeado;

        } catch (erro) {
            
            console.log("[ERRO] Não foi possível buscar o Pokémon.");
            return null;
        }
        
    }
}