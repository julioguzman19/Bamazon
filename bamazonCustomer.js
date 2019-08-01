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
    /* displayProducts(); */
    askUser();
    connection.end(); 
  });

  function displayProducts(){
    connection.query("SELECT * FROM products",function(err,res){
        if (err) throw err;
        console.log(res);
        connection.end(); 
    });
  }



  function askUser(){

    inquirer.prompt([
        {
        message: "Enter product ID you are interested in purchasing:",
        name: "userID",
        
        },
        {
        message: "How many units of this would you like to purchase?",
        name:"userUnits",
        }
    ])
    .then(function(answer) {
    console.log(typeof(answer.userID));
    console.log(answer.userUnits);
    });
  }

/* 
  .prompt([
    {
      name: "start",
      type: "input",
      message: "Enter starting position: ",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "end",
      type: "input",
      message: "Enter ending position: ",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ]) */
  