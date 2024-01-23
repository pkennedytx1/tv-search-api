import db from '../../db.mjs'
import { User } from './user.model.mjs'

export class UserRepository {
    constructor() {
        db.connect();
    }

    async signup(user) {
        try {
            let userData = await User.create(user)
            console.log(userData);
        } catch (err) {
            console.error(err)
            return error
        }
    }
}