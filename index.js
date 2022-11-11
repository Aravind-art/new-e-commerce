import { port } from "./config/environment";
import app from "./app";

const start = () => {
  app.listen(port, () =>
    console.log(`🚀  GraphQL server running at port: ${port}`)
  );
};

start();
