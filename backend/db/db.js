const mongoose = require('mongoose');

const url = "mongodb+srv://user_stack:blogmern@blog-mern.cx4et.mongodb.net/blog-web?retryWrites=true&w=majority";

let mongo = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});