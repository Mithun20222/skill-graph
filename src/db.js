const neo4j = require('neo4j-driver')
require('dotenv').config()

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
)

async function runQuery(cypher, params = {}) {
  const session = driver.session()
  try {
    const result = await session.run(cypher, params)
    return result.records
  } finally {
    // Always close the session when done
    await session.close()
  }
}

module.exports = { driver, runQuery }