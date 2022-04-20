import { GraphQLID, GraphQLList } from "graphql";
const { userType, postType, commentType } = require("./types");
const { User, Post, Comment } = require("../model/index");

const users = {
  type: new GraphQLList(userType),
  description: "Get the list of user",
  resolve(parent: any, args: any) {
    return User.find();
  }
};

const user = {
  type: userType,
  description: "Get the user by id",
  args: { id: { type: GraphQLID } },

  resolve(parent: any, args: any) {
    return User.findById(args.id);
  }
};

const posts = {
  type: new GraphQLList(postType),
  description: "get the list of posts",
  resolve(parent: any, args: any) {
    return Post.find();
  }
};

const post = {
  type: postType,
  description: "Get the post by id",
  args: { id: { type: GraphQLID } },

  resolve(parent: any, args: any) {
    return Post.findById(args.id);
  }
};

const comments = {
  type: new GraphQLList(commentType),
  description: "get the list of posts",
  resolve(parent: any, args: any) {
    return Comment.find();
  }
};

const comment = {
  type: commentType,
  description: "Get the post by id",
  args: { id: { type: GraphQLID } },

  resolve(parent: any, args: any) {
    return Comment.findById(args.id);
  }
};


module.exports = { users, user, posts, post, comments, comment };
