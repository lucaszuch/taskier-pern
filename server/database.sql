-- Database name
CREATE DATABASE taskier;

-- Users table form
CREATE TABLE users (
  user_id BIGSERIAL NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

-- Todos table format
CREATE TABLE todos(
  todo_id SERIAL,
  user_id BIGSERIAL,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Fake data
INSERT INTO users (user_name, user_email, user_password)
VALUES ('user', 'email@email.com', 'root');

INSERT INTO users (user_name, user_email, user_password)
VALUES ('Alberto', 'albie@cat.com', 'root');

INSERT INTO todos (user_id, description)
VALUES (1, 'Check todo database');

INSERT INTO todos (user_id, description)
VALUES (2, 'Snooze until dad kicks me from the bedroom');

INSERT INTO todos (user_id, description)
VALUES (2, 'Chase the laser');

INSERT INTO todos (user_id, description)
VALUES (3, 'Feed the cat');