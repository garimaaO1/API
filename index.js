const express = require("express");
const app = express();
const PORT = 8000;
require("./db");
require("dotenv").config();
const Post = require("./MODELS/Post");
const User = require("./MODELS/User");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user signup api
app.post("/api/signup", async (req, res) => {
  let user = await User.create(req.body);
  res.status(200).json({ success: true, user: user });
});

// create post api
app.post("/api/posts", async (req, res) => {
  let post = await Post.create(req.body);
  res.status(200).json({ success: true, post });
});

// delete post api
app.delete("/api/deletepost/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const deletedPost = await Post.findByIdAndRemove(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// fetch user's post api
app.get("/api/posts/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userPosts = await Post.find({ userId });

    res.status(200).json({ success: true, userPosts});
  } 
  catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
