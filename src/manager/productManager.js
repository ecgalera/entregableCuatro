import fs from "fs";
import __dirname from "../utils.js";

export default class ProductManager{
    constructor(){
        this.path = `${__dirname}/files/products.json`;
        this.init();
    }

    init = async () =>{
        if(!fs.existsSync(this.path)){
            await fs.promises.writeFile(this.path, JSON.stringify([]))
        }
    };

    getProducts = async () =>{
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
    };

    addProduct = async (product) =>{
        const products = await this.getProducts();
        product.id = products.length === 0 ? 1 : products[products.length-1].id +1;
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
        return product
    };

    getProductById = async (_id) =>{
            const data = await this.getProducts();
            const productById = data.find(p => p.id === _id);
            if(productById){return productById;
            }else{
                console.log("Product not found");
                return null;
            }
    };

    deleteProduct = async (_id) =>{
            const products = await this.getProducts();
            const productIndex = products.findIndex(u => u.id === _id);
            products.splice(productIndex,1)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
    };

}
