import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { FastifyInstance } from "fastify";
import { FromSchema } from "json-schema-to-ts";

const signup = {
  body: {
    type: "object",
    properties: {
      username: { type: "string", minLength: 3, maxLength: 16 },
      name: { type: "string", minLength: 3, maxLength: 32 },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 3, maxLength: 32 },
      type: { type: "number", minimum: 1, maximum: 3 },
    },
    required: ["username", "name", "email", "password", "type"],
  },
  headers: {
    type: "object",
    properties: {
      authorization: { type: "string" },
    },
  },
} as const;

export default async function router(fastify: FastifyInstance) {
  fastify.get<{ Body: FromSchema<typeof signup.body> }>(
    "/signup",
    { schema: signup },
    async (req, res) => {
      let { username, name, email, password, type } = req.body;
      username = username.toLowerCase();
      email = email.toLowerCase();

      const results = await fastify.pg.query(
        "SELECT * FROM users WHERE LOWER(username) = $1 OR LOWER(email) = $2",
        [username, email]
      );

      if (results.rowCount) {
        return res.code(409).send({
          success: false,
          message: "Conflict - The provided username or email is taken!",
        });
      }

      if (type === 3) {
        if (!req.headers.Authorization) {
          return res.code(401).send({
            success: false,
            message: "Unauthorized - Only administrators can create other admin accounts!",
          });
        }

        const { Authorization } = req.headers;

        const tokens = await fastify.pg.query(
          "SELECT user_id FROM user_tokens WHERE token = $1 AND NOW() < expires_at",
          [Authorization]
        );

        if (!tokens.rowCount) {
          return res.code(401).send({
            success: false,
            message: "Unauthorized - Only administrators can create other admin accounts!",
          });
        }

        const user = await fastify.pg.query("SELECT user_id, type FROM users WHERE user_id = $1", [
          tokens.rows[0].user_id,
        ]);

        if (user.rows[0].type !== 3) {
          return res.code(401).send({
            success: false,
            message: "Unauthorized - Only administrators can create other admin accounts!",
          });
        }
      }

      const hashed = await bcrypt.hash(password, 10);

      const user = await fastify.pg.query(
        "INSERT INTO users (username, name, email, password, type, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING user_id",
        [username, name, email, hashed, type]
      );

      const id = user.rows[0].user_id;

      const token = jwt.sign({ id, usr: username, tme: Date.now() }, process.env.JWT_SECRET);

      await fastify.pg.query(
        "INSERT INTO user_tokens (user_id, token, expires_at, created_at) VALUES ($1, $2, NOW() + INTERVAL '30 days', NOW())",
        [id, token]
      );

      return res.code(201).send({
        success: true,
        messahe: "OK - Successfully created the user account",
        payload: {
          token,
        },
      });
    }
  );
}
