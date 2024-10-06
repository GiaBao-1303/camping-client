export interface IProductTyoe {
    name: string;
    price: string;
    color?: string;
    amount: string;
    // ...
}

export interface IOffer {
    _id: string;
    minPrice: number;
    offer: number;
    // ...
}

export interface IProduct {
    _id: string;
    name: string;
    imageUrl: string;
    type: Array<string>;
}
