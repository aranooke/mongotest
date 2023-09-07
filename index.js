const express = require('express');
const path = require("path");
const app = new express();
const mongoose = require("mongoose");
const expressEdge = require('express-edge');
const bodyParser = require('body-parser');

const Post = require('./database/models/Post');


mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))


app.use(express.static('public'));
app.use(expressEdge);
app.set('views', __dirname + '/views');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));



app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
});
app.get("/about",(req,res)=> {
    res.sendFile(path.resolve(__dirname,"pages/about.html"))
})  
app.get('/posts/new', (req, res) => {
    res.render('create')
});
app.get("/contact",(req,res)=> {
    res.sendFile(path.resolve(__dirname,"pages/contact.html"))
})  
app.get("/post",(req,res)=> {
    res.sendFile(path.resolve(__dirname,"pages/post.html"))
})  

app.listen(4000, () => {
    console.log('App listening on port 4000')
}); 
