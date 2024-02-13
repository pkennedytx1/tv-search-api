import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, unique: true },
        name: 'string',
        email: { type: String, unique: true },
        password: 'string',
    }
)

export const User = mongoose.model('users', userSchema)