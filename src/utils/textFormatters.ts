export function capitalizarNome(nome: string): string {
  if (!nome) return "";
  return nome.charAt(0).toUpperCase() + nome.slice(1);
}

export function formatarTipos(tipos: string[]): string {
  return tipos.join(", ");
}

export function formatarPeso(pesoHectograma: number): string {
  const pesoKg = pesoHectograma / 10;
  return `${pesoKg.toFixed(1)} kg`;
}