import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ConnectionOptions } from "tls";
const cors = require('cors');
const schema = require("./graphql/schema");

const app = express();
app.use(cors())

dotenv.config();

mongoose.connect(process.env.DB_CONNECT!, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as ConnectionOptions);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connected");
});

const { authenticate } = require("./middleware/auth");

app.use(authenticate);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);
app.listen(4000, () => {
  console.log("Running server on port localhost:4000/graphql");
});
