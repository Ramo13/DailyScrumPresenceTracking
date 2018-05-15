DROP DATABASE IF EXISTS presencetracker;
CREATE DATABASE presencetracker;

\c presencetracker;

CREATE TABLE worker (
  ID SERIAL PRIMARY KEY,
  firstName VARCHAR,
  lastName VARCHAR
);

CREATE TABLE meeting (
  ID SERIAL PRIMARY KEY,
  workerID SERIAL REFERENCES worker (ID),
  date DATE,
  arrivalTime TIME without time zone,
  arrivedOnTime boolean
);

INSERT INTO worker (firstName, lastnName)
  VALUES ('Haris', 'Hajdarevic'),
  VALUES ('Dejan', 'Vujicic'),
  VALUES ('Haris', 'Tankovic');