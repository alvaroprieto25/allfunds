const { Schema, model } = require('mongoose');

const newSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    content: String,
    author: String,
    archiveDate: Date
})

module.exports = model('New', newSchema);