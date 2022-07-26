const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'JobBase'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", async (req, res) => {
    const jobList = await db.collection("JobBase").find().toArray()
    res.render('index.ejs', { jobs: jobList })
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})