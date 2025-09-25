import {loginService} from "../services/loginService.js";



export const login = async (req, res) => {
    try {
        const userData = req.body
        const result = await loginService(userData)
        return res.status(200).json(result);
    } catch (err){
        if (err.statusCode === 401){
            return res.status(401).json({ message: "Error de credenciales", err});
        }
        return res.status(500).json({ message: "Error interno del servidor", err});
    }

}