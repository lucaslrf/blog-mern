const express = require("express");
const Rating = require("../models/rating");
const router = new express.Router();
const checkAuth = require("../middlewares/check-auth");

router.post("", checkAuth, (req, res, next) => {
  console.log(req.body);
  const rating = new Rating({
    quantityStars: req.body.quantityStars,
    creator: req.userData.userId,
    post: req.body.postId,
  });

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
});

router.put("/:id", checkAuth, (req, res, next) => {
  Rating.updateOne(
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
      res.status(500).json({ message: "Error Upating Rating" });
    }
  });
});

router.get("", (req, res, next) => {
  Rating.find().then((documents) => {
    if (documents) {
      res.status(200).json({
        message: "Ratings fetched successfully!",
        ratings: documents,
      });
    } else {
      res.status(404).json({ message: "Rating not found!" });
    }
  });
});

router.get("/:id", (req, res, next) => {
  Rating.findById(req.params.id).then((rating) => {
    if (rating) {
      res.status(200).json(rating);
    } else {
      res.status(404).json({ message: "Rating not found!" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Rating.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
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
