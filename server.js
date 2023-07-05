const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('./providers/mongoDb')
const redisClient = require('./providers/redisClient')
const morgan = require('morgan')
const cookie_parser = require('cookie-parser')
const app = express()
dotenv.config()
const projectRoutes = require('./routes/Admin-Web-App/admin/projects')
const featuresRoutes = require('./routes/Admin-Web-App/admin/features') 
const variableRoutes = require('./routes/Admin-Web-App/admin/variables')
const authRoutes = require('./routes/Admin-Web-App/authRoutes')
const apiRouter = require('./routes/api/api-router')


// Environment Variables
const PORT = process.env.PORT || 3000 

// Express Middleware 
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cookie_parser())


// Routes

app.use("/projects", projectRoutes)
app.use("/features", featuresRoutes)
app.use("/variables", variableRoutes)
app.use("/auth", authRoutes)
app.use("/api", apiRouter) 



app.listen(PORT, () => {
    console.log(`[LISTENING] on PORT ${PORT}`)
})