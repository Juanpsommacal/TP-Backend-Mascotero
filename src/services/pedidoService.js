import Pedido from "../models/pedidoModel.js";

export const createPedidoService = async (pedidoData) => {
    if(!pedidoData){
        throw new Error("Error en los datos ingresados")
    }

    const pedido = await pedidoData.save()
    return { message: "Pedido creado", pedidoId: pedido.pedidoId}
}

export const getPedidosService = async () => {
    return Pedido.find({}).populate('userId', 'name lastName email phone');
}