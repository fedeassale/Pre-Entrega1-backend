import { Router } from "express";
const router = Router(); 
import ProductManager from "../dao/db/product-manager-db.js";
const manager = new ProductManager();
import ProductModels from "../dao/models/product.model.js";


router.get("/products",async (req,res)=>{
    let page = req.query.page|| 1;
    let limit = 2;

    

    const listadoProductos= await ProductModels.paginate({},{limit, page});

    const productoResultadoFinal = listadoProductos.docs.map(producto=>{
        const{_id, ...rest} =producto.toObject();
        return rest;
    })
    res.render("home",{
        productos:productoResultadoFinal,
        hasPrevPage: listadoProductos.hasPrevPage,
        hasNextPage: listadoProductos.hasNextPage,
        prevPage: listadoProductos.prevPage,
        nextPage: listadoProductos.nextPage,
        currentPage: listadoProductos.page,
        totalPages: listadoProductos.totalPages
    })
})

router.get("/realtimeproducts",async (req,res)=>{
    res.render("realtimeproducts");
});

export default router