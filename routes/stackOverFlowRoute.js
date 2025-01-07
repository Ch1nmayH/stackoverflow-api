import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Stackoverflow API is up.')
})

export default router

