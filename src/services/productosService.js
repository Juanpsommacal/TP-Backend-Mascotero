import productModel from "../models/productModel.js";
import logger from "../core/logger.js";

export const getProductos = async (page = 1, limit = 10) => {
    try {
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        };

        const productos = await productModel.paginate({}, options);
        return productos;
    } catch (error) {
        throw new Error("Error al obtener los productos: " + error.message);
    }
};

export const createProductoService = async (productoData) => {
    try {
        logger.info(productoData)
        const productoExist = await productModel.findOne({name: productoData.name})
        if(productoExist){
            throw new Error(`Producto ${productoData.name} ya existe`)
        }
        const newProduct = new productModel(productoData);
        const savedProduct = await newProduct.save();
        return { message: "Producto creado", content: savedProduct}
    } catch (error) {
        throw new Error("Error al crear el producto: " + error.message);
    }
}