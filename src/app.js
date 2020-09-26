const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

console.log(__dirname)

const publicDir = path.join(__dirname, '../public')

const viewPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res) =>{
    res.render('index',{
        name:'Mani',
        title: 'Weather'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help Page',
        name: 'Mani'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: "Help Page directory is not found"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        name:'Mani',
        title: 'About Me'
    });
})
 

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: "Page Not Found"
    });
})

app.listen(3000, () =>{
    console.log('server is up and running in 3000')
})