const express = require("express");
const Rating = require("../models/rating");
const router = new express.Router();

router.post("", (req, res, next) => {
  console.log(req.body);
  const quantityExistStars = 0;

  const rating = new Rating({
    quantityStars: req.body.quantityStars + quantityExistStars,
    post: req.body.postId,
  });

  Rating.findOne({ post: req.body.postId }, function (error, rat) {
    if (rat) {
      const quantityExistStars = rat.quantityStars;
      const body = {
        quantityStars: req.body.quantityStars + quantityExistStars,
        post: req.body.postId,
      };
      rat.updateOne(body, function (error, rat) {
        res.status(200).json({ message: "Update successful!", rating: body });
      });
    } else {
      rating
        .save()
        .then((rating) => {
          if (rating) {
            res.status(201).json({
              message: "Rating added successfully",
              rating: {
                ...rating,
                id: rating._id,
              },
            });
          }

          if (!rating) {
            res.status(404).json({
              message: "Error Adding Rating",
            });
          }
        })
        .catch((e) => {
          console.log(e);
          res.status(501).json({ message: "Error Adding Rating" + e });
        });
      console.log("rating new", rating);
    }
  });
});

router.get("/bypost/:id", (req, res, next) => {
  Rating.findOne({ post: req.params.id }).then((rating) => {
    if (rating) {
      res.status(200).json({
        message: "Rating fetched successfully!",
        rating: rating,
      });
    } else {
      res.status(200).json({ message: "Rating not found!", rating: null });
    }
  });
});

router.get("", (req, res, next) => {
  Rating.find().then((ratings) => {
    if (ratings) {
      res.status(200).json({
        message: "Ratings fetched successfully!",
        ratings: ratings,
      });
    } else {
      res.status(404).json({ message: "Rating not found!" });
    }
  });
});

router.get("/posts-by-rating", (req, res, next) => {
  Rating.find()
    .sort({ quantityStars: -1 })
    .populate("post")
    .then((documents) => {
      if (documents) {
        const posts = [];
        documents.map((document) => {
          posts.push(document.post);
        });
        res.status(200).json({
          message: "Posts fetched successfully!",
          posts: posts
        });
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    });
});

module.exports = router;
