import Pedido from "../models/pedidoModel.js";
import {createPedidoService} from "../services/pedidoService.js";


export const createPedido = async (req, res) => {
    try {
        const pedidoData = new Pedido(req.body)
        const result = await createPedidoService(pedidoData)
        return res.status(201).json(result)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}