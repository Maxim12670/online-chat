
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



CREATE TYPE status_enum AS ENUM ('active', 'await');
create TABLE friends(
  id SERIAL PRIMARY KEY,
  user_sender INT NOT NULL,
  user_recipient INT NOT NULL,
  status status_enum,
  FOREIGN KEY (user_sender) REFERENCES person(id),
  FOREIGN KEY (user_recipient) REFERENCES person(id)
);