const { Router } = require("express");

const {
    showAddNewBlogPage,
    handleAddNewBlogPage,
    upload
} = require("../controllers/blog");
const Blog = require("../models/blog");

const router = Router();

router.get("/add-new", showAddNewBlogPage);
router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    return res.render('blog', {
        user: req.user,
        blog
    })
})
router.post("/", upload.single('coverImage'), handleAddNewBlogPage);

module.exports = router;
