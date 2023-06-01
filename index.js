const express = require('express')
const app = express()
const cors = require('cors')
// const router = require('./routes/index')
const path = require('path')
const dotenv = require('dotenv')
const db = require('./config/db')
const habitRouter = require('./routes/habit')
dotenv.config()
const port = process.env.PORT || 4000


app.use(express.urlencoded())
app.use(cors())
app.use(express.json())

db()

app.use(express.static('./assets'))

//setting view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

/* app.get('/', (req, res) => {
    return res.render('home')
}) */

app.use('/', habitRouter)





app.listen(port, () => console.log(`Example app listening on port ${port}!`))