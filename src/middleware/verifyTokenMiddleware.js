import {verifyToken} from '../utils/verifyToken.js'

export const verifyTokenMiddleware = (req, res, next) => {
    try {
        // Leer el token desde las cookies
        const token = req.cookies.accessToken;
        console.log(token)

        // Si no hay token, el acceso es denegado
        if(!token){
            return res.status(401).json({ message: "Acceso denegado. Se requiere token." })
        }

        // El mismo sistema que lo firmó es quien puede verificar si es valido o no el token
        req.user = verifyToken(token)

        next()

    } catch (error) {
        return res.status(400).json({ message: "Token de acceso invalido", error: error.message })
    }
}