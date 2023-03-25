const express = require("express");
const mysql = requier("mysql");
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