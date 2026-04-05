import express from "express"
import cors from "cors"
import 'dotenv/config'
import bodyParser from "body-parser"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"

const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

// middlewares 
app.use(bodyParser.json())
app.use(cors())

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
// api endpoint 

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

// app.use('/api/admin/login', adminRouter)
// localhost:4000/api/admin/add-doctor

app.get('/', (req, res) => {
    res.send("API WORKING")
})

app.listen(port, () => console.log("server is working proper ⟤", port))

