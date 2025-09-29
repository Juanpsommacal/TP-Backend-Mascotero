import {loginService} from "../services/loginService.js";
import logger from "../core/logger.js";
import util from "util";



export const login = async (req, res) => {
    try {
        const userData = req.body
        const { token, user } = await loginService(userData)
        
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Debe ser true en producción
            path: '/',
            sameSite: 'none', // Cambiado de 'strict' a 'none' para cross-domain
            maxAge: 1000 * 60 * 60 // 1 hora
        });

        return res.status(200).json({ message: "Logged in successfully", user });
    } catch (err){
        if (err.statusCode === 401){
            return res.status(401).json({ message: "Error de credenciales", err});
        }
        return res.status(500).json({ message: "Error interno del servidor", err});
    }

}

export const checkAuthStatus = async (req, res) => {
    try {
        // Si el middleware verifyTokenMiddleware tuvo éxito, req.user ya está poblado.
        // Simplemente devolvemos la información del usuario al frontend.
        const user = req.user;
        // logger.info(util.inspect(user, { showHidden: false, depth: null, colors: false }));
        return res.status(200).json({
            isAuthenticated: true,
            user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    lastName: user.lastName,
                    phone: user.phone
            }
        });
    } catch (err) {
        return res.status(500).json({ message: "Error interno del servidor", err: err.message });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Debe ser true en producción
            path: '/',
            sameSite: 'none', // Cambiado de 'strict' a 'none' para cross-domain
            maxAge: 1000 * 60 * 60 // 1 hora
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};