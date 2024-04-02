
create TABLE person(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  name VARCHAR(255),
  surname VARCHAR(255),
  password VARCHAR(255),
  image VARCHAR(255),
  age INTEGER,
  city VARCHAR(255)
);