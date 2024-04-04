
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


create TABLE post(
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userID INT,
  FOREIGN KEY (userID) REFERENCES person(id)
);