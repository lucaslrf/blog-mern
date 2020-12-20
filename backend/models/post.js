const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
     }]
});

module.exports = Post