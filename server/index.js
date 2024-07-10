const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type Todo {
        id:ID!
        title:String!
        completed:Boolean
        }

        type Query{
        getToDos:[Todo]
        }
        `,
    resolvers: {
      Query: {
        getToDos: () => [{ id: 1, title: "Running at 4am", completed: true }],
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));
  app.listen(8000, () => console.log("Server started at port 8000"));
}

startServer();
