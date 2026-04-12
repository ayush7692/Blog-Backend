const Blog = require('../models/Blog');
const User = require('../models/User');

// Get all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 }).populate('user', 'avatar');
  res.json(blogs);
};

// Get single blog
const getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', 'avatar');

  if (!blog) {
    return res.status(404).json({ msg: 'Blog not found' });
  }

  res.json(blog);
};

// Create blog
const createBlog = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ msg: 'Please add all fields' });
  }

  const blog = await Blog.create({
    title,
    description,
    author: req.user.name,
    user: req.user.id,
  });

  const populatedBlog = await Blog.findById(blog._id).populate('user', 'avatar');
  res.status(201).json(populatedBlog);
};

// Delete blog
const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ msg: 'Blog not found' });
  }

  // Check for user
  if (blog.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  await blog.deleteOne();
  res.json({ id: req.params.id });
};

// Update blog
const updateBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
  
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }
  
    // Check for user
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('user', 'avatar');
  
    res.json(updatedBlog);
  };

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog
};
