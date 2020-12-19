import { Product } from "./product";

export class CartItem {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;

    constructor(product: Product){
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.imageUrl = product.imageUrl;
        this.quantity = 1;
    }
}
