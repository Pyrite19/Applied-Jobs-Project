const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'jobBase'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

let date = new Date();

app.get("/", async (req, res) => {
    const jobList = await db.collection("jobBase").find().toArray()
    res.render('index.ejs', { job: jobList })
})

app.post('/addJob', (req, res) => {
    db.collection('jobBase').insertOne({ job: req.body.jobItem, date: date.getDate() })
        .then(result => {
            console.log('Job Added')
            res.redirect('/')
        })
        .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})