import express from "express";
import ProductsService from "../managers/ProductsManager.js";

const router = express.Router();
const app = express();
const ProductsManager=new ProductsService();


app.use(express.urlencoded({extended:true}));
app.use(express.json());

router.get(`/products`,async(req,res)=>{
    const products = await ProductsManager.getProducts();
    res.render(`index`,{products:products});
})

router.get(`/realtimeproducts`,async(req,res)=>{
    const products = await ProductsManager.getProducts();
    res.render(`realTimeProducts`,{products:products});
})

export default router;