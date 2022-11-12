import mongoose from "mongoose";
import { port } from "./config/environment";
import app from "./app";
import { env } from "./config/environment";
const dbUrl = env.production
  ? process.env.DATABASE_URL
  : process.env.DATABASE_URL_LOCAL;

//mongoose
mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(port, () =>
      console.log(`🚀  GraphQL server running at port: ${port}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
