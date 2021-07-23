DROP DATABASE IF EXISTS employees_db;
CREATE database employees_db;
USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sales"),("Marketing"),("Human Resources");

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT,
    is_manager BOOLEAN DEFAULT 0,
    PRIMARY KEY (id)
);

INSERT INTO role (title, salary, department_id, is_manager)
VALUES("Sales Manager", 80000, 1, 1),
("Head Marketer", 90000, 2, 1),
("HR Manager", 90500, 3, 1);

INSERT INTO role (title, salary, department_id)
VALUES("Salesman", 60000, 1),
("Marketeer", 65000, 2),
("HR Generalist ", 62000, 3);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id)
VALUES("Steve", "Craftsman", 1),
("Carl", "Smithers", 2),
("Bob", "Parr", 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Alex", "Bowson", 2, 1),
("Turd", "Ferguson", 4, 2),
("Duke", "Nukem", 6, 3);