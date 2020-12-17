const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', {
    content: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
     },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
     }
});

module.exports = Comment