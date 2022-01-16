const { search } = require('../src/index');

test('search for `Cola`', async () => {
    const offers = await search('Cola');

    expect(offers).toBeInstanceOf(Array);

    for (let i = 0; i < offers.length; i += 1) {
        const offer = offers[i];

        expect(offer).toHaveProperty('price');
    }
});

test('search for `Cola Light`', async () => {
    const offers = await search('Cola Light');

    expect(offers).toBeInstanceOf(Array);

    for (let i = 0; i < offers.length; i += 1) {
        const offer = offers[i];

        expect(offer).toHaveProperty('price');
    }
});