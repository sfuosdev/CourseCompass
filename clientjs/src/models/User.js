import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const CompletedCourseSchema = new mongoose.Schema({
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    semesterCompleted: String,
    yearCompleted: Number,
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [
            /^[a-zA-Z0-9._-]+@sfu\.ca$/,
            'Please provide a valid SFU email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    majors: {
        type: [String], // Array of strings to store multiple majors
        default: []
    },
    minors: {
        type: [String], // Array of strings to store multiple minors
        default: []
    },
    
    courseReviews: {
        type: [{
            courseId: mongoose.Schema.Types.ObjectId,
            reviewText: String,
            rating: Number,
            // Additional fields as required
        }],
        default: [],
    },
    
    completedCourses: [CompletedCourseSchema],


    favoriteCourses: { // Adding favorite courses
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }],
        default: [],
    },
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to match user-entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};



export default mongoose.models.User || mongoose.model('User', UserSchema);
