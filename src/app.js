const hbs = require('hbs')
const path = require('path')
const express = require('express')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// install = npm i hbs@4.0.1
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Refael B'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Refael B'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpTest: 'This is some helpful text.',
        name: 'Refael B',
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.search){
        res.send({
            error: 'Address must be provided.'
        })
    }
    forecast(req.query.search, (error, forecastData = {}) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            forecast: forecastData,
            address: req.query.search
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        name: 'Refael B',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        name: 'Refael B',
        title: '404'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})