import { join } from "path";
import { readdirSync, readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { queryResolver } from "./resolvers";

const gqlFiles = readdirSync(join(__dirname, "./typedef"));

let typeDefs = "";

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, "./typedef", file), {
    encoding: "utf8",
  });
});
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: queryResolver,
});

export default schema;
