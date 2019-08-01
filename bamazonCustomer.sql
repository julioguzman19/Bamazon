DROP DATABASE IF EXISTS bamazonCustomer_DB;

CREATE DATABASE bamazonCustomer_DB;

USE bamazonCustomer_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("headphones","electronics",99,4);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("jordan","shoes",150,1);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("pencil","school",1.5,100);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("plate","kitchen",10,16);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("white claws","alcohol",14.99,12);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("gatorade","sports drinks",1.50,200);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("bed","furniture",900,10);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("sweater","clothing",15,40);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("sunscreen","lotion",15,40);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("basketball","sports",15,40);