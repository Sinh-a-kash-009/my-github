import express from 'express'
const app= express()
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js'
import exploreRoutes from './routes/explore.route.js'
dotenv.config()

app.use(cors(

))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
}   )

app.use('/api/users',userRoutes);

app.use('/api/explore',exploreRoutes);
app.listen(5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})