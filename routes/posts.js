import express from "express";
import Post from "../models/Post.js";


const router = express.Router();


router.get("/newpost", (req, res) => {
    res.render("newpost.ejs");
});

router.post("/submit", async (req, res) => {
    await Post.create({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        imageUrl: req.body.imageUrl,
    });
    res.redirect("/posts");
});


router.get("/posts", async (req, res) => {
    const allPosts = await Post.find({});
    res.render("posts.ejs",{posts : allPosts});
});

router.get("/post/:id", async (req, res) => {
    const foundPost = await Post.findById(req.params.id);
    if (foundPost) {
        res.render("post.ejs", { post: foundPost });
    } else {
        res.send("<h1>post not found</h1>");
    }
});


router.get("/editpost", (req, res) => {
    res.render("editpost.ejs", { postToEdit: null });
});

router.post("/search-edit", async (req, res) => {
    
    const foundPost = await Post.findOne({title : req.body.searchtitle})
    console.log("DATABASE FOUND THIS:", foundPost);
    res.render("editpost.ejs", { postToEdit: foundPost });
    
});

router.post("/update", async (req, res) => {
    
    console.log("INCOMING DATA FROM FORM:", req.body); 

    await Post.findByIdAndUpdate(req.body.id, {
        title : req.body.title,
        content : req.body.content,
        imageUrl : req.body.imageurl 
    });

    res.redirect("/posts");
});

router.post("/delete", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.body.id);
        res.redirect("/posts"); 
    } catch (error) {
        console.log("Error deleting post:", error);
        res.status(500).send("Something broke while trying to delete!");
    }
});

router.post("/search-delete", async (req, res) => {
    const foundPost = await Post.findOne({ title: req.body.searchtitle });
    console.log("DATABASE FOUND THIS TO DELETE:", foundPost);
    res.render("delete.ejs", { postToDelete: foundPost });
});

router.get("/delete", (req, res) => {
    res.render("delete.ejs", { postToDelete: null });
});

export default router;
