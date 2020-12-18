const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const db = require("./db/db");
const header_middleware = require("./middlewares/header")
const postRouter = require("./routes/post");
const userRoutes = require("./routes/user");
const profileRouter = require("./routes/profile");
const cors = require('cors');
const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(header_middleware)
const directory = path.join(__dirname, './images');
app.use("/images", express.static(directory));
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// app.use("/", express.static(path.join(__dirname, 'angular')));

app.use("/api/posts", postRouter);
app.use("/api/my-posts", postRouter);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRouter);

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "angular", "index.html"))
// });
app.listen(PORT, (req, res) => {
  console.log(`app is listening to PORT ${PORT}`)
})