const express = require("express");
const Comment = require("../models/comment");
const router = new express.Router();
const checkAuth = require("../middlewares/check-auth");

router.post("", checkAuth, (req, res, next) => {
  console.log(req.body);
  const comment = new Comment({
    content: req.body.content,
    creator: req.userData.userId,
    post: req.body.postId,
  });
  console.log(comment);
  comment
    .save()
    .then((comment) => {
      if (comment) {
        res.status(201).json({
          message: "Comment added successfully",
          comment: {
            ...comment,
            id: comment._id,
          },
        });
      }

      if (!comment) {
        res.status(404).json({
          message: "Error Adding Comment",
        });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(501).json({ message: "Error Adding Comment" + e });
    });
});

router.put("/:id", checkAuth, (req, res, next) => {
  Comment.updateOne(
    {
      _id: req.params.id,
      creator: req.userData.userId,
      post: req.body.postId,
    },
    req.body
  ).then((result) => {
    if (result) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(500).json({ message: "Error Upating Comment" });
    }
  });
});

router.get("", (req, res, next) => {
  Comment.find().then((documents) => {
    if (documents) {
      res.status(200).json({
        message: "Comments fetched successfully!",
        comments: documents,
      });
    } else {
      res.status(404).json({ message: "Comment not found!" });
    }
  });
});

router.get("/:id", (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: "Comment not found!" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Comment.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    (result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        return res.status(401).json({ message: "Not authorized!!" });
      }
    }
  );
});

module.exports = router;
