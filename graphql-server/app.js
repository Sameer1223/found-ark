const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const Authentication = require("./services/authentication");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "https://foundark.me",
  })
);

app.use(
  "/graphql",
  graphqlHTTP((req, res, graphQLParams) => {
    return {
      schema: graphqlSchema,
      rootValue: graphqlResolvers,
      context: {
            isAuthenticated: Authentication.getUserId(req).isAuthenticated,
            userId: Authentication.getUserId(req).userId
      }
    };
  })
);

const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@foundark-shard-00-00.jufsi.mongodb.net:27017,foundark-shard-00-01.jufsi.mongodb.net:27017,foundark-shard-00-02.jufsi.mongodb.net:27017/${process.env.MONGO_DB}?ssl=true&replicaSet=atlas-sxec4o-shard-0&authSource=admin&retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
console.log(uri);
mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, function (err) {
      if (err) console.log("Error in server setup");
      console.log("Server listening on", PORT);
    })
  )
  .catch((error) => {
    throw error;
  });

//app.listen(PORT, () => console.log("Server is running on localhost:3001"));
