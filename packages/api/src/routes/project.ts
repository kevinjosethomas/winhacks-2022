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

const approve = {
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

const list = {
  querystring: {
    type: "object",
    properties: {
      approved: { type: "string", enum: ["true", "false"] },
    },
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

  fastify.put<{ Params: FromSchema<typeof approve.params> }>(
    "/:id/approve",
    { schema: approve },
    async (req, res) => {
      const project_id = req.params.id;

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

      const user = await fastify.pg.query("SELECT user_id, type FROM users WHERE user_id = $1", [
        tokens.rows[0].user_id,
      ]);

      if (user.rows[0].type !== 3) {
        return res.code(401).send({
          success: false,
          message: "Unauthorized - Only administrators can perform this action!",
        });
      }

      await fastify.pg.query(
        "UPDATE projects SET approved = true, approved_at = NOW() WHERE project_id = $1",
        [project_id]
      );

      return res.code(200).send({
        success: true,
        message: "OK - Successfully approved project!",
      });
    }
  );

  fastify.get("/list", { schema: list }, async (req, res) => {
    let { approved } = req.query as any;
    approved = approved === "true" ? true : false;

    const results = await fastify.pg.query("SELECT * FROM projects WHERE approved = $1", [
      approved,
    ]);

    return res.code(200).send({
      success: true,
      payload: results.rows,
    });
  });
}
