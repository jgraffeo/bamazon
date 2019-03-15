CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT(40) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(40) NOT NULL,
  department_name VARCHAR(40) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT(20) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Glutathione", "Wellness", 40.99, 10),
("Yoga mat", "Wellness", 13.99, 5),
("Guitar stand", "Music", 12.99, 15),
("Record player", "Music", 299.00, 6),
("The Battle of Chili", "Books", 29.41, 4),
("Laptop", "Electronics", 850.00, 5),
("Lone Peak Altra", "Outdoors", 119.99, 9),
("Tent", "Outdoors", 200.00, 12),
("Headlamp", "Outdoors", 22.99, 17),
("Challenging Authority", "Books", 25.00, 6);
