# Unofficial Marktguru library

A library to search for offers on [marktguru.de](https://marktguru.de).

## Usage

```ts
import { search } from 'marktguru';

const doSearch = async () => {
    try {
        const query = 'Cola';
        const offers = await search(query, { limit: 10 });
    } catch (error) {
        // error is an axios error, see https://axios-http.com/docs/handling_errors for more infos
        console.error(error);
    }
}
```

### SearchOptions

| Key              | Description                                                                               | Default |
|------------------|-------------------------------------------------------------------------------------------|---------|
| limit            | Set the limit of offers to receive                                                        | 1000    |
| offset           | Skip as many offers as offset is set                                                      | 0       |
| allowedRetailers | An array of retailers. See [here](src/@types/marktguru.d.ts) on line 2 for some retailers | []      |
| zipCode          | The zip code of area/city where to search for offers                                      | 60487   |

### Offer

How an Offer object looks like, you can see [here](src/@types/marktguru.d.ts) on line 77

## Tests

```bash
$ npm run test
```