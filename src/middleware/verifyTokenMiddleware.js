import {verifyToken} from '../utils/verifyToken.js'

export const verifyTokenMiddleware = (req, res, next) => {
    try {
        // Leer el token de la sesion del backend

        const authHeader = req.headers.authorization;

        // Si no hay token o el token no empieza con bearer, falla
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(400).json({ message: "Token de acceso no proporcionado" })
        }

        // Separar bearer del resto del token y tomamos solo el token
        // con split separo bearer de daljsdlkjaldjl -> "Bearer daljsdlkjaldjl"
        const token = authHeader.split(" ")[1]

        // El mismo sistema que lo firmó es quien puede verificar si es valido o no el token
        req.user = verifyToken(token)

        next()

    } catch (error) {
        return res.status(400).json({ message: "Token de acceso invalido", error: error.message })
    }
}