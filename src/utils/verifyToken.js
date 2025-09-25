import jwt from "jsonwebtoken"
import logger from "../core/logger.js";

// Funcion que verifica y valida que el token sea correcto y funcional sin estar vencido
export function verifyToken(token){
    try {
        return jwt.verify(token, "secret")
    } catch (error) {
        throw new Error("Token invalido")
    }
}