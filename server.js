import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import stackOverFlowRoute from './routes/stackOverFlowRoute.js'

dotenv.config()

const app = express()

app.use(express.json(), express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Backend is up.')
})

app.use('/api/stackoverflow', stackOverFlowRoute)

const port = process.env.PORT || 8000

app.listen(port,  () => {
    connectDB();
    console.log(`Server is running on port ${port}`)
})

