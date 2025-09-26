import express from 'express'
import {login, checkAuthStatus, logout} from "../controllers/loginController.js";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";


export const loginRoute = express.Router()

loginRoute.post("/login", login)
loginRoute.get("/auth/status", verifyTokenMiddleware, checkAuthStatus)
loginRoute.post("/logout", logout)