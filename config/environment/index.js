import dotenv from "dotenv";
import dotenvExpand from 'dotenv-expand'
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const port = process.env.PORT;

// You may use this as a boolean value for different situations
const env = {
  development: process.env.NODE_ENV === "development",
  test: process.env.NODE_ENV === "test",
  staging: process.env.NODE_ENV === "staging",
  production: process.env.NODE_ENV === "production",
};

export { port, env };
