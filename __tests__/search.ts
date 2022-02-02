import {search} from '../src/index';
import {marktguru} from "../src/@types/marktguru";

jest.setTimeout(10000);

const checkOffers = (offers: marktguru.Offer[]) => {
    expect(offers).toBeInstanceOf(Array);

    if (offers.length > 0) {
        for (let i = 0; i < offers.length; i += 1) {
            const offer = offers[i];

            expect(offer).toHaveProperty('price');
            expect(offer).toHaveProperty('images');
            expect(offer.images).toHaveProperty('urls');
            expect(offer.images.urls).toHaveProperty('small');
            expect(offer.images.urls).toHaveProperty('medium');
            expect(offer.images.urls).toHaveProperty('large');
        }
    }
}

test('search for `Cola`', async () => {
    const offers = await search('Cola');
    checkOffers(offers);
});

test('search for `Cola Light`', async () => {
    const offers = await search('Cola Light');
    checkOffers(offers);
});

test('search for `Cola` with options', async () => {
    const offers = await search('Cola', {
        limit: 10,
        offset: 0,
        allowedRetailers: ['lidl', 'aldi-nord', 'aldi-sued'],
        zipCode: 10115
    });

    checkOffers(offers);
});