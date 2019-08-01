const mysql = require ("mysql");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"bamazoncustomer_db"
});

connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
  });

  function displayProducts(){
    connection.query("SELECT * FROM products",function(err,res){
        if (err) throw err;
        console.log(res);
        connection.end(); 
    });
  }

  function askUser(){
      
  }