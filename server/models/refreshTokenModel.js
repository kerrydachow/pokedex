const mongoose  = require('mongoose');

const refreshTokenSchema = new mongoose.Schema ({
    refreshToken: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = mongoose.model('activeRefreshTokens', refreshTokenSchema);
