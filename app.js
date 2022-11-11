import express from "express";
import graphqlServer from "./graphql";
import { expressMiddleware } from '@apollo/server/express4';

import cors from 'cors';
import { json } from 'body-parser';

const app = express();
const serve = async () => {
  await graphqlServer.start();
  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(graphqlServer, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
};
serve();
export default app;
