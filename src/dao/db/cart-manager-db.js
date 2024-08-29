import CartModel from "../models/carts.model.js"

class CartManager {
    
    async crearCarrito(){
        try {
            const nuevoCarrito = new CartModel({ products: [] })
            await nuevoCarrito.save()
            return nuevoCarrito
        } catch (error) {
            console.log("error al crear carrito")
        }
    };

    async getCarritoById(id) {
        try {
           const carrito = await CartModel.findById(id);
           if(!carrito){
            console.log("no existe el carrito que buscas");
           }
           return carrito;
        } catch (error) {
            console.log("Error getting cart by id"); 
            throw error; 
        }
    };

    async agregarProductosAlCarrito(carritoId, productId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(carritoId)
            const existeProducto = carrito.products.find(item => item.product.toString()===productId);
            if (existeProducto) {
                existeProducto.quantity += quantity
                } else {
                    carrito.products.push({product: productId, quantity})
                    }
                    carrito.markModified("products");
                    await carrito.save();
                    return carrito;
        } catch (error) {
            console.log("Error al agregar productos"); 
        } 
    };


    async deleteProducts(carritoId, productId) {
    try {
        const cart = await CartModel.findById(carritoId)
        if(!cart){
            console.log('Cart not found');
            return null
        }
        const initialLength = cart.products.length;
        cart.products = cart.products.filter( p => p.product._id.toString() !== productId )
        if (cart.products.length !== initialLength) {
        await cart.save()
        return cart
        }else {
            return { error: 'Product not found in cart' };
        }
    } catch (error) {
        //console.log('error deleting products in cart')
        throw error
    }
};

// async deleteCartById(id) {
//     try {
//         const result = await CartModel.findByIdAndDelete(id);
//         !result && (() => { throw new Error("Carrito no encontrado"); })();

//         return result;
//     } catch (error) {
//         console.error("Error al eliminar el carrito por id:", error);
//         throw error;
//     }
// }

async clearCart(cartId) {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
        throw new Error('Carrito no encontrado');
    }

    // Vacia el array de productos
    cart.products = [];

    // Guarda los cambios y retorna el carrito actualizado
    return await cart.save();
};

async updateProductQuantity(carritoId, productId, quantity) {
    const cart = await CartModel.findById(carritoId);
    
    if (!cart) {
        throw new Error('Carrito no encontrado');
    }

    const product = cart.products.find(p => p.product.toString() === productId);

    if (!product) {
        throw new Error('Producto no encontrado en el carrito');
    }

    product.quantity = quantity;

    await cart.save();
};

//este anada mas o menos
async updateCart(carritoId, updatedProducts) {
    const cart = await CartModel.findById(carritoId);

    if (!cart) {
        throw new Error('Carrito no encontrado');
    }

    // Reemplaza los productos actuales con el nuevo array
    cart.products = updatedProducts;

    // Guarda los cambios en el carrito
    return await cart.save();
};


}



//aca falta todo lo extra que necesitamos hacer para la entrega final

export default CartManager;