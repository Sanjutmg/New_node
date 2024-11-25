const { default: mongoose } = require("mongoose");
const Blog = require("../models/Blog");
const User = require("../models/User");
const session = require("express-session");

//get
const getAllBlogs = async (req,res)=>{
    let blogs;
    try{
        blogs = await Blog.find();
        if(!blogs){
            return res.status(404).json({message:"No Blogs Found"})
        }
        console.log('show data');
        return res.status(200).json({blogs})
    }catch(err){
        return console.log(err);
    }
    

}
//post
const addBlog = async (req,res)=>{

    const { title, description, image, user } = req.body;

    let existingUser;
    try{
        existingUser = await User.findById(user);


    }catch(err){
        return console.log(err)

    }
    if(!existingUser){
        return res.status(400).json({message:"Unable TO find User by this Id"})
    }
    const blog = new Blog({
        title,description,image,user,
    });

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session})
        await session.commitTransaction();

    }catch(err){
        console.log(err);
        return res.status(500).json({message: err});

    }
    return res.status(200).json({blog});
};


const updateBlog = async (req,res)=>{
  
    try{
        const { title,description} = req.body;
        const blogId = req.params.id;
    
        const blog = await Blog.findByIdAndUpdate(blogId, {
    title,description
    })
    if(!blog){
        return res.status(500).json({message: "Unable To Update The Blog"})
    }
    console.log('data Updated');
    return res.status(200).json({blog});
    }catch(err){
        return console.log(err)

    }

    
};

const getId = async (req,res)=>{
 

    try{
        const id = req.params.id;
       
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json({message:"No Blog Found"})
        }
        console.log('data fetch');
        return res.status(200).json({blog});


    }catch(err){
        return console.log(err);

    }
 

};

const deleteBog = async (req,res)=>{
  

    try{
        const id = req.params.id;
        const blog = await Blog.findByIdAndDelete(id)
        if(!blog){
            return res.status(400).json({message:"Unable To Delete"})
        }
        console.log("Data Delete");
        return res.status(200).json({message:"Successfully Delete"})
    }catch(err){
        console.log(err);
        
    }
}

module.exports = { getAllBlogs,addBlog,updateBlog,getId,deleteBog};