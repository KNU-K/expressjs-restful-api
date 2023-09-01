const { Sequelize } = require("sequelize");
const { Post } = require("../models");
const CustomError = require("../helpers/custom-error");

posts = [];
class PostService {
  static async initializePost() {
    try {
      const foundPosts = await Post.findAll();
      posts = foundPosts.map((post) => ({
        id: post.dataValues.id,
        title: post.dataValues.title,
        content: post.dataValues.content,
        createdAt: post.dataValues.createdAt,
        updatedAt: post.dataValues.updatedAt,
        userid: post.dataValues.userid,
      }));
    } catch (err) {
      throw err;
    }
  }
  static async createPost(createdPost) {
    try {
      const newPost = await Post.create(createdPost);
      posts.push(newPost.dataValues);
    } catch (err) {
      throw err;
    }
  }
  static async deletePost(id, userid) {
    try {
      const affectedRow = await Post.destroy({
        where: {
          id: id,
          userid: userid,
        },
      });
      if (affectedRow == 0)
        throw new CustomError(403, "this post is not yours or already delete");
      console.log(affectedRow);
      posts = posts.filter((post) => post.id != id);
    } catch (err) {
      throw err;
    }
  }
  static async updatePost(id, userid, updatedPost) {
    try {
      const [affectedRow] = await Post.update(updatedPost, {
        where: {
          id: id,
          userid: userid,
        },
      });
      if (affectedRow == 0)
        throw new CustomError(403, "this post is not yours");
      posts.find((post) => {
        if (post.id == id) {
          post.title = updatedPost.title;
          post.content = updatedPost.content;
          post.updatedAt = updatedPost.updatedAt;
          return;
        }
      });
      //console.log(posts);
    } catch (err) {
      throw err;
    }
  }
  static async findAllPost() {
    return posts;
  }
  static async findPost(id) {
    try {
      return posts.find((post) => {
        return post.id == id;
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = { PostService };
