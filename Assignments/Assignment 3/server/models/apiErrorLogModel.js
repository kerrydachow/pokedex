const mongoose  = require('mongoose');

const apiErrorLogSchema = new mongoose.Schema ({
    pathName: {
        type: String,
        required: true
    },
    query: {
        type: String,
    },
    path: {
        type: String,
        required: true,
    },
    request: {
        type: String,
        required: true,
    },
    statusCode: {
        type: Number,
        required: true,
    },
    responseCode: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('apiErrorLog', apiErrorLogSchema);
