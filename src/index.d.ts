import { marktguru } from "./@types/marktguru";

export function search(query: string): Promise<marktguru.Offer[]>