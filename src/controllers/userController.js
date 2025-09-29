import User from "../models/userModel.js"
import {
    createUserService, deleteUserService, getUserByIdService, updateUserService
} from "../services/userService.js";


export const createUser = async (req, res) => {
    try {
        const userData = new User(req.body)
        const result = await createUserService(userData)
        return res.status(201).json(result)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService({ userId: id });

        return res.status(200).json(user);
    } catch(error) {
        if(error.message === "Usuario no encontrado") {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.status(500).json({ message: "Error del servidor" });
    }
}


export const deleteUser = async(req, res) =>{
    try {
        const { id } = req.params;
        const response = await deleteUserService(id);
        return res.status(200).json(response);
    } catch(error) {
        return res.status(500).json({ message: `Error del servidor: ${error}` });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        const response = await updateUserService(id, userData);
        return res.status(200).json(response);
    } catch(error) {
        return res.status(500).json({ message: `Error del servidor: ${error}` });
    }
}