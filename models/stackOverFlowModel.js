import mongoose from 'mongooose';

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
        required: true
    },

    question_id : {
        type: Number,
        required: true
    },

    content_license : {
        type: String,
        required: true
    },

    link : {
        type: String,
        required: true
    },

    title : {
        type: String,
        required: true
    }


 });

const stackOverFlowModel = mongoose.model('stackOverFlow', stackOverFlowSchema);

export default stackOverFlowModel;