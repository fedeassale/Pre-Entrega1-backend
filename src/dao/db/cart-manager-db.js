import CartModel from "../models/carts.model.js"

class CartManager {
    
    async crearCarrito(){
        try {
            const nuevoCarrito = new CartModel({products})
            await nuevoCarrito.save()
            return nuevoCarrito
        } catch (error) {
            console.log("error al crear carrito")
        }
    };

    async getCarritoById(carritoId) {
        try {
           const carrito = await CartModel.findByid(carritoId);
           if(!carrito){
            console.log("no existe el carrito que buscas");
            return null;
           }
           return carrito;
        } catch (error) {
            console.log("Error getting cart by id"); 
            throw error; 
        }
    };

    async agregarProductosAlCarrito(carritoId, productoId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(carritoId)
            const existeProducto = carrito.products.find(item => item.product.toString()===productoId);
            if (existeProducto) {
                existeProducto.quantity += quantity
                } else {
                    carrito.products.push({product: productoId, quantity})
                    }
                    carrito.markModified("products");
                    await carrito.save();
                    return carrito;
        } catch (error) {
            console.log("Error al agregar productos"); 
        } 
    };
};

//aca falta todo lo extra que necesitamos hacer para la entrega final

export default CartManager;