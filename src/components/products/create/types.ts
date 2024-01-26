export interface IProductCreate {
    category_id:number;
    name: string;
    price:number;
    quantity:number;
    description:string;
    images: File[];
}