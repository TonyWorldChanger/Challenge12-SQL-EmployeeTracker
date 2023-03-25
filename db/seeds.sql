INSERT INTO department (id, department_name)
VALUES ("01", "Operations"),
       ("02", "Engineering"),
       ("03", "Supply Chain"),
       ("04", "Devs");

INSERT INTO role (id, title, salary, department_id)
VALUES ("01", "Lead", 50000, 01), 
       ("02", "Supervisor", 95000, 01),
       ("03", "Programming Engineer", 105000, 02),
       ("04", "SP Analyst", 75000. 03),
       ("05", "Sr. Sofware Developer", 120000, 04),
       ("06", "VS Manager", 120000, 01),
       ("07", "SP Manager", 140000, 03),
       ("08", "Engineering Manager", 150000, 02);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("01", "Tom", "Hardy", 01, 02), 
       ("02", "Randy", "Savag", 02, 06),
       ("03", "Cain", "Heart", 03, 08),
       ("04", "Mike", "Tyson", 04, 07),
       ("05", "Tony Steverson", 05, 05),
       ("06", "Charles", "X", 06, 06),
       ("07", "Debbie", "Allen", 07, 07),
       ("08", "Bill", "Brown", 08, 08);