const Blog = require("../models/blog");
const multer = require("multer");
const path = require("path");

async function showAddNewBlogPage(req, res) {
  return res.render("addBlog", {
    user: req.user,
  });
}
async function handleAddNewBlogPage(req, res) {    
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  showAddNewBlogPage,
  handleAddNewBlogPage,
  upload,
};
