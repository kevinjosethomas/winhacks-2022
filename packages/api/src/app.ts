import dotenv from "dotenv";
import cors from "fastify-cors";
import helmet from "fastify-helmet";
import compress from "fastify-compress";
import Fastify, { FastifyInstance } from "fastify";

import errors from "./plugins/errors";
import database from "./plugins/database";

import user from "./routes/user";
import project from "./routes/project";
import application from "./routes/application";

dotenv.config();

const app: FastifyInstance = Fastify({
  logger: true,
});

app.register(cors);
app.register(helmet);
app.register(compress);

app.register(errors);
app.register(database);

app.register(user, { prefix: "/user" });
app.register(project, { prefix: "/project" });
app.register(application, { prefix: "/project" });

const run = async () => {
  const port = process.env.PORT as string;
  await app.listen(port);
  console.log(`Server listening on ${port}`);
};

run().catch((e) => {
  console.log(e);
});
