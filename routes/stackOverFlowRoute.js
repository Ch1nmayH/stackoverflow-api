import express from 'express'
import stackOverFlowController from '../controllers/stackOverFlowController.js'

const router = express.Router()

//Load Fresh questions
router.post('/questions/load', stackOverFlowController.getStackOverFlowData);

//Get all questions / Get questions by id / use query params to filter
router.get(`/questions/:id?`, stackOverFlowController.getStackOverFlowQuestions);

//Update question by id
router.put(`/questions/:id?`, stackOverFlowController.updateStackOverFlowQuestion);

//Delete question by id
router.delete(`/questions/:id?`, stackOverFlowController.deleteStackOverFlowQuestion);


export default router

