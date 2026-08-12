CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS users (id uuid PRIMARY KEY DEFAULT gen_random_uuid(),name text NOT NULL,email text UNIQUE NOT NULL,password_hash text NOT NULL,created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS memories (id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,content text NOT NULL,mood text NOT NULL CHECK(mood IN ('happy','calm','nostalgic','tired')),memory_date date NOT NULL,created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS media (id uuid PRIMARY KEY DEFAULT gen_random_uuid(),memory_id uuid NOT NULL REFERENCES memories(id) ON DELETE CASCADE,type text NOT NULL CHECK(type IN ('image','video')),url text NOT NULL,created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS capsules (id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,content text NOT NULL,unlock_at timestamptz NOT NULL,opened_at timestamptz,created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS memories_user_date_idx ON memories(user_id,memory_date DESC);
CREATE INDEX IF NOT EXISTS capsules_user_unlock_idx ON capsules(user_id,unlock_at);
