import dotenv from "dotenv";
import cors from "fastify-cors";
import helmet from "fastify-helmet";
import compress from "fastify-compress";
import Fastify, { FastifyInstance } from "fastify";

import errors from "./plugins/errors";
import example from "./routes/example";

dotenv.config();

const app: FastifyInstance = Fastify({
  logger: true,
});

app.register(cors);
app.register(helmet);
app.register(compress);
app.register(errors);

app.register(example);

const run = async () => {
  const port = process.env.PORT as string;
  await app.listen(port);
  console.log(`Server listening on ${port}`);
};

run().catch((e) => {
  console.log(e);
});
