const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    usefulnessRating: {
        type: Number,
        required: true,
        min: 1, // assuming a scale of 1-5
        max: 5
    },
    difficultyRating: {
        type: Number,
        required: true,
        min: 1, // assuming a scale of 1-5
        max: 5
    },
    comment: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    upvotes: {
        type: Number,
        default: 0
    },
    

    
});

module.exports = mongoose.model('Review', ReviewSchema);
