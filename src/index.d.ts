import { marktguru } from "./@types/marktguru";

/**
 * Search for offers
 * @param {String} query
 * @param {marktguru.SearchOptions} options
 */
export function search(query: string, options?: marktguru.SearchOptions): Promise<marktguru.Offer[]>