import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv'
const app = express();
const PORT = 3001;
import db from './db.mjs'
import customMiddleWare from './middleware/exampleMiddleWare.mjs';
import { UserController } from './entities/user/user.controller.mjs';
import axios from 'axios'
import { authorizeRequest } from './middleware/jwtConfig.mjs'
// Configure dotenv
dotenv.config()

// Initialize Collection Classes
const userController = new UserController();

// Global Middleware
app.use(cors({
    origin: ['http://localhost:3000']
}))
app.use(bodyParser.json())

// Route Handlers
app.get('/', customMiddleWare, (req, res, next) => {
    res.send('Howdy hey welcome to the Tv-Search-Api!')
})

app.post('/signup', async (req, res) => {
    const response = await userController.signup(req.body.user)
    res.send(JSON.stringify(response))
})

app.post('/login', async (req, res) => {
    const response = await userController.login(req.body.user)
    res.send(JSON.stringify(response))
})

app.get('/myfavs', authorizeRequest, (req, res) => {
    console.log('My Favorites')
    res.send('My favs will go here')
})

app.listen(PORT, () => {
    console.log(`🔥 TV Search API Running on Port:${PORT} 🔥`)
})