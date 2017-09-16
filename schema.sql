DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;
USE bamazon;

create table products(
	item_id INTEGER(10) UNIQUE AUTO_INCREMENT NOT NULL, 
	product_name VARCHAR(50) NOT NULL, 
	department_name VARCHAR(50) DEFAULT NULL, 
	price DECIMAL(10,2) NOT NULL, 
	stock_quantity INT(10) DEFAULT 1);

insert into products (product_name, department_name, price, stock_quantity) values 
	("MAXXIS Minion DHF 29X2.5", "Mountainbike Tires", 52.00, 16), 
	("MAXXIS Minion DHF 29X2.6", "Mountainbike Tires", 51.00, 8), 
	("MAXXIS Minion DHF 27.5X2.5", "Mountainbike Tires", 64.00, 4), 
	("MAXXIS Minion DHF 27.5X2.4", "Mountainbike Tires", 61.00, 18), 
	("MAXXIS Minion DHF 26X3.0", "Mountainbike Tires", 50.00, 4),
	("Continental Mountain King 29X2.5", "Mountainbike Tires", 48.00, 4),
	("Continental Mountain King 29X2.4", "Mountainbike Tires", 46.00, 12),
	("Continental Mountain King 27.5X2.6", "Mountainbike Tires", 50.00, 16),
	("Continental Mountain King 27.5X2.8", "Mountainbike Tires", 43.00, 12),
	("Continental Mountain King 26X3", "Mountainbike Tires", 42.00, 8);
	
select * from products;
