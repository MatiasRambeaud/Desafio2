import fs from 'fs';
import __dirname from '../utils.js';

const PATH = `${__dirname}/products/products.json`;

export default class ProductsManager {
    
    constructor(){
        this.init();
    }

    async init(){
        if(fs.existsSync(PATH)){}
        else await fs.promises.writeFile(PATH,JSON.stringify([]));
    }

    async getProducts() {
        const data = await fs.promises.readFile(PATH,'utf-8');
        return JSON.parse(data);
    }

    async addProducts(product){
        const products = await this.getProducts();
        if(products.length===0){
            product.id = 1;
        }else {
            product.id = products[products.length-1].id+1;
        }
        products.push(product);
        await fs.promises.writeFile(PATH,JSON.stringify(products,null,'\t'));
        return product.id;
    }

    async deleteProducts(id){
        const productsData = await fs.promises.readFile(PATH, 'utf-8');
        const products = JSON.parse(productsData);

        products.forEach(product => {
            if(id===product.id){
                products.splice(products.indexOf(product),1);
           }
        });
        await fs.promises.writeFile(PATH, JSON.stringify(products, null, 4));
        return;
    }
}
