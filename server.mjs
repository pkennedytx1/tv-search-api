import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv'
const app = express();
const PORT = 3000;
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
    origin: 'https://example.com'
}))
app.use(bodyParser.json())

// Route Handlers
app.get('/', customMiddleWare, (req, res, next) => {
    res.send('Howdy Hey!')
})

app.post('/signup', async (req, res) => {
    const response = await userController.signup(req.body.user)
    res.send(JSON.stringify(response))
})

app.get('/myfavs', authorizeRequest, (req, res) => {
    res.send('My favs will go here')
})

app.post('/people', async (req, res) => {
    db.data.people.push(req.body.name)
    await db.write()
    res.sendStatus(200)
})

app.get('/lambda', async (req, res) => {
    const response = await axios.get('https://j2n7icqx33hogcd32i2padguou0xaawd.lambda-url.us-east-2.on.aws/')
    const data = response.data
    console.log(data)
    res.send('triggered lambda');
})

app.listen(PORT, () => {
    console.log(`🔥 TV Search API Running on Port:${PORT} 🔥`)
})