const mongoose = require('mongoose');
const { Schema } = mongoose;

const shareVideoSchema = new Schema({
    title: String,
    thumbnail: String,
    description: String,
    sharedBy: String
});

module.exports = mongoose.model('ShareVideo', shareVideoSchema);