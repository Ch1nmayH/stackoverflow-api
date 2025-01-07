import express from 'express'
import stackOverFlowController from '../controllers/stackOverFlowController.js'

const router = express.Router()

router.post('/questions/load', stackOverFlowController.getStackOverFlowData);


export default router

