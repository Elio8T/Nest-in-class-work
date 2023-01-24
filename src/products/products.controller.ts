import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Post()

    addProduct(@Body('title') prodTitle: string, 
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    ) {
        const generatedID = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedID};
    }

    @Get()
    getAllProducts(){
        return this.productsService.getProducts(); 
    }

    @Get(':id')
    getProduct(){

    }
//https://www.youtube.com/watch?v=F_oOtaxb0L8 51:27


}
