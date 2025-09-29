import express from "express";
import {createPedido} from "../controllers/pedidoController.js";
import {verifyTokenMiddleware} from "../middleware/verifyTokenMiddleware.js";


export const pedidoRoute = express.Router()

pedidoRoute.post("/create", verifyTokenMiddleware, createPedido)
