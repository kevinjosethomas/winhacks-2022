import { FastifyInstance } from "fastify";
import { FromSchema } from "json-schema-to-ts";

const create = {
  body: {
    type: "object",
    properties: {
      name: { type: "string", minLength: 3, maxLength: 32 },
      description: { type: "string", maxLength: 1000 },
      tasks: { type: "array", items: { type: "string" } },
      affiliation: { type: "string" },
      duration: { type: "number" },
      required_people: { type: "number" },
    },
    required: ["name", "description", "tasks", "affiliation", "duration", "required_people"],
  },
  headers: {
    type: "object",
    properties: {
      Authorization: { type: "string" },
    },
    required: ["Authorization"],
  },
} as const;

export default async function router(fastify: FastifyInstance) {
  fastify.post<{ Body: FromSchema<typeof create.body> }>(
    "/create",
    { schema: create },
    async (req, res) => {
      let user_id;
      let { name, description, tasks, affiliation, duration, required_people } = req.body;

      if (!req.headers.authorization) {
        return res.code(401).send({
          success: false,
          message: "Unauthorized - Please provide an Authorization token!",
        });
      }

      const { authorization } = req.headers;

      const tokens = await fastify.pg.query(
        "SELECT user_id FROM user_tokens WHERE token = $1 AND NOW() < expires_at",
        [authorization]
      );

      if (!tokens.rowCount) {
        return res.code(401).send({
          success: false,
          message: "Unauthorized - Invalid Authorization token provided!",
        });
      }

      user_id = tokens.rows[0].user_id;

      const results = await fastify.pg.query(
        "INSERT INTO projects (name, description, tasks, affiliation, duration, required_people, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [name, description, tasks, affiliation, duration, required_people, user_id]
      );

      return res.code(200).send({
        success: true,
        message: "OK - Successfully created project!",
      });
    }
  );
}
