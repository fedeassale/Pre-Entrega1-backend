import { Router } from "express";
const router = Router(); 
import CartManager from "../managers/cart-manager.js";
const cartManager = new CartManager("./src/data/carts.json"); 

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito(); 
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).send("Server error");
    }
})

router.get("/:cid", async (req, res) => {
    let carritoId = parseInt(req.params.cid);

    try {
        const carrito = await cartManager.getCarritoById(carritoId); 
        res.json(carrito.products); 
    } catch (error) {
        res.status(500).send("Error getting products from cart"); 
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    let carritoId = parseInt(req.params.cid); 
    let productoId = req.params.pid; 
    let quantity = req.body.quantity || 1; 

    try {
        const actualizado = await cartManager.agregarProductosAlCarrito(carritoId, productoId, quantity); 
        res.json(actualizado.products); 
    } catch (error) {
        res.status(500).send("Error adding a product");
    }
})

export default router;