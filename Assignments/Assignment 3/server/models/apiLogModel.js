const mongoose  = require('mongoose');

const apiLogSchema = new mongoose.Schema ({
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
    requestee: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('apiLog', apiLogSchema);
