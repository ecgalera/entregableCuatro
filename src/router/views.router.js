import {Router} from "express";
// import ProductManager from "../manager/productManager";

const router = Router();

router.get("/",(req,res)=>{
    res.render("realTimeProducts" ,{
        css: "home"})
})


    export default router;
