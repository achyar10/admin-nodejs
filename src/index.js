import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import expbs from 'express-handlebars'
import path from 'path'
import flash from 'connect-flash'
import session from 'express-session' 
import route from './Routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/marketplace', {
mongoose.connect('mongodb://marketku:qwerty123##@175.103.48.10:27020/marketplace', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.use(express.static('public'))
app.engine('hbs', expbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../views/layouts'),
    partialsDir: 'views/layouts',
    extname: 'hbs'
}))
app.set('view engine', 'hbs')

// express session
app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: true
}))

// Connect flash
app.use(flash());

// set route
app.use('/', route)

// jika route tidak ditemukan
app.use((req, res, next) => {
    res.render('errors/404', {
        layout: false
    })
})


app.set('port', process.env.PORT || 9001)
app.listen(app.get('port'), () => {
    console.log(`server running on port ${app.get('port')}`)
})