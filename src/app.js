import express from "express";
import productRouter from "./router/products.router.js";
import cartsRouter from "./router/carts.route.js";
const app = express(); 
const PUERTO = 8080;
 
app.use(express.json()); 

app.use("/",productRouter);

app.use("/api/carts",cartsRouter);



app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`); 
})

