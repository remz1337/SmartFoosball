const Pool = require('pg').Pool
const pool = new Pool({
  user: 'smartfoosball',
  host: 'localhost',
  database: 'smartfoosball',
  password: 'password123',
  port: 5432,
})

const getEvents = (request, response) => {
    pool.query('SELECT * FROM events', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEventById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM events WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createEvent = (request, response) => {
    const { timestamp, value } = request.body
  
    pool.query('INSERT INTO events (happenend_at, value, sensor_id) VALUES ($1, $2, 1)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }

  module.exports = {
    getEvents,
    getEventById,
    createEvent,
  }