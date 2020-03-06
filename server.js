var express = require('express')
var dotenv = require('dotenv')
var app =  express()
dotenv.config()
require("./db")
var Heroku = require('./heroku')
var PORT = process.env.PORT || 1111;

app.get('/', function(req, res){
    res.send('basic response')
})

// app.get('/users/name/:name', function(req, res){
//     var name = req.params.name
//     Heroku.create({name : name}).then(function(heroku){
//         res.json(heroku)
//     }).then(function(err){
//         console.log(err)
//     })
// })

app.get('/users/name/:name', function(req, res){
    var name = req.params.name
    Heroku.create({name : name}).then(function(heroku){
        res.json(heroku)
    }).then(function(err){
        console.log(err)
    })
})

app.get('/name', function(req, res){
    res.send('name');
})

app. get('/some', function(req, res){
    res.send('some route')
})

app.get('/login', function(req, res){
    var user = req.query.user;
    res.send(`hi there ${user}`)
})

app.listen(PORT, function(){
    console.log(`on server ${PORT}...`)
})