import plugin from "fastify-plugin";
import postgres from "fastify-postgres";
import { FastifyInstance } from "fastify";

async function database(fastify: FastifyInstance) {
  fastify.register(postgres, {
    connectionString: process.env.DATABASE_URL,
  });
}

export default plugin(database);
