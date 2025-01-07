import mongoose from 'mongoose';

const stackOverFlowSchema = new mongoose.Schema({  

    tags : {
        type: Array,
        required: true
    },
    owner : {
        type: Object,
        required: true
    },

    is_answered : {
        type: Boolean,
        required: true
    },

    view_count : {
        type: Number,
        required: true
    },

    answer_count : {
        type: Number,
        required: true
    },

    score : {
        type: Number,
        required: true
    },

    last_activity_date : {
        type: Number,
        required: true
    },

    creation_date : {
        type: Number,
        required: true
    },

    last_edit_date : {
        type: Number,
        required: false
    },

    question_id : {
        type: Number,
        unique: true,
        required: true
    },

    content_license : {
        type: String,
        required: false
    },

    link : {
        type: String,
        unique: true,
        required: true
    },

    title : {
        type: String,
        unique: true,
        required: true
    }


 });

const stackOverFlowModel = mongoose.model('stackOverFlow', stackOverFlowSchema);

export default stackOverFlowModel;