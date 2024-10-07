export interface IProduct {
    _id: string;
    name: string;
    productImageFiles: Array<{ _id: string; url: string }>;
    video: {
        _id: string;
        url: string;
    };
    category: string;
    description: string;
    length: {
        value: number;
        unit: string;
    };
    from: string;
    offers?: Array<{
        price_from: number;
        price_to: number;
        value: number;
    }>;
    address: string;
    weight: string;
    brand: string;
    productType: Array<{
        name: string;
        price: number;
        quantity: number;
    }>;
}
