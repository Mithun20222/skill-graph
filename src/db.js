const neo4j = require('neo4j-driver')
require('dotenv').config()

// Create a driver — this is the connection to Neo4j
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
)

// A helper function we'll use everywhere to run queries
async function runQuery(cypher, params = {}) {
  // A "session" is like opening a connection to run one query
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