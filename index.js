import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));

let posts = [
    {
        id: 1,
        title: "Learning Express",
        content: "Express makes routing so much easier!",
        imageUrl: "", 
        date: "2026-04-10"
    }
];


app.use(express.static("public"))

app.set("view engine", "ejs");


app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.get("/about",(req,res)=>{
    res.render("about.ejs")
})

app.get("/newpost",(req,res)=>{
    res.render("newpost.ejs")
})

app.get("/editpost",(req,res)=>{
    res.render("editpost.ejs")
})

app.get("/posts",(req,res)=>{
    res.render("posts.ejs",{posts : posts})
})

app.post("/submit",(req,res)=>{
    

    posts.push({
     id : posts.length+1,
     title : req.body.title,
     content : req.body.content,
     date : req.body.date,
     imageUrl : req.body.imageUrl,
    })

    res.redirect("/posts");
})


app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})

