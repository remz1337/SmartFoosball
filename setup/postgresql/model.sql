CREATE TABLE "games" (
  "id" SERIAL PRIMARY KEY,
  "table_id" int,
  "starttime" timestamp with time zone,
  "endtime" timestamp with time zone,
  "winner" int,
  "score_winner" int,
  "score_loser" int );

CREATE TABLE "tables" (
  "id" SERIAL PRIMARY KEY,
  "table_name" varchar,
  "status" varchar );

CREATE TABLE "sensors" (
  "id" SERIAL PRIMARY KEY,
  "table_id" int,
  "name" varchar,
  "type" varchar,
  "qr_code" varchar );

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "email" varchar,
  "password" varchar );

CREATE TABLE "teams" (
  "id" SERIAL PRIMARY KEY,
  "team_name" varchar );

CREATE TABLE "users_teams" (
  "user_id" int,
  "team_id" int );

CREATE TABLE "events" (
  "id" SERIAL PRIMARY KEY,
  "happened_at" timestamp with time zone,
  "sensor_id" int,
  "value" decimal );

CREATE TABLE "teams_sensors_games" (
  "team_id" int,
  "sensor_id" int,
  "game_id" int );

ALTER TABLE "games" ADD FOREIGN KEY ("table_id") REFERENCES "tables" ("id");
ALTER TABLE "sensors" ADD FOREIGN KEY ("table_id") REFERENCES "tables" ("id");
ALTER TABLE "users_teams" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "users_teams" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");
ALTER TABLE "events" ADD FOREIGN KEY ("sensor_id") REFERENCES "sensors" ("id");
ALTER TABLE "teams_sensors_games" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");
ALTER TABLE "teams_sensors_games" ADD FOREIGN KEY ("sensor_id") REFERENCES "sensors" ("id");
ALTER TABLE "teams_sensors_games" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id");

