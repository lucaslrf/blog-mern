const mongoose = require('mongoose');

const Rating = mongoose.model('Rating', {
    quantityStars: {
        type: Number,
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

module.exports = Rating