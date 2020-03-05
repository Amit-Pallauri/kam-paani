var express = require('express')
var dotenv = require('dotenv')
var app =  express()
dotenv.config()

console.log(process.env.JWT_SECRET_TOKEN);

app.get('/', function(req, res){
    res.send('basic response')
})

app.get('/users', function(req, res){
    res.send('users page')
})

app. get('/some', function(req, res){
    res.send('some route')
})

app.listen(1111, function(){
    console.log('on server 1111...')
})