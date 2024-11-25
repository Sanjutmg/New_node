const express = require("express");
const blogRouter = express.Router();
const { getAllBlogs,addBlog,updateBlog,getId,deleteBog } = require("../controller/blog_controller");


blogRouter.get("/",getAllBlogs)
blogRouter.post("/add",addBlog)
blogRouter.put("/update/:id",updateBlog)
blogRouter.get("/:id",getId)
blogRouter.delete("/:id",deleteBog)
module.exports =  blogRouter;
