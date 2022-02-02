export namespace marktguru {
    export type Retailer = 'lidl'|'netto-marken-discount'|'aldi-sued'|'aldi-nord'|'penny'|'norma'|string;

    export type Config = {
        config: {
            apiKey: string,
            clientKey: string
        }
    }

    export type Brand = {
        uniqueName: string,
        indexOffer: boolean,
        indexLeaflet: boolean,
        id: number,
        name: string,
        industryId: number
    }

    export type Advertiser = {
        uniqueName: Retailer,
        indexOffer: boolean,
        indexLeaflet: boolean,
        id: string,
        name: string,
        industryId: number
    }

    export type Category = {
        uniqueName: string|null,
        indexOffer: boolean,
        indexLeaflet: boolean,
        id: number,
        name: string,
        description: string,
        parentId: number
    }

    export type ValidityDates = {
        from: string,
        to: string
    }

    export type Industry = {
        id: number,
        name: string
    }

    export type Product = {
        id: number,
        name: string,
        description: string|null
    }

    export type Unit = {
        shortName: string,
        id: number,
        name: string
    }

    export type ImageMetadata = {
        aspectRatio: number,
        height: number,
        width: number,
    }

    export type Images = {
        count: number,
        metadata: ImageMetadata[],
        urls: {
            small: string,
            medium: string,
            large: string
        }
    }

    export type Offer = {
        brand: Brand,
        advertisers: Advertiser[],
        categories: Category[],
        id: number,
        description: string,
        price: number,
        oldPrice: number|null,
        referencePrice: number,
        requiresLoyalityMembership: boolean,
        leafletFlightId: number,
        validityDates: ValidityDates[],
        externalId: number|null,
        externalTrackingUrls: string[],
        externalUrl: string|null,
        trackFlightImpression: null,
        type: 'standard',
        industries: Industry[],
        product: Product,
        unit: Unit,
        images: Images,
        imageType: 'offer'
    }

    export type SearchOptions = {
        allowedRetailers?: Retailer[],
        limit?: number,
        offset?: number,
        zipCode?: number
    }
}