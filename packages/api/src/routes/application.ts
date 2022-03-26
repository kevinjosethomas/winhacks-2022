import { FastifyInstance } from "fastify";
import { FromSchema } from "json-schema-to-ts";

const apply = {
  body: {
    type: "object",
    properties: {
      interests: { type: "string" },
      qualifications: { type: "string" },
    },
  },
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  headers: {
    type: "object",
    properties: {
      Authorization: { type: "string" },
    },
  },
} as const;

export default async function router(fastify: FastifyInstance) {
  fastify.post<{ Body: FromSchema<typeof apply.body>; Params: FromSchema<typeof apply.params> }>(
    "/:id/apply",
    { schema: apply },
    async (req, res) => {
      const project_id = req.params.id;
      const { interests, qualifications } = req.body;

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

      const user_id = tokens.rows[0].user_id;

      await fastify.pg.query(
        "INSERT INTO project_applications (applicant_id, project_id, interests, qualifications) VALUES ($1, $2, $3, $4)",
        [user_id, project_id, interests, qualifications]
      );

      return res.code(200).send({
        success: true,
        message: "OK - Successfully applied for the project",
      });
    }
  );
}
