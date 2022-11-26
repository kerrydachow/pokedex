const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema ({
    userType: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user',
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        maxLength: 1000
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('pokeuser', userSchema);
