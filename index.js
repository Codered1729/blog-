import express from "express";

import postRoutes from "./routes/posts.js";

const app = express();
const port = 3000;

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