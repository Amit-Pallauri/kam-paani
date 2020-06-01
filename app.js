const express = require("express")
const app = express()
const path = require('path')
const hbs = require('hbs')
const session = require('express-session')
const methodOverride = require('method-override') 
const dotenv = require("dotenv")
dotenv.config();

app.use(express.static(path.join(__dirname, '/statics')))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views', 'pages'));
app.set('view option', {layout:"layout"});
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.use(express.urlencoded({ extended : false }))
app.use(methodOverride("cadbury"));

const apiRouter = require('./routes/apiRoutes')

app.use(session({
    name : "forum",
    secret : "bookstore",
    resave: false,
    saveUninitialized : true,
    cookie: {
        maxAge : 1000*60*60*1
    }
}))

app.use(apiRouter)
app.get('/', (req, res)=> res.render('home'))

module.exports = app