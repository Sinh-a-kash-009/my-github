import express from 'express'
const app= express()
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js'
import exploreRoutes from './routes/explore.route.js'
import authRoutes from './routes/auth.route.js'
import connectMongoDB from './db/connectMongoDB.js'
import "./passport/github.auth.js"
import passport from 'passport'
import session from 'express-session'
dotenv.config()

app.use(cors(

))
app.use(express.json())

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello World!')
}   )

app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/explore',exploreRoutes);
app.listen(5000, () => {
  console.log(`Server is running on port 5000`)
  connectMongoDB();
})