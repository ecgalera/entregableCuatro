import { Router } from "express";
import ProductManager from "../manager/productManager.js";

const router = Router();

// instaciamos la class ProductManager:
const productService = new ProductManager();

// construimos las rutas:
router.get("/", async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.send({ status: "success", payload: products })
    } catch (error) {
        res
            .status(500)
            .send({status: "error", error: "Error al obtener los productos"})
    }
});

router.post("/", async(req, res)=>{
    const {title, price, description, stock, category}= req.body;
    if(!title || !price || !description || !stock || !category){
        return res  
                    .status(400)
                    .send({status: "error", error: "Valores incompletos"})
    };
    const product= {
        title,
        price,
        description,
        stock,
        category
    };

    const result = await productService.addProduct(product);
    const products = await productService.getProducts();
    req.io.emit("products", products);
    res.status(201).send({status: "success", payload: result})
});

router.delete("/", async(req, res)=>{
    const result = await productService.deleteProduct(req.params.id)
    const products = await productService.getProducts();
    req.io.emit("products", products);
    res.status(201).send({status: "success", payload: result})
})


export default router