import stackOverFlow from "../models/stackOverFlowModel.js";
import axios from "axios";

const getStackOverFlowData = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow"
    );
    const data = response.data.items;
    const deleteData = await stackOverFlow.deleteMany();
    data.map(async (item) => {
      const stackOverFlowData = await stackOverFlow.create({
        tags: item.tags,
        owner: item.owner,
        is_answered: item.is_answered,
        view_count: item.view_count,
        answer_count: item.answer_count,
        score: item.score,
        last_activity_date: item.last_activity_date,
        creation_date: item.creation_date,
        last_edit_date: item.last_edit_date,
        question_id: item.question_id,
        content_license: item.content_license,
        link: item.link,
        title: item.title,
      });

      const stackOverFlowQuestions = await stackOverFlow.find();

      
    });
    res.status(201).json({ message: "Questions Loaded successfully" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};


const getStackOverFlowQuestions = async (req, res) => {
    try {
        res.send("Questions");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        
    }
}

const updateStackOverFlowQuestion = async (req, res) => {
    try {
        res.send("Update Question");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        
    }
}

const deleteStackOverFlowQuestion = async (req, res) => {
    try {
        res.send("Delete Question");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        
    }
}

export default { getStackOverFlowData, getStackOverFlowQuestions, updateStackOverFlowQuestion, deleteStackOverFlowQuestion };
