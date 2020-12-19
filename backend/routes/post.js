const express = require('express')
const Post = require('../models/post')
const router = new express.Router()
const checkAuth = require("../middlewares/check-auth");

router.post("",  checkAuth, (req, res, next) => {
    console.log(req.body)
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        creator: req.userData.userId,
        postDate: Date.now()
    })
    console.log(post)
    post.save().
        then(post => {
            if(post){
                res.status(201).json({
                    message: "Post added successfully",
                    post: {
                        ...post,
                        id: post._id
                    }
                })
            }

                if(!post){
                    res.status(404).json({
                        message: "Error Adding Post",
                        
                    })
                }
            
            
        })
        .catch(e => {
            console.log(e)
            res.status(501).json({ message: "Error Adding Post"+e });
        })
})


router.put("/:id", checkAuth,  (req, res, next) => {

        Post.updateOne(
            { _id: req.params.id, creator: req.userData.userId },
            req.body
          ).then(result => {
            if(result){
                res.status(200).json({ message: "Update successful!" });
            }
            
            else {
                res.status(500).json({ message: "Error Upating Post" });
            }
        });
    }
);



router.get("/my-posts", checkAuth, (req, res, next) => {
    Post.find({creator: req.userData.userId}).then(post => {
      if (post) {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: post
        });
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch(e=>{
        console.log(e)
    });
  });
  

router.get("", (req, res, next) => {
    Post.find().then(documents => {
        if(documents){
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: documents
            });
        }
        else{
            res.status(404).json({ message: "Post not found!" });
        }
       
    });
});


router.get("/bydate", (req, res, next) => {
  Post.find().sort({postDate: -1}).then(documents => {
    if(documents){
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: documents
        });
    }
    else{
        res.status(404).json({ message: "Post not found!" });
    } 
  });
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    });
  });
  
  router.delete("/:id", checkAuth, (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
      result => {
        console.log(result);
        if (result.n > 0) {
          res.status(200).json({ message: "Deletion successful!" });
        } else {
            return res.status(401).json({ message: "Not authorized!!" });
        }
      }
    );
  });

module.exports = router