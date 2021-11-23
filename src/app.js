const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000


const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')


// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// setup handlebars engine and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory 
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name : 'fareed'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about',
        name: 'about page'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name: 'this is help message'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: " you must provide an address"
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if (error){
            return res.send({
                error: "address not found"
            })
        }
        forecast(longitude,latitude,(error,{temp=0,feels=0,wind=0}={})=>{
            if (error){
                return res.send({
                    error: "cannot retrieve weather"
                })
            }
            res.send({
                location,
                temp,
                feels,
                wind
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: "you must provide a search term"
        })
    } 

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'error',
        name: 'help page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title: 'error',
        name: 'page not found'
    })
})

app.listen(port, ()=>{
    console.log('server is up on port '+ port)
})

