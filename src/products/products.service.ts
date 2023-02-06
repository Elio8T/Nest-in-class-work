import {Injectable, NotFoundException} from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService{
    private products: Product[] = [];
//https://www.youtube.com/watch?v=ulfU5vY6I78 13:32
    constructor(@InjectModel('Product') private readonly productModel: Model<>) {}


    insertProduct(title: string, desc: string, price: number ){
        const prodID = Math.random().toString()
        
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


    deleteProduct(prodId: string){
        const index = this.findProduct(prodId)[1];
        this.products.splice(index,1);
    }

    private findProduct(id: string): [Product, number]{
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if (!product){
            throw new NotFoundException('could not find');
        }
        return [product, productIndex];
    }

    

}