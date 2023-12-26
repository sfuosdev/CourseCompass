import mongoose from 'mongoose';

const MajorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: String, 
    requiredCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    electiveCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    totalCreditsRequired: {
        type: Number,
        required: true
    },
    electiveCreditsRequired: Number,
    coreCreditsRequired: Number,
    minimumGPA: Number,
    additionalRequirements: {
        internships: {
            required: Boolean,
            details: String, // Description or specifics about the internship requirement
        },
        capstoneProject: {
            required: Boolean,
            details: String, // Description or specifics about the capstone project
        },
        languageRequirement: {
            required: Boolean,
            language: String, // Specific language requirement if applicable
        },
        wqbRequirements: {
            writingCourses: {
                lowerDivision: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course',
                    required: [true, 'Lower-division writing course required']
                },
                upperDivision: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course',
                    required: [true, 'Upper-division writing course required']
                },
            },
            quantitativeCourses: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
                required: [true, 'Quantitative courses required']
            }],
            breadthCourses: {
                humanities: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course'
                }],
                science: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course'
                }],
                socialSciences: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course'
                }],
                additional: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course'
                }],
            },
            totalWQBCredits: {
                type: Number,
                default: 36
            }
        },
        
    },
    
});

export default mongoose.models.Major || mongoose.model('Major', MajorSchema);
