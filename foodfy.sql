CREATE DATABASE foodfy;

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" text,
  "file_id" int NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar NOT NULL,
  "chef_id" int NOT NULL,
  "ingredients" varchar,
  "preparation" varchar,
  "information" varchar,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "path" text NOT NULL
);

CREATE TABLE "recipes_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int NOT NULL,
  "file_id" int NOT NULL
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");

ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");

ALTER TABLE "recipes_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "recipes_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");
