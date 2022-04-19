import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
const { User, Post, Comment } = require("../model");

const userType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

const postType = new GraphQLObjectType({
  name: "Post",
  description: "Post type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: userType,
      resolve(parent, args) {
        return User.findById(parent.authorId);
      }
    },
    comment: {
      type: new GraphQLList(commentType),
      resolve(parent, args) {
        return Comment.findById({ postId: parent.id });
      }
    }
  })
});

const commentType: GraphQLObjectType = new GraphQLObjectType({
  name: "Comment",
  description: "Comment type",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: userType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    post: {
      type: postType,
      resolve(parent, args) {
        return Post.findById(parent.postId);
      }
    }
  })
});

module.exports = { userType, postType, commentType };
