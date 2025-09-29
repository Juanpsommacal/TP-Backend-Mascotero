

export const createPedidoService = async (pedidoData) => {
    if(!pedidoData){
        throw new Error("Error en los datos ingresados")
    }

    const pedido = await pedidoData.save()
    return { message: "Pedido creado", pedidoId: pedido.pedidoId}
}