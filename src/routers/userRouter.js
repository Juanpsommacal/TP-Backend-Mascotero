import express from 'express'
import {
    createUser,
    getUserById,
    deleteUser, updateUser
} from "../controllers/userController.js";
import {verifyTokenMiddleware} from "../middleware/verifyTokenMiddleware.js";

export const userRoute = express.Router()

userRoute.post("/create", createUser)
userRoute.get("/user/:id", verifyTokenMiddleware, getUserById)
userRoute.delete("/delete/:id", verifyTokenMiddleware, deleteUser)
userRoute.put("/update/:id", verifyTokenMiddleware, updateUser)
