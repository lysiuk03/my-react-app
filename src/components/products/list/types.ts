
import {ICategoryItem} from "../../categories/list/types.ts";

export interface IProductImage {
    name: string;
}

export interface IProductItem {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: ICategoryItem;
    product_images: IProductImage[];
}