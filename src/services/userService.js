import User from "../models/userModel.js";
import logger from "../core/logger.js";


export const createUserService = async (userData) => {
    if(!userData){
        throw new Error("Error en los datos ingresados")
    }

    const { email } = userData

    const userExist = await User.findOne({email})

    if(userExist){
        throw new Error(`Usuario ${email} ya existe`)
    }

    const user = await userData.save()
    return { message: "Usuario creado", content: user}
}

export const getUserByIdService = async(userData) => {
    const { userId } = userData

    const user = await User.findById(userId)

    if(!user){
        throw new Error("Usuario no encontrado")
    }

    return {
        userId: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
    }
}


export const deleteUserService = async(id) => {
    await User.findByIdAndDelete(id)
    return {message: 'Usuario eliminado'}
}