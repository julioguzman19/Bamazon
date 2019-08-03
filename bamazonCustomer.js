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
        askUser();
       
    });
  }



  function askUser(){

    inquirer.prompt([
        {
            message: "Enter product ID you are interested in purchasing:",
            name: "userID",
            validate: function(value) {
                if (isNaN(value) === false) {
                return true;
                }
                console.log(" "+"<<< this is not a number!!!")
                return false;
            }
        },
        {
            message: "How many units of this would you like to purchase?",
            name:"userUnits",
            validate: function(value) {
                if (isNaN(value) === false) {
                return true;
                }
                console.log(" "+"<<< this is not a number!!!")
                return false;
            }
        }
    ])
    .then(function(answer) {
    let userInputID = (answer.userID);
    let userInputUnits = (answer.userUnits);
    console.log(userInputID);
    console.log(userInputUnits);
    checkInventory();

    function checkInventory(){
        connection.query("SELECT stock_quantity  FROM products WHERE item_id = "+ userInputID,function(err,res){
            if (err) throw err;
            console.log(res);
            connection.end(); 
        });
      }

    });
  }

