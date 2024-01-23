import { UserService } from "./user.service.mjs"

export class UserController {
    constructor() {
        this.userService = new UserService
    }

    async signup(user) {
        console.log('Controller: signup')
        const response = await this.userService.signup(user)
        return response;
    }

    async login(user) {
        console.log('Controller: login')
        // place service call here
    }
}