const express = require("express");
const mysql = requier("mysql");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "company_db"
    },
    console.log(`Connected to the company_db database.`)
);

const promptTeamMenu = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "Select Option From Menu",
            choices: ["View Departments", "View Roles", "View Employees", "Add a department", "Add a role", "Add an employee", "Update employee role"]
        }

    ]).then(userChoice => {
        switch (userChoice.menu) {
            case "View Departments":
                chooseDepartment();
                break;
            case "View Roles":
                
        }
    })

}