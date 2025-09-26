import express from 'express'
import {createProducto, getProductos} from "../controllers/productosController.js";


export const productosRoute = express.Router()

productosRoute.get("/", getProductos)
productosRoute.post("/create", createProducto)
