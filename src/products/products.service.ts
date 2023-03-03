import {Injectable, NotFoundException} from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class ProductsService{
    
//https://www.youtube.com/watch?v=ulfU5vY6I78 13:32
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}


    async insertProduct(title: string, desc: string, price: number ){
       
        
        const newProduct = new this.productModel({
            title, 
            desc: desc, 
            price,
        });
        const result = await  newProduct.save();
        return result.id as string;
        //return prodID;

    }

    async getProducts(){
       const products = await  this.productModel.find().exec();
    
        return products.map((prod) => ({id: prod.id, title: prod.title, desc: prod.desc, price: prod.price}));
    }

    async getSingleProduct(productId: string){
        const product = await this.findProduct(productId);
        return {id: product.id, title: product.title, desc: product.desc, price: product.price};
    }

//31:42
    async updateProduct(productId: string, title: string, desc: string, price: number){
        const updatedProduct = await this.findProduct(productId);
        
        if(title){
            updatedProduct.title = title;
        }
        if(desc){
            updatedProduct.desc = desc;
        }
        if(price){
            updatedProduct.price = price;
        }
        updatedProduct.save();
    }


    async deleteProduct(prodId: string){
        const result = await this.productModel.deleteOne({_id: prodId}).exec;
        if (result.length ===0){
            throw new NotFoundException('could not find');
        }
    }
    private async findProduct(id: string): Promise<Product>{
        let product;
        try{
        product = await this.productModel.findById(id).exec;
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!product){
            throw new NotFoundException('could not find');
        }
        return product;
    }

    

}