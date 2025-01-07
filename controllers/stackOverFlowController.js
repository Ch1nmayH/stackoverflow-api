import stackOverFlow from "../models/stackOverFlowModel.js";
import axios from "axios";
import mongoose from "mongoose";

const getStackOverFlowData = async (req, res) => {
  try {
    const url = `https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow&pagesize=100&page=1`;
    const response = await axios.get(url);
    const data = response.data.items;
    // const deleteData = await stackOverFlow.deleteMany();
    data.map(async (item) => {
      const alreadyExists = await stackOverFlow.findOne({
        question_id: item.question_id,
        title: item.title,
        link: item.link,
      });
      if (alreadyExists) {
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
      limit,
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
      filter.tags = { $in: tags.split(",") };
    }

    if (answers_count__gt) {
      filter.answer_count = { $gt: parseInt(answers_count__gt) };
    }

    if (answers_count__lt) {
      filter.answer_count = { $lt: parseInt(answers_count__lt) };
    }

    let sortFilter = {};

    if (sort) {
      if (sort === "score".toLocaleLowerCase()) {
        sortFilter.score = -1;
      }

      if (sort === "created_at".toLocaleLowerCase()) {
        sortFilter.creation_date = -1;
      }
    }

    if (!limit) {
      limit = 5;
    }
    if (!page) {
      page = 1;
    }
    const skip = (page - 1) * limit;

    const totalQuestions = await stackOverFlow.countDocuments(filter);
    const totalPages = Math.ceil(totalQuestions / limit);

    const stackOverFlowQuestions = await stackOverFlow
      .find(filter)
      .sort(sortFilter)
      .limit(limit)
      .skip(skip);

    return res.json({
      data: stackOverFlowQuestions,
      total: totalQuestions,
      page: page ? parseInt(page) : 1,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const updateStackOverFlowQuestion = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).json({ message: "Invalid Request, need an ID" });
    }

    const {
      title,
      tags,
      owner,
      is_answered,
      view_count,
      answer_count,
      score,
      last_activity_date,
      creation_date,
      last_edit_date,
      question_id,
      content_license,
      link,
    } = req.body || {};
    let updateData = {};

    if (title) updateData.title = title;
    if (tags) updateData.tags = tags;
    if (owner) updateData.owner = owner;
    if (is_answered) updateData.is_answered = is_answered;
    if (view_count) updateData.view_count = view_count;
    if (answer_count) updateData.answer_count = answer_count;
    if (score) updateData.score = score;
    if (last_activity_date) updateData.last_activity_date = last_activity_date;
    if (creation_date) updateData.creation_date = creation_date;
    if (last_edit_date) updateData.last_edit_date = last_edit_date;
    if (question_id) updateData.question_id = question_id;
    if (content_license) updateData.content_license = content_license;
    if (link) updateData.link = link;

    if (Object.keys(updateData).length > 0) {
      const stackOverFlowQuestion = await stackOverFlow.findByIdAndUpdate(
        _id,
        {
          $set: updateData,
        },
        { new: true }
      );
      if (!stackOverFlowQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
      return res
        .status(200)
        .json({
          message: "Successfully Updated the question.",
          stackOverFlowQuestion,
        });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid Request, Empty object provided." });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      // Handle invalid ObjectId error
      return res.status(400).json({ message: "Invalid Question ID format" });
    }

    // For other types of errors, log and send a general server error
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request" });
  }
};

const deleteStackOverFlowQuestion = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).json({ message: "Invalid Request, need an ID" });
    }
    const stackOverFlowQuestion = await stackOverFlow.findByIdAndDelete(_id);
    if (!stackOverFlowQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.json({ message: "Question Deleted Successfully" });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid Question ID format" });
    }

    return res
      .status(500)
      .json({ message: "An error occurred while processing your request" });
  }
};

export default {
  getStackOverFlowData,
  getStackOverFlowQuestions,
  updateStackOverFlowQuestion,
  deleteStackOverFlowQuestion,
};
