import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Post()

    async addProduct(@Body('title') prodTitle: string, 
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
    ) {
        const generatedID = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedID};
    }

    @Get()
    async getAllProducts(){
        const products = await this.productsService.getProducts(); 
        return products;
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string){
        return this.productsService.getSingleProduct(prodId);

    }
//https://www.youtube.com/watch?v=F_oOtaxb0L8 1:03:22




    @Patch(':id')
    async updateProduct(@Param('id') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number){
        await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }   

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string,){
        await this.productsService.deleteProduct(prodId);
        return null;
    }
}
