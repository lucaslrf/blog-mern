const express = require("express");
const checkAuth = require("../middlewares/check-auth");
const Profile = require("../models/profile");
const Post = require("../models/post");
const router = express.Router();

router.post("/create", (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(url);
  const profile = new Profile({
    username: req.body.username,
    bio: req.body.bio,
    creator: req.body.userId,
  });
  Profile.findOne({ creator: req.body.userId })
    .then((user1) => {
      if (user1) {
        return res.status(401).json({
          message: "Profile Already Exist",
        });
      }
      return profile.save();
    })
    .then((prof) => {
      if (!prof) {
        return res.status(500).json({
          message: "Error Creating Profile",
        });
      }
      res.status(201).json({
        message: "Profile created!",
        profile: prof,
      });
    })
    .catch((e) => {
      console.log("error is", e);
    });
});

router.put("/edit/:id", checkAuth,  (req, res, next) => {
    Profile.findById( req.params.id, function(error, profile){
        if(error) return next(error);
        if(!profile) {
            return res.status(404).json({
              message: 'Profile with id ' + id + ' can not be found.'
            });
          }
          
          profile.updateOne(req.body, function(error, profile) {
            if(error) return res.status(500).json({ message: "Error Upating Profile" });
            res.status(200).json({ message: "Update successful!" });
          });
    });
  }
);

router.get("/profiles", (req, res, next) => {
  Profile.find()
    .then((prof) => {
      if (prof) {
        res.status(200).json({
          message: "Profile fetched successfully!",
          profile: prof,
        });
      } else {
        res.status(404).json({ message: "Profile not found!" });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

router.get("/viewprofile", checkAuth, (req, res, next) => {
  Profile.findOne({ creator: req.userData.userId }).then((prof) => {
    if (prof) {
      res.status(200).json({
        message: "Profile fetched successfully!",
        profile: prof,
      });
    } else {
      res.status(404).json({ message: "Profile not found!" });
    }
  });
});

router.get("/bycreator/:id", (req, res, next) => {
  Profile.findOne({ creator: req.params.id }).then((prof) => {
    if (prof) {
      res.status(200).json({
        message: "Profile fetched successfully!",
        profile: prof,
      });
    } else {
      res.status(404).json({ message: "Profile not found!" });
    }
  });
});
router.get("/:id/mypost", (req, res, next) => {
  let user;
  let creatorId;
  Profile.findOne({ username: req.params.id })
    .then((prof) => {
      if (prof) {
        user = prof;
        return Post.find({ creator: user.creator });
      }
    })
    .then((post) => {
      res.status(200).json({
        message: "Post fetched successfully!",
        post: post,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(404).json({ message: "error Fetching Post!" });
    });
});

router.get("/:id", (req, res, next) => {
  let creatorId;
  Profile.findOne({ username: req.params.id }).then((prof) => {
    if (prof) {
      res.status(200).json({
        message: "Profile fetched successfully!",
        profile: prof,
      });
    } else {
      res.status(404).json({ message: "Profile not found!" });
    }
  });
});

module.exports = router;
