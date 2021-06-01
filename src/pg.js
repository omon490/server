const dotenv = require("dotenv")
const { Pool } = require("pg")

dotenv.config()

const host = process.env.PG_HOST || 'localhost'
const user = process.env.PG_USER || 'postgres'
const password = process.env.PG_PWD || ''
const database = process.env.PG_DATABASE || 'postgres'
const port = process.env.PG_PORT || 5432

const pool = new Pool({
  host,
  user,
  password,
  database,
  port,
})

const rows = async (SQL, ...params) => {

  const client = await pool.connect()

  try {
    const { rows } = await client.query(SQL, params)
    return rows
  }
  catch(err){
    console.error(err)
  }
  finally {
    client.release()
  }
}

const row = async (SQL, ...params) => {

  const client = await pool.connect()

  try {
    const { rows: [row] } = await client.query(SQL, params)
    return row
  }
  catch(err){
    console.error(err)
  }
  finally {
    client.release()
  }
}

module.exports.rows = rows