var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'Reinhole87!',
    database: 'bamazon',
    port: 3306
});

connection.connect(function(err) { //must establish a connection before
    if (err) throw err;
    console.log('Connected as id '+ connection.threadId);
    afterConnection();
});

//prints table
function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
      firstPrompt();
    });
}    

// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
function firstPrompt(){

    inquirer.prompt([{
        type: 'input',
        name: 'inputID',
        message: 'What is the ID of the product you would like to buy?',
    },
    {
        type: 'input',
        name: 'inputQuantity',
        message: 'What quantity of this product do you want?',
    }
    ])
    .then(function(userChoice) {

        //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.

    connection.query("SELECT * FROM products WHERE item_id=?", userChoice.inputID, function(err, res) {
        for (var i = 0; i < res.length; i++) {

            if (userChoice.inputQuantity > res[i].stock_quantity) {
                console.log("--------------------");
                console.log("Sorry, we don't have that amount in stock!");
                console.log("--------------------");
            } else {
                //list item information for user for confirm prompt
                console.log("Item: " + res[i].product_name);
                console.log("Department: " + res[i].department_name);
                console.log("Price: " + res[i].price);
                console.log("Quantity: " + userChoice.inputQuantity);
                console.log("Total: " + res[i].price * userChoice.inputQuantity);
                
                //Update mysql database - subtract the quantity chosen of an item from total quantity 

                updateQuantity(userChoice.inputID, userChoice.inputQuantity, res[i].product_name);
            }
        }
    });
});
}

function updateQuantity(itemBought, quantityBought, productName) {
    connection.query("UPDATE products SET stock_quantity=stock_quantity - ? WHERE item_id=?",[
        quantityBought, itemBought], function (err, res) {
            console.log("You have successfully purchased " + quantityBought + " units of " + productName);

        })
}