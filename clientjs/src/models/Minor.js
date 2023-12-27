import mongoose from 'mongoose';

const MinorSchema = new mongoose.Schema({
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
    totalCreditsRequired: Number,
    electiveCreditsRequired: Number,
    coreCreditsRequired: Number,
    minimumGPA: Number,
    wqbRequirements: {
        writingCourses: {
            lowerDivision: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            },
            upperDivision: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            },
        },
        quantitativeCourses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
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
        totalWQBCredits: Number
    },
    additionalRequirements: {
        languageRequirement: {
            required: Boolean,
            language: String, // Specific language requirement if applicable
        },
        internships: {
            required: Boolean,
            details: String, // Description or specifics about the internship requirement
        },
     
    },
   
});

export default mongoose.models.Minor || mongoose.model('Minor', MinorSchema);
