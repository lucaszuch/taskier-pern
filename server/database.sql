//Database name
CREATE DATABASE pernstack;

//Table format
CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);