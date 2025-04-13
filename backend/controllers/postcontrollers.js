import { Post } from "../models/postmodel.js";



export const checkapi = async(req,res)=>{
    console.log("hello world ")
    res.status(200).json({ message: "Check route works!" });
}

export const createpost = async (req, res) => {
  try {
    const { title, content, imageurl, author, clerkid } = req.body;

    if (!title || !content || !imageurl || !author || !clerkid) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Create a new post document
    const newPost = new Post({
      title,
      content,
      imageurl,
      author,
      clerkid,
    });

    // Save to database
    await newPost.save();

    return res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

  
export const getallPost = async (req, res) => {
  try {
    const allpost = await Post.find();
    return res.status(200).json({ success: true, allpost });
  } catch (error) {
    console.log("Get all posts error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getonePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    return res.status(200).json({ success: true, post });
  } catch (error) {
    console.log("Get one post error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUserpost = async (req, res) => {
  const { clerkid } = req.params;

  try {
    const userpost = await Post.find({ clerkid });

    if (!userpost || userpost.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this user",
      });
    }

    return res.status(200).json({ success: true, userpost });
  } catch (error) {
    console.log("Get user posts error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const deletepost = async (req,res)=>{
    const {id} = req.params
 

    try {
        const post = await Post.findById(id)
        if(!post){
            return res.status(338).json({success:false,message:"no post found here "})
        }
   

        await post.deleteOne();

        return res.status(200).json({
          success: true,
          message: "Post deleted successfully",
        });

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"internal server erro"})
        
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { clerkid, title, content, imageurl } = req.body;
  
    try {
      if (!id || !clerkid) {
        return res.status(400).json({
          success: false,
          message: "Please provide post ID and clerk ID",
        });
      }
  
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
     
  
      // Update fields (only if provided)
      if (title) post.title = title;
      if (content) post.content = content;
      if (imageurl) post.imageurl = imageurl;
  
      await post.save();
  
      return res.status(200).json({
        success: true,
        message: "Post updated successfully",
        post,
      });
    } catch (error) {
      console.log("Update post error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  

