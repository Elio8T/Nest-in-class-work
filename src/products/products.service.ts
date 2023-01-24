import {Injectable} from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number ){
        const prodID = new Date().toString();
        const newProduct = new Product(prodID, title, desc, price)
        this.products.push(newProduct);
        return prodID;

    }

    getProducts(){
        return [...this.products];
    }

}