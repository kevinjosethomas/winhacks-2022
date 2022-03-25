import { FastifyInstance } from "fastify";

export default async function router(fastify: FastifyInstance) {
  fastify.get("/", async (req, res) => {
    res.code(200).send({
      success: true,
      payload: {
        message: "Hello World!",
      },
    });
  });
}
