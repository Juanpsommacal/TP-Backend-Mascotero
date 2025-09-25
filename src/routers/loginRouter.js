import express from 'express'
import {login} from "../controllers/loginController.js";


export const loginRoute = express.Router()

loginRoute.post("/login", login)