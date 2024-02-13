import { UserRepository } from "./user.repository.mjs";

export class UserService {
    constructor() {
        this.userRepository = new UserRepository()
    }

    async validateUser(user) {
        const errors = {}
        if (user.username === '') {
            errors.username = "Username cannot be empty";
        }
        return errors
    }

    async signup(user) {
        const errors = await this.validateUser(user);
        if (Object.keys(errors).length === 0) {
            const response = this.userRepository.signup(user)
            return response
        }
        console.log(errors)
        return { errors }
    }

    async login(user) {
        return await this.userRepository.login(user);
    }
}