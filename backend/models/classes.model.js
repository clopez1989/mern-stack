const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classesSchema = new Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    classesDescription: { type: String, required: true},
    gpa: { type: String, required: true },
    date: { type: Date, required: true },
},  {
timestamps: true,
});

const Classes = mongoose.model('Classes', classesSchema);

module.exports = Classes;