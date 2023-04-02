const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");




const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// connects to database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "1191Tsj5$",
        database: "company_db"
    },
    console.log(`Connected to the company_db database.`)
);

function viewDepartments() {
    db.query("SELECT d.id AS department_id, d.name AS department_name FROM department AS d;", 
        function (err, results) {
            console.table(results);
            promptTeamMenu();
        });
};

function viewRoles() {
    db.query("SELECT r.id AS role_id, r.title AS job_title, r.salary, d.name AS department-name, r.department_id FROM role AS r JOIN department AS d ON (r.department_id = d.id);",
        function (err, results) {
            console.table(results);
            promptTeamMenu;
        });
};

function viewEmployees() {
    db.query("SELECT e.id AS employee_id, e.first_name, e.last_name, d.name AS department_name, r.title AS job_title, r.salary AS salary, CONCAT(m.first_name,' ',m.last_name;",
        function (err, results) {
            console.table(results);
            promptTeamMenu;
        });
};





const promptTeamMenu = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "Select Option From Menu",
            choices: ["View Departments", "View Roles", "View Employees", "Add a department", "Add a role", "Add an employee", "Update employee role", "Exit"]
        }

    ]).then(userChoice => {
        switch (userChoice.menu) {
            case "View Departments":
                viewDepartments();
                break;
            case  "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update employee role":
                udateEmployeeRole();
                break;
            default:
                console.log("Incorrect Choice");
                
        }
    });

};




promptTeamMenu();
