import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false//change later
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: false//change later
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

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
