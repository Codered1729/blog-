import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));

let posts = [
    {
        id: 1,
        title: "Learning Express",
        content: "Express makes routing so much easier!",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh9LF5JqsU1wvQGZtZ1pR-vHry4a6ai9MPdA&s", 
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
    res.render("editpost.ejs",{postToEdit : null})
})


app.post("/update",(req,res)=>{

    const editid = parseInt(req.body.id);
    const editingpost = posts.find(post => post.id === editid);

    if(editingpost){
        editingpost.title = req.body.title;
        editingpost.content = req.body.content
    }

    res.redirect("/posts")
    
})

app.post("/search-edit",(req,res)=>{

    const reqtitle = req.body.searchtitle;
    const found = posts.find(post => post.title === reqtitle);

    if(found){
        res.render("editpost.ejs",{postToEdit : found})
    } else {
        res.render("editpost.ejs",{postToEdit: null})
    }
    
})

app.post("/search-delete",(req,res)=>{

    const reqtitle = req.body.searchtitle;
    const found = posts.find(post => post.title === reqtitle);

    if(found){
        res.render("delete.ejs",{postToDelete : found})
    } else {
        res.render("delete.ejs",{postToDelete : null})
    }
    
})


app.get("/delete",(req,res)=>{
    res.render("delete.ejs",{postToDelete : null});
})
app.post("/delete",(req,res)=>{
    
    const reqid = parseInt(req.body.postid);
    post = posts.filter(post => post.id !== reqid)
    res.redirect("/posts")    
})

app.get("/post/:id",(req,res)=>{

    const reqid = parseInt(req.params.id);
    const found = posts.find(post => post.id === reqid);

    if(found){
        res.render("post.ejs",{post : found})
    } else {
        res.send("<h1>post not found</h1>")
    }
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

