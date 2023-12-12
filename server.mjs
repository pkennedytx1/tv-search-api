import express from 'express'
import bodyParser from 'body-parser';
const app = express();
const PORT = 3000;
import db from './db.mjs'

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Howdy Hey!');
})

app.post('/people', async (req, res) => {
    db.data.people.push(req.body.name)
    await db.write()
    res.sendStatus(200)
})

app.listen(PORT, () => {
    console.log(`🔥 TV Search API Running on Port:${PORT} 🔥`)
})