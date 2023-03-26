const express = require("express");
const mysql = requier("mysql");
const inquirer = require("inquirer");
const fs = require("fs");


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// connects to database
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
            choices: ["View Departments", "View Roles", "View Employees", "Add a department", "Add a role", "Add an employee", "Update employee role", "Exit"]
        }

    ]).then(userChoice => {
        switch (userChoice.menu) {
            case "View Departments":
                chooseDepartments();
                break;
            case  "View Roles":
                chooseRoles();
                break;
            case "View Employees":
                chooseEmployees();
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
                process.exit();
                
        }
    });

};
// adds selections to tables
const chooseDepartments = () => {
    db.query("SELECT * from department;",
    (err, results) => {
        console.table(results);
        promptTeamMenu();
    });
};

const chooseRoles = () => {
    db.query("SELECT * from role;",
    (err, results) => {
        console.table(results);
        promptTeamMenu();
    });
};

const chooseEmployees = () => {
    db.query("SELECT E.id, E.first_name, E.last_name, R.title, R.salary, D.department_name, CONCAT(M.first_name,' ',M.last_name) as manager;",
    (err, results) => {
        console.table(results);
        promptTeamMenu();
    });
};

const promptAddDepartment = () => {
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Add department name you would like to add.",
        validate: departmentName => {
            if (departmentName) {
                return true;
            } else {
                console.log("Please enter name of department.");
                return false;
            }
        }
    }]).then(name => {
        db.promise().query("Insert into department set ?", name);
        chooseDepartments();
    })
}

const promptAddRole = () => {
    return db.promise().query("SELECT department.id, departmen.department_name from department;")
    .then(([departments]) => {
        let departmentOptions = departments.map(({
            id,
            name }) => ({
                name: name,
                value: id
            
        }));

        inquirer.prompt([{
            type: "input",
            name: "title",
            message: "Enter title of role.",
            validate: titleName => {
                if (titleName) {
                    return true;
                } else {
                    console.log("Please enter role/title name.");
                    return false;
                }
            },

            
                type:"list",
                name: "department",
                message: "Your current department?",
                choices: departmentOptions
            },

            {
                type: "input",
                name: "salary",
                message: "Enter current salary",
                validate: salary => {
                    if (salary) {
                        return true;
                    } else {
                        console.log("Please enter salary.");
                        return false;
                    }
                }
            }
        
         ]).then(({ title, department, salary }) => {
            const query = db.query("insert into role set?",
                {
                    title: title,
                    department_id: department,
                    salary: salary
                },
                function (err, res) {
                    if (err) throw err;
                }
            )
        }).then(() => chooseRoles())
    })
}

const promptAddEmployee = (roles) => {
    return db.promise().query("SELECT R.id, R.title from role;"
    )
        .then(([employees]) => {
            let titleOptions = employees.map(({
                id, 
                title
            }) => ({
                value: id,
                name: title
            }))
            db.promise().query("SELECT E.id, CONCAT(E.first_name,' ',E.last_name)as manager from employee E;"
            ).then(([managers]) => {
                let managerOptions = managers.map(({
                }) => ({
                    value: id,
                    name: manager
                }));
                
            }
            
            )
        })
}

