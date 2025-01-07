import stackOverFlow from "../models/stackOverFlowModel.js";
import axios from "axios";

const getStackOverFlowData = async (req, res) => {
  try {
    const url = `https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow&pagesize=100&page=1`
    const response = await axios.get(
        url
    );
    const data = response.data.items;
    // const deleteData = await stackOverFlow.deleteMany();
    data.map(async (item) => {
     const alreadyExists = await stackOverFlow.findOne({question_id: item.question_id, title: item.title, link: item.link});
        if(alreadyExists) {
            // console.log("Already Exists");
            return;
        }
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
    const id = req.params.id;
    let {
      is_answered,
      tags,
      answers_count__gt,
      answers_count__lt,
      sort,
      page,
    } = req.query;

    if (id) {
      const stackOverFlowQuestion = await stackOverFlow.findById(id);
      return res.send(stackOverFlowQuestion);
    }

    let filter = {};

    if (is_answered) {
      filter.is_answered = is_answered == "true" ? true : false;
    }

    if (tags) {
        filter.tags = {$in: tags.split(",")}
    }

    if (answers_count__gt) {
        filter.answer_count = {$gt: parseInt(answers_count__gt)}
    }

    if (answers_count__lt) {
        filter.answer_count = {$lt: parseInt(answers_count__lt)}
    }

    let sortFilter = {};

    if (sort) {
        if(sort === "score".toLocaleLowerCase()) {
            sortFilter.score = -1
        }

        if(sort === "created_at".toLocaleLowerCase()) {
            sortFilter.creation_date = -1
        }
    }

    const limit = 100;
    if(!page) {
        page = 1;
    }
    const skip =  (page - 1) * limit;

    const totalQuestions = await stackOverFlow.countDocuments(filter);
    const totalPages = Math.ceil(totalQuestions / limit);

    const stackOverFlowQuestions = await stackOverFlow.find(filter)
    .sort(sortFilter)
    .limit(limit)
    .skip(skip);


    return res.json({
        data: stackOverFlowQuestions,
        total: totalQuestions,
        page: page ? parseInt(page) : 1,
        totalPages: totalPages

    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const updateStackOverFlowQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    if(!id) {
        return res.status(400).json({message: "Invalid Request, need an ID"});
    }
    res.send("Update Question");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const deleteStackOverFlowQuestion = async (req, res) => {
  try {
    const _id = req.params.id;
    if(!_id) {
        return res.status(400).json({message: "Invalid Request, need an ID"});
    }
    const stackOverFlowQuestion = await stackOverFlow.findByIdAndDelete(_id);
    if(!stackOverFlowQuestion) {
        return res.status(404).json({message: "Question not found"});
    }
    res.json({message: "Question Deleted Successfully"});
  } catch (error) {
    let handleError = error.message.split(":")[0];
    if(handleError.includes("98343")) {
        return res.status(404).json({message: "Question not found"});
    }
  }
};

export default {
  getStackOverFlowData,
  getStackOverFlowQuestions,
  updateStackOverFlowQuestion,
  deleteStackOverFlowQuestion,
};
