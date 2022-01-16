"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const axios_1 = __importDefault(require("axios"));
const allowedRetailers = ['lidl', 'real', 'aldi-sued', 'netto-marken-discount', 'edeka'];
/**
 * Get the keys to communicate with the marktguru api
 */
const getKeys = () => __awaiter(void 0, void 0, void 0, function* () {
    const regex = /<script\stype="application\/json">(.*?)<\/script>/gm;
    const { data } = yield axios_1.default.get('https://marktguru.de');
    let m, configStr = '';
    while ((m = regex.exec(data)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        // The result can be accessed through the `m`-variable.
        configStr = m[1];
    }
    if (configStr.length > 0) {
        const marktguruConfig = JSON.parse(configStr);
        if (marktguruConfig) {
            return {
                apiKey: marktguruConfig.config.apiKey,
                clientKey: marktguruConfig.config.clientKey
            };
        }
        else {
            throw new Error('Could not parse remote data');
        }
    }
    else {
        throw new Error('No remote data');
    }
});
/**
 * Get the created axios client
 */
const getClient = () => __awaiter(void 0, void 0, void 0, function* () {
    const keys = yield getKeys();
    return axios_1.default.create({
        baseURL: 'https://api.marktguru.de/api/v1',
        headers: {
            'x-apikey': keys.apiKey,
            'x-clientkey': keys.clientKey
        }
    });
});
/**
 * Search for any products
 * @param {String} query
 */
const search = (query = '') => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield getClient();
    const res = yield client.get('offers/search', {
        params: {
            as: 'web',
            limit: 1000,
            offset: 0,
            q: query,
            zipCode: 47249
        }
    });
    return res.data.results.filter((result) => result.advertisers.find(advertiser => allowedRetailers.includes(advertiser.uniqueName)));
});
exports.search = search;
