import db from '../../db.mjs'
import { User } from './user.model.mjs'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserRepository {

    constructor() {
        db.connect();
        this.salt = undefined
    }

    async signup(user) {
        try {
            if (!this.salt) {
                this.salt = await bcrypt.genSalt(10)
            }
            user.password = await bcrypt.hash(user.password, this.salt)
            let userData = await User.create(user)
            const token = jwt.sign({
                username: userData.username,
                id: userData._id,
                name: userData.name
            }, process.env.JWT_SECRET);
            return {
                username: userData.username,
                id: userData._id, 
                token
            }
        } catch (err) {
            console.error(err)
            return error
        }
    }

    async login(user) {
        try {
            let dbUser = await User.findOne({ username: user.username });
            console.log(dbUser)
            if (!dbUser) {
                throw new Error('User does not exist');
            }
            if (!this.salt) {
                this.salt = await bcrypt.genSalt(10)
            }
            user.password = await bcrypt.hash(user.password, this.salt)
            console.log(user.password)
            const isMatch = await bcrypt.compare(user.password, dbUser.password);
            if (!isMatch) {
                throw new Error("User name or password is incorrect");
            }
            const token = jwt.sign(
                { username: dbUser.username, id: dbUser._id }, process.env.JWT_SECRET,
            );
            return { username: dbUser.username, id: dbUser._id, token };
        } catch (err) {
            console.error(err);
            return err;
        }
    }
}