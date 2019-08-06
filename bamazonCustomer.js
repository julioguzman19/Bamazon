const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazoncustomer_db"
});

connection.connect(function (err) {
    if (err) throw err;
    displayProducts();

});

var table = new Table({
    head: ['item_id', 'product_name','department_name','price','stock_quantity']
  , colWidths: [100, 100]
});
table.push(
    ['', 'Second value']
  , ['First value', 'Second value']
);
console.log(table.toString());

let headers = ['item_id', 'product_name','department_name','price','stock_quantity']

function displayProducts() {
    
    connection.query("SELECT item_id FROM products", function (err, res) {
        if (err) throw err;
        for(let i=0;i<10;i++){
            console.log(res[i].item_id);
        }
    });

    connection.query("SELECT product_name FROM products", function (err, res) {
        if (err) throw err;
        
        console.log(res);
        askUser();
    });


}

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

            function checkInventory() {
                connection.query("SELECT stock_quantity FROM products WHERE item_id = " + userInputID, function (err, res) {
                    if (err) throw err;

                    let currentStock = parseInt(JSON.stringify(res[0].stock_quantity));

                    if (userInputUnits > currentStock) {
                        console.log("We are out of inventory! Come back another day! Currently only have: " + currentStock + " " + "units");
                    }
                    else {
                        connection.query("UPDATE products SET stock_quantity = " + (currentStock - userInputUnits) + " " + "WHERE item_id = " + userInputID, function (err, res) {
                            connection.query("SELECT price FROM products WHERE item_id = " + userInputID, function (err, res) {
                                let price = parseInt(JSON.stringify(res[0].price));
                                console.log("Total cost is: " + userInputUnits * price);
                                connection.end();
                            })

                        })
                    }

                });



            }

        });
}

