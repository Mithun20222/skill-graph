const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const { runQuery } = require('./db')

const app = express()
app.use(cors({
  origin: '*'
}))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'skill-graph.html'))
})

app.get('/skills', async (req, res) => {
  try {
    const records = await runQuery('MATCH (s:Skill) RETURN s')
    
    const skills = records.map(r => r.get('s').properties)
    
    res.json(skills)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/skills/:name', async (req, res) => {
  try {
    const records = await runQuery(
      `MATCH (a:Skill {name: $name})-[r:RELATED_TO]-(b:Skill)
       RETURN a, b, r`,
      { name: req.params.name }
    )

    if (records.length === 0) {
      return res.status(404).json({ error: 'Skill not found' })
    }

    const center = records[0].get('a').properties

    const connections = records.map(r => ({
      skill: r.get('b').properties,
      reason: r.get('r').properties.reason
    }))

    res.json({ center, connections })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/search', async (req, res) => {
  try {
    const { q } = req.query

    if (!q) return res.json([])

    const records = await runQuery(
      `MATCH (s:Skill)
       WHERE toLower(s.name) CONTAINS toLower($q)
       RETURN s
       LIMIT 10`,
      { q }
    )

    const skills = records.map(r => r.get('s').properties)
    res.json(skills)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

setInterval(async () => {
  try {
    await runQuery('RETURN 1')
    console.log('Neo4j keep-alive ping sent')
  } catch(e) {
    console.error('Keep-alive failed:', e.message)
  }
}, 1000 * 60 * 60 * 24) // every 24 hours

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})