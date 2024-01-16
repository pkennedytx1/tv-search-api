import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv'
const app = express();
const PORT = 3000;
import db from './db.mjs'
import customMiddleWare from './middleware/exampleMiddleWare.mjs';

// Configure dotenv
dotenv.config()

// Connect to MongoDB Container
db.connect()

// Global Middleware
app.use(cors({
    origin: 'https://example.com'
}))
app.use(bodyParser.json())

// Route Handlers
app.get('/', customMiddleWare, (req, res, next) => {
    res.send('Howdy Hey!')
})

app.post('/people', async (req, res) => {
    db.data.people.push(req.body.name)
    await db.write()
    res.sendStatus(200)
})

app.listen(PORT, () => {
    console.log(`🔥 TV Search API Running on Port:${PORT} 🔥`)
})