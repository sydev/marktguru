import axios from 'axios';

import { marktguru } from "./@types/marktguru";

const allowedRetailers = ['lidl', 'real', 'aldi-sued', 'netto-marken-discount', 'edeka'];

/**
 * Get the keys to communicate with the marktguru api
 */
const getKeys = async (): Promise<{ apiKey: string, clientKey: string }> => {
    const regex = /<script\stype="application\/json">(.*?)<\/script>/gm;
    const { data } = await axios.get('https://marktguru.de');

    let m,
        configStr: string = '';
    while ((m = regex.exec(data)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        configStr = m[1];
    }

    if (configStr.length > 0) {
        const marktguruConfig = JSON.parse(configStr) as marktguru.Config;

        if (marktguruConfig) {
            return {
                apiKey: marktguruConfig.config.apiKey,
                clientKey: marktguruConfig.config.clientKey
            };
        } else {
            throw new Error('Could not parse remote data');
        }
    } else {
        throw new Error('No remote data');
    }
}

/**
 * Get the created axios client
 */
const getClient = async () => {
    const keys = await getKeys();

    return axios.create({
        baseURL: 'https://api.marktguru.de/api/v1',
        headers: {
            'x-apikey': keys.apiKey,
            'x-clientkey': keys.clientKey
        }
    });
}

/**
 * Search for any products
 * @param {String} query
 */
export const search = async (query = ''): Promise<marktguru.Offer[]> => {
    const client = await getClient();

    const res = await client.get('offers/search', {
        params: {
            as: 'web',
            limit: 1000,
            offset: 0,
            q: query,
            zipCode: 47249
        }
    });

    return res.data.results.filter((result: marktguru.Offer) => result.advertisers.find(advertiser => allowedRetailers.includes(advertiser.uniqueName)));
}