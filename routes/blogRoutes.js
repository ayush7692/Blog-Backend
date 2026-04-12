const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getBlogs).post(protect, createBlog);
router.route('/:id').get(getBlog).delete(protect, deleteBlog).put(protect, updateBlog);

module.exports = router;
