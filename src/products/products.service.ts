import {Injectable, NotFoundException} from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number ){
        const prodID = Math.random().toString()
        price = 1
        title = 'new prod'
        desc = "this description"
        const newProduct = new Product(prodID, title, desc, price)
        this.products.push(newProduct);
        return prodID;

    }

    getProducts(){
        return [...this.products];
    }

    getSingleProduct(productId: string){
        const product = this.findProduct(productId)[0];
        return {...product};
    }


    updateProduct(productId: string, title: string, desc: string, price: number){
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product};
        if(title){
            updatedProduct.title = title;
        }
        if(desc){
            updatedProduct.desc = desc;
        }
        if(price){
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }
    private findProduct(id: string): [Product, number]{
        const productIndex = this.products.findIndex((prod) => prod.id === Id);
        const product = this.products[productIndex];
        if (!product){
            throw new NotFoundException('could not find');
        }
        return [product, productIndex];
    }

}