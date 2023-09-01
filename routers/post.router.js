<<<<<<< HEAD
const CustomError = require("../helpers/custom-error");
=======
const CustomError = require("../helpers/customError");
>>>>>>> master
const { authMiddleware } = require("../middlewares/auth");
const { PostService } = require("../services/post.service");

const router = require("express").Router();
router.get("/", async (req, res, next) => {
  try {
    const allPosts = await PostService.findAllPost();
    res.send({
      statusCode: 200,
      msg: "succeed find all posts",
      posts: allPosts.map((post) => ({
        id: post.id,
        title: post.title,
        userid: post.userid,
      })),
    });
  } catch (err) {
    next(err);
  }
});
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;

    const post = await PostService.findPost(id);
    if (!post) throw new CustomError(404, "not found");

    res.send({
      statusCode: 200,
      msg: "succeed find post",
      post: post,
    });
  } catch (err) {
    next(err);
  }
});
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const createdPost = {
      title: title,
      content: content,
      userid: req.user.userid,
    };
    await PostService.createPost(createdPost);
    res.send({
      statusCode: 200,
      msg: "succeed create post",
    });
  } catch (err) {
    next(err);
  }
});
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    const updatedPost = {
      title: title,
      content: content,
      updatedAt: new Date(),
    };
    await PostService.updatePost(id, req.user.userid, updatedPost);
    res.send({
      statusCode: 200,
      msg: "succeed update post",
    });
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;
    await PostService.deletePost(id, req.user.userid);
    res.send({
      statusCode: 200,
      msg: "succeed delete data",
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
