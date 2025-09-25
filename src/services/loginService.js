import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import logger from "../core/logger.js";


export const loginService = async (userData) => {
    const { email, password } = userData

    if(!(email && password)){
        const error = new Error("There's a missing field")
        error.statusCode = 400;
        throw error;
    }

    const userFound = await User.findOne({email})


    if(!userFound){
        const error = new Error("User or password is incorrect")
        error.statusCode = 400
        throw error
    }

    if(!bcrypt.compareSync(password, userFound.password)){
        const error = new Error("User or password is incorrect")
        error.statusCode = 401
        logger.info("error de contraseña")
        throw error
    }

    const payload = {
        userId: userFound._id,
        userEmail: userFound.email
    }

    const token = jwt.sign(payload, "secret", { expiresIn: "1h" })

    return {message: "Logged in", token}
}