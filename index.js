const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path")
const multer = require("multer")
const postmodel = require("./models/postmodel")
// const commentmodel = require("./models/commentmodel")

const app = express();

mongoose.connect("mongodb+srv://instaclone:instaclone@cluster0.4eofi.mongodb.net/Instaclone?retryWrites=true&w=majority")
.then(()=>console.log("connection successful"))
.catch((e)=>console.log(e));


app.use(express.json());
app.use("/uploads", express.static("uploads"))

var storage = multer.diskStorage({
    destination : (req,file, cb) => {
        cb(null,"uploads/");
    },
    filename : (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({storage});

app.post('/api/upload',upload.single("image"), async(req,res,next)=>{
    try{
    const data = {
        image : req.file.path,
        name: req.body.name,
        location:req.body.location, 
        // likes: req.body.likes,
        description : req.body.description,
        // image : req.file.path
        // date = Date.now()
    }
    console.log(data)
    const post = await postmodel.create(data)
    // console.log(post)
    res.json({
        status: "post created",
        post: post
    })
}catch(e){
    res.json({
        status: "post invalid",
        message: e.message
    })
}
})
app.get("/api/getposts", async (req,res)=>{
    try{
      const posts = await postmodel.find()
      res.status(200).json({
          status: "succesfull",
          posts : posts
      })
    }catch(e){
        res.json({
            status : "couldnt get posts",
            message : e.message
        })
    }
});

app.listen(3007,()=>{
    console.log("server is listening at port 3007")
})
