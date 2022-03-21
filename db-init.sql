DROP DATABASE chatlook;
CREATE DATABASE chatlook;
USE chatlook;

CREATE TABLE user (
  id VARCHAR(36) PRIMARY KEY,
  type enum ('Personal', 'Businesss'),
  contact_no VARCHAR(20),
  full_name VARCHAR(100),
  user_name VARCHAR(100),
  email_id VARCHAR(100),
  created_at DATETIME,
  updated_at DATETIME,
  active BOOLEAN
);

CREATE TABLE business (
  id VARCHAR(36) PRIMARY KEY,
  business_name int NOT NULL,
  category VARCHAR(25),
  sub_category VARCHAR(25),
  description VARCHAR(300),
  created_at DATETIME,
  updated_at DATETIME,
  active BOOLEAN,
  FOREIGN KEY (id) REFERENCES user(id)
);

CREATE TABLE address (
  id VARCHAR(36) PRIMARY KEY,
  pin_code VARCHAR(10),
  city VARCHAR(30),
  state VARCHAR(30),
  country VARCHAR(30),
  created_at DATETIME,
  updated_at DATETIME,
  active BOOLEAN,
  FOREIGN KEY (id) REFERENCES user(id)
);

