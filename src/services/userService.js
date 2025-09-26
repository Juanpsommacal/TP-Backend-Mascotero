import User from "../models/userModel.js";


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
    console.log(userId)
    const user = await User.findById(userId)

    if(!user){
        throw new Error("Usuario no encontrado")
    }

    return {
        userId: user._id,
        name: user.name,
        lastname: user.lastName,
        email: user.email
    }
}


export const deleteUserService = async(id) => {
    await User.findByIdAndDelete(id)
    return {message: 'Usuario eliminado'}
}