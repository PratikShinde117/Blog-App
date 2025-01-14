import express from "express";
import bodyParser from "body-parser";

let app = express();
let port = 3000;

app.use(express.static("public"))
let blogs = [];
app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , (req , res) => {
    res.render("home.ejs");
});

app.get("/create" , (req , res) => {
    res.render("create.ejs");
});

app.post("/create" , (req , res) => {
    let {title , content} = req.body;
    blogs.push({
        id : blogs.length + 1,
        title,
        content,
        date : new Date().toLocaleString(), 
    })
    res.redirect("/view");
});

app.get("/view" , (req , res) => {
    res.render("view.ejs" , {blogs})
})

app.get("/update/:id" , (req , res) => {
    let blog = blogs.find((b) => b.id === parseInt(req.params.id));
    if(blog){
        res.render("update.ejs" , {blog : blog});
    }
    else{
        res.status(404).send("Blog not Found");
    }
});

app.post("/update/:id" , (req , res) => {
    let {title , content} = req.body;
    let id = parseInt(req.params.id);
    let blog = blogs.find((b) => b.id === id);

    if(blog){
        blog.title = title;
        blog.content = content;
        res.redirect("/view");
    }
    else{
        res.status(404).send("Blog not Found");
    }
});

app.post("/delete/:id" , (req , res) => {
    let id = parseInt(req.params.id);
    let searchInd = blogs.findIndex((blog) => blog.id === id);
    if(searchInd > -1){
        blogs.splice(searchInd , 1);
        res.redirect("/view")
    }
    else{
        res.status(404).json("error");
    }
})


app.listen(port , () => {
    console.log(`Listening at ${port}`);
})
