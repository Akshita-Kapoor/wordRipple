const { Router } = require("express");

const {
    showAddNewBlogPage,
    handleAddNewBlogPage,
    upload
} = require("../controllers/blog");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = Router();

router.get("/add-new", showAddNewBlogPage);
router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({blogId: req.params.id}).populate("createdBy")
    return res.render('blog', {
        user: req.user,
        blog,
        comments
    })
})
router.post("/", upload.single('coverImage'), handleAddNewBlogPage);

router.post("/comment/:blogId", async(req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`);
})
module.exports = router;
