import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: 'string',
        name: 'string',
        email: 'string',
        password: 'string',
    }
)

export const User = mongoose.model('users', userSchema)