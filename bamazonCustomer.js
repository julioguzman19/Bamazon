/*Requiring: MySQL (relationship database), inquirer (user input), cli-table (user table display)*/
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

/*Initializing MySQL Connection*/
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazoncustomer_db"
});

/*Running logic. Functions nested within displayProducts*/
connection.connect(function (err) {
    if (err) throw err;
    displayProducts();
});

/*Initializing Table to display products*/
var table = new Table({
    head: ['item_id', 'product_name','department_name','price','stock_quantity']
  , colWidths: [10,20,20,10,10]
});

/*Displaying products by looping through each row in database*/
function displayProducts() {   
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        
        for(let i=0;i<10;i++){
            table.push(
                [res[i].item_id, res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity]
            ); 
        }
        /*Displaying table with products*/
        console.log(table.toString() + '\n');
        askUser();
    }); 
}
/*Asking user inquiries*/
function askUser() {
    inquirer.prompt([
        {
            message: "Enter product ID you are interested in purchasing:",
            name: "userID",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log(" " + "<<< this is not a number!!!")
                return false;
            }
        },
        {
            message: "How many units of this would you like to purchase?",
            name: "userUnits",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log(" " + "<<< this is not a number!!!")
                return false;
            }
        }
    ])
        .then(function (answer) {
            let userInputID = answer.userID;
            let userInputUnits = parseInt(answer.userUnits);
            checkInventory();
            
            /*Checking if user input valid for inventory. Yes >>> Update table. No >>> End the program*/
            function checkInventory() {
                connection.query("SELECT stock_quantity FROM products WHERE item_id = " + userInputID, function (err, res) {
                    if (err) throw err;

                    let currentStock = parseInt(JSON.stringify(res[0].stock_quantity));

                    if (userInputUnits > currentStock) {
                        console.log("We are out of inventory! Come back another day! Currently only have: " + currentStock + " " + "units");
                        connection.end();
                    }
                    else {
                        connection.query("UPDATE products SET stock_quantity = " + (currentStock - userInputUnits) + " " + "WHERE item_id = " + userInputID, function (err, res) {
                            
                            connection.query("SELECT price FROM products WHERE item_id = " + userInputID, function (err, res) {
                                let price = parseInt(JSON.stringify(res[0].price));
                                console.log("Total cost is: $" + userInputUnits * price);
                                connection.end();
                            })
                        })
                    }

                });
            }
        });
}

