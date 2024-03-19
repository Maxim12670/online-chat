
create TABLE person(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  surname VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  image VARCHAR(255)
);