import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";

const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/blogDB")
    .then(()=>console.log("mongo working"))
    .catch((err) => console.log("mongo not working", err));



app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});


app.use("/", postRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});