import { Router } from "express";
const router = Router(); 
import ProductManager from "../managers/product-manager.js";

const manager = new ProductManager("./src/data/productos.json");


router.get("/", async (req, res) => {
    const limit =req.query.limit;

    try{
        const arrayProducts = await manager.getProducts();
        if(limit){
            res.send(arrayProducts.slice(0,limit));   
        }else{
            res.send(arrayProducts); 
        }
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

router.get("/:pid", async (req, res) => {
    let id = req.params.pid; 
    try {
        const product = await manager.getProductById(parseInt(id)); 
        if(!product) {
            res.send("product not found"); 
        } else {
            res.send(product); 
        }
    } catch (error) {
        res.send(error.message); 
    }
});

router.post("/",async(req,res)=>{
    const newProduct = req.body;
    try{await manager.addProduct(newProduct);
        res.send("add Product");
    }catch(error){
        res.status(500).send(error.message);
    }
});

router.put("/:pid",async(req,res)=>{
    try{
        const productId = parseInt(req.params.pid)
        const updatedProduct = req.body
        await manager.updateProduct(productId, updatedProduct)
        res.json({message:"Product updated successfully"})
    }catch(error){
        res.status(500).send(error.message)
    }
});

router.delete("/:pid",async(req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        await manager.deleteProduct(productId);
        res.json({message:"Product deleted successfully"})        
    } catch (error) {
        res.status(500).send(error.message);        
    }
});

export default router;