import db from '../../db.mjs'
import { User } from './user.model.mjs'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserRepository {
    constructor() {
        db.connect();
    }

    async signup(user) {
        try {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
            let userData = await User.create(user)
            const token = jwt.sign({
                username: userData.username,
                id: userData._id,
                name: userData.name
            }, process.env.JWT_SECRET);
            return { token }
        } catch (err) {
            console.error(err)
            return error
        }
    }
}