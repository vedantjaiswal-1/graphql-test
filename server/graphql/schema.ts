import { GraphQLSchema, GraphQLObjectType } from "graphql";
const {
  register,
  login,
  addPost,
  updatePost,
  deletePost,
  addComment,
  updateComment,
  deleteComment
} = require("./mutation");
const { users, user, posts, post, comments, comment } = require("./queries");

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: { users, user, posts, post, comments, comment }
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: { register, login, addPost, updatePost, deletePost, addComment, updateComment, deleteComment }
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
