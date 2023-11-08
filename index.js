const express = require("express");
const { url } = require("inspector");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')


let app = express();
const path = require("path");
const port = 8080;
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

let posts = [
  {
    id: uuidv4(),
    username : "deepanshu_tyagi",
    content : "hi my name is deepanshu tyagi from ransura deoband",
  },
  {
    id: uuidv4(),
    username : "Himanshu",
    content : "hi my name is Himanshu tyagi from ransura deoband",
  },
  {
    id: uuidv4(),
    username : "arjun",
    content : "hi my name is arjun tyagi from ransura deoband",
  }
];
app.listen(port,()=>{
  console.log(`${port}server start`)
});

app.get("/posts", (req, res) => {
  res.render("index.ejs",{ posts });
});
app.get("/posts/new",(req,res)=>{
  res.render("form.ejs");
});

app.post("/posts",(req,res)=>{
  let {username, content} = req.body;
  let id  = uuidv4();
  posts.push({ id , username , content});
  res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
  let {id} = req.params;
  let post = posts.find((p)=> id === p.id);
  res.render("show.ejs",{post});
 
});

app.patch("/posts/:id",(req,res)=>{
  let {id} = req.params;
  let newcontent = req.body.content;
  let post = posts.find((p)=> id === p.id);
  post.content = newcontent;
  console.log(newcontent);
  res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
  let {id} = req.params;
  let post = posts.find((p)=> id === p.id);
  res.render("edit.ejs",{ post });
 
  
});

app.delete("/posts/:id",(req,res)=>{
  let {id} = req.params;
  posts = posts.filter((p)=> id !== p.id);
  res.redirect("/posts")
})
