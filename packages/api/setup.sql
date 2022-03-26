
CREATE TABLE IF NOT EXISTS users (
  user_id           SERIAL PRIMARY KEY,
  name              VARCHAR NOT NULL,
  email             TEXT NOT NULL,
  password          VARCHAR NOT NULL,
  type              SMALLINT NOT NULL,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_tokens (
  user_id           INT REFERENCES users(user_id) ON DELETE CASCADE,
  token             VARCHAR UNIQUE NOT NULL,
  expires_at        TIMESTAMPTZ NOT NULL,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  project_id        SERIAL PRIMARY KEY,
  name              VARCHAR NOT NULL,
  description       TEXT NOT NULL,
  tasks             VARCHAR[] NOT NULL,
  affiliation       VARCHAR NOT NULL,
  duration          INT NOT NULL,
  required_people   INT NOT NULL,
  accepting         BOOLEAN NOT NULL DEFAULT true,
  approved          BOOLEAN NOT NULL DEFAULT false,
  created_by        INT REFERENCES users(user_id) ON DELETE CASCADE,
  approved_at       TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_applications (
  application_id    SERIAL PRIMARY KEY,
  applicant_id      INT REFERENCES users (user_id) ON DELETE CASCADE,
  project_id        INT REFERENCES projects (project_id) ON DELETE CASCADE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);
