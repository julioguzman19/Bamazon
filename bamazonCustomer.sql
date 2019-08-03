DROP DATABASE IF EXISTS bamazoncustomer_db;

CREATE DATABASE bamazonCustomer_db;

USE bamazoncustomer_db;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("headphones","electronics",99,10);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("jordan","shoes",150,20);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("pencil","school",1.5,30);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("plate","kitchen",10,40);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("white claws","alcohol",14.99,50);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("gatorade","sports drinks",1.50,60);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("bed","furniture",900,70);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("sweater","clothing",15,80);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("sunscreen","lotion",15,90);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("basketball","sports",15,100);