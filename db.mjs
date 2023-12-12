import { JSONPreset } from 'lowdb/node'

const defaultData = { people: ['Patrick'] }
const db = await JSONPreset('db.json', defaultData)

export default db;