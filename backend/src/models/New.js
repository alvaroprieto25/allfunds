const { Schema, model } = require('mongoose');


// Schema
const newSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    content: String,
    author: String,
    archiveDate: Date
})

// Model 
module.exports = model('New', newSchema);