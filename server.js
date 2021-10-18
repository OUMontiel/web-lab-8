var express = require('express')
var path = require('path')

var app = express()
var PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

var tables = []
var waitlist = []

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'))
})

app.get('/reserve', (req, res) => {
    res.sendFile(path.join(__dirname, 'reserve.html'))
})

app.get('/tables', (req, res) => {
    res.sendFile(path.join(__dirname, 'tables.html'))
})

app.get('/api/tables', (req, res) => {
    res.json(tables)
})

app.get('/api/waitlist', (req, res) => {
    res.json(waitlist)
})

app.post('/api/reservations', (req, res) => {
    var newReservation = req.body
    if (tables.length < 5) {
        tables.push(newReservation)
        res.json(waitlist)
    }
    else {
        waitlist.push(newReservation)
        res.json(waitlist)
    }
})

app.post('/api/clear', (req, res) => {
    tables = []
    waitlist = []
})

app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT)
})
