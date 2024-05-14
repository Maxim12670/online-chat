-- создание таблицы пользователей
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
-- создание таблицы постов
create TABLE post(
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userID INT,
  FOREIGN KEY (userID) REFERENCES person(id)
);
-- создание таблицы друзей
CREATE TYPE status_enum AS ENUM ('active', 'await');
create TABLE friends(
  id SERIAL PRIMARY KEY,
  id_sender INT NOT NULL,
  id_recipient INT NOT NULL,
  status status_enum,
  FOREIGN KEY (user_sender) REFERENCES person(id),
  FOREIGN KEY (user_recipient) REFERENCES person(id)
);
-- создание таблицы диалоговых комнат
CREATE TABLE dialog_room(
  id SERIAL PRIMARY KEY,
  id_first_user INT NOT NULL,
  id_second_user INT NOT NULL,
  FOREIGN KEY (id_first_user) REFERENCES person(id),
  FOREIGN KEY (id_second_user) REFERENCES person(id)
);
-- создание таблицы сообщений
CREATE TABLE message(
  id SERIAL PRIMARY KEY,
  id_room INT NOT NULL,
  id_user INT NOT NULL,
  message_text VARCHAR(255),
  date_message TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_room) REFERENCES dialog_room(id),
  FOREIGN KEY (id_user) REFERENCES person(id)
);

-- блок для работы с токенами
--создание таблицы для токенов
CREATE TABLE user_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- функция которая будет удалять запись если 
CREATE OR REPLACE FUNCTION delete_old_tokens() RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM user_tokens WHERE created_at < NOW() - INTERVAL '30 days';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- триггер, который будет вызывать функцию каждые сутки
CREATE TRIGGER delete_old_tokens_trigger
AFTER INSERT ON user_tokens
EXECUTE FUNCTION delete_old_tokens();


