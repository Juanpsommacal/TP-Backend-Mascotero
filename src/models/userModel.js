import mongoose from 'mongoose'
import { isGoodPassword } from '../utils/validators.js'
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 2,
        trim: true,
        lowercase: true,
    },

    lastName: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 2,
        trim: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 6,
        trim: true,
        lowercase: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },

    password: {
        required: true,
        type: String,
        validate: {
            validator: function (value) {
                return isGoodPassword(value)
            },
            message:
                "Password must be bewteen 6 and 12 characters, with at least one number, one uppercase letter and one lowercase letter"
        }
    },
    phone: {
        type: String,
        required: true,
        maxlength: 15,
        minlength: 6,
        trim: true,
        lowercase: true
    }
}, {
    timestamps: true} )

userSchema.pre("save", function (next) {
    // Encriptamos la password antes de guardarla
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

export default mongoose.model("lol-coach-users-utn", userSchema)