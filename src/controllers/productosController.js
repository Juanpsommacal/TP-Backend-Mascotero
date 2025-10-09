import { createProductoService, getProductosService } from "../services/productosService.js";

export const getProductos = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const result = await getProductosService(page, limit);
        return res.status(200).json(result);
    } catch (err) {
        if (err.statusCode === 401) {
            return res.status(401).json({ message: "Error de credenciales", err });
        }
        return res.status(500).json({ message: "Error interno del servidor", err });
    }
};

export const createProducto = async (req, res) => {
    try {
        const productoData = req.body;
        const result = await createProductoService(productoData);

        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};