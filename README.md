# Unofficial Marktguru library

A library to search for offers on [marktguru.de](https://marktguru.de).

## Usage

```ts
import { search } from 'marktguru';

const doSearch = async () => {
    try {
        const query = 'Cola';
        const offers = await search(query);
    } catch (error) {
        // error is an axios error, see https://axios-http.com/docs/handling_errors for more infos
        console.error(error);
    }
}
```

How an Offer object looks like, you can see [here](src/@types/marktguru.d.ts) on Line 70

## Tests

```bash
$ npm run test
```