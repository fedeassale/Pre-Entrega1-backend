import ProductModels from "../models/product.model.js"


class ProductManager {
    async getProducts() {
        try {
            const arrayProducts = await ProductModels.find(); 
            return arrayProducts;
        } catch (error) {
            console.log("Error reading file", error); 
        }
    }

    async getProductById(id) {
        try {
            const buscado = await ProductModels.findById(id);
            if(!buscado){
                throw new Error(`Producto con id ${id} no encontrado`);
                return null;
            }
            return buscado;
        } catch (error) {
            console.log("Error searching by id", error); 
        }
    }

    async addProduct({ title, description, price, status,category, code, stock, thumbnails = [] }) {

          try {
            if (!title || !description || !price || status===undefined || !category || !code || !stock) {
                console.log("All fields are required");
               return;
              
            }
  
          const existeProducto= await ProductModels.findOne({code: code});
          if(existeProducto){
            console.log("Product already exists");
            return;
          }


          const newProduct = new ProductModels( {
              title,
              description,
              code,
              price,
              status: true,
              stock,
              category,
              thumbnails: thumbnails || []
          })
         await newProduct.save()
          } catch (error) {
            console.log("error al agregar producto")
          }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const update= await ProductModels.findByIdAndUpdate(id,updatedProduct);
            if(!update){
                console.log(`Producto con id ${id} no encontrado`
                    );
                    return null;
                    }
                    return update;
        } catch (error) {
            console.log("We have an error updating products",error); 
        }
    }

    async deleteProduct(id) {
        try {
            const deleteado= await ProductModels.findByIdAndDelete(id);
            if(!deleteado){
                console.log(`Producto con id ${id} no encontrado`
                    );
                    return null;
                    }
                    console.log("producto eliminado");
        } catch (error) {
            console.log("We have an error deleting products"); 
        }
    }
}

export default ProductManager;