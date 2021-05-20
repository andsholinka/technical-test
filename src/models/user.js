const mongoose = require('mongoose');
// console.log("db");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Number,
        default: 1,
    },
    role: {
        type: Number,
        default: 1,
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;