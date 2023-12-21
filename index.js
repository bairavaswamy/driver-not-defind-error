const express = require('express')
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const app = express()
const path = require('path')
const dbpath = path.join(__dirname, 'goodreads.db')
let db = null
const initiatingServerDBandNode = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server running...')
    })
  } catch (error) {
    console.log(`Datebase Error ${error.message}`)
    process.exit(1)
  }
}

initiatingServerDBandNode()

app.get('/books/', async (request, response) => {
  const querry = `SELECT * FROM book ORDER BY book_id;`
  const books = await db.all(querry)
  response.send(books)
})
