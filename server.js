const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express()

// middleware

app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

//static Images Folder

app.use('/public', express.static('./public'))


// routers
const productRouter = require('./routes/productRouter.js')
app.use('/api/products', productRouter)

const authRouter = require('./routes/authRouter.js')
app.use('/api/user', authRouter)


//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})