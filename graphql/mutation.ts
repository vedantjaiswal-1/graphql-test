import { GraphQLID, GraphQLString } from "graphql";
const { User, Post, Comment } = require("../model");
const { createJwtToken } = require("../util/auth");
const { postType, commentType } = require("./types");

const register = {
  type: GraphQLString,
  description: "Register new user",
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(parent: any, args: any) {
    const { username, email, password, displayName } = args;
    const user = new User({ username, email, password, displayName });

    await user.save();
    const token = createJwtToken(user);
    return token;
  }
};

const login = {
  type: GraphQLString,
  description: "Login user",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(parent: any, args: any) {
    const user = await User.findOne({ email: args.email }).select("+password");

    if (!user || args.password !== user.password) {
      throw new Error("Invalid credentials");
    }

    const token = createJwtToken(user);
    return token;
  }
};

const addPost = {
  type: postType,
  description: "Create new blog post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString }
  },
  resolve(parent: any, args: any, { verifiedUser }: any) {
    if (!verifiedUser) {
      throw new Error("Unauthorized");
    }

    const post = new Post({
      authorId: verifiedUser?._id,
      title: args.title,
      body: args.body
    });

    return post.save();
  }
};

const updatePost = {
  type: postType,
  description: "update post",
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString }
  },
  async resolve(parent: any, args: any, { verifiedUser }: any) {
    if (!verifiedUser) {
      throw new Error("Unauthorized");
    }

    const postUpdate = await Post.findOneAndUpdate(
      {
        _id: args?.id,
        authorId: verifiedUser?._id
      },
      { title: args.title, body: args.body },
      {
        new: true,
        runValidator: true
      }
    );

    if (!postUpdate) {
      throw new Error("No post with the given ID found for the author");
    }

    return postUpdate;
  }
};

const deletePost = {
  type: GraphQLString,
  description: "Delete post",
  args: {
    postId: { type: GraphQLID }
  },
  async resolve(parent: any, args: any, { verifiedUser }: any) {
    if (!verifiedUser) {
      throw new Error("Unauthorized");
    }

    const postDelete = await Post.findOneAndDelete({
      _id: args?.postId,
      authorId: verifiedUser?._id
    });

    if (!postDelete) {
      throw new Error("No post with the given ID found for the author");
    }

    return "Post deleted";
  }
};

const addComment = {
  type: commentType,
  description: "Create a new comment",
  args: {
    comment: { type: GraphQLString },
    postId: { type: GraphQLString }
  },
  resolve(parent: any, args: any, { verifiedUser }: any) {
    const comment = new Comment({
      userId: verifiedUser._id,
      postId: args.postId,
      comment: args.comment
    });
    return comment.save();
  }
};

const updateComment = {
  type: commentType,
  description: "Update comment",
  args: {
    id: { type: GraphQLString },
    comment: { type: GraphQLString }
  },
  async resolve(parent:any, args: any, { verifiedUser }:any) {
    if (!verifiedUser) {
      throw new Error("Unauthenticated");
    }
    const commentUpdated = await Comment.findOneAndUpdate(
      {
        _id: args.id,
        userId: verifiedUser._id
      },
      { comment: args.comment },
      {
        new: true,
        runValidators: true
      }
    );

    if (!commentUpdated) {
      throw new Error("No comment with the given ID found for the author");
    }

    return commentUpdated;
  }
};

const deleteComment = {
  type: GraphQLString,
  description: "Delete comment",
  args: {
    commentId: { type: GraphQLString }
  },
  async resolve(parent:any, args: any, { verifiedUser }: any) {
    console.log(verifiedUser);
    if (!verifiedUser) {
      throw new Error("Unauthenticated");
    }
    const commentDeleted = await Comment.findOneAndDelete({
      _id: args.commentId,
      userId: verifiedUser._id
    });
    if (!commentDeleted) {
      throw new Error("No post with the given ID found for the author");
    }

    return "Post deleted";
  }
};

module.exports = { register, login, addPost, updatePost, deletePost, addComment, updateComment, deleteComment };
