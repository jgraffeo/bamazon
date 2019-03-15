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
      menuOptions();
    //   console.table(res);
    });
}    



/*
  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product
*/

// MENU OPTIONS PROMPT ---------------------------------------------------------------------------------


function menuOptions(){
    inquirer
    .prompt([
        {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
        },
    ])
    .then(function(managerChoice) {
        if (managerChoice.options === 'View Products for Sale') {
        
            console.log('Answer: ' + 'You selected View Products for Sale');

            viewProducts();

        } else if (managerChoice.options === 'View Low Inventory') {

            console.log('Answer: ' + 'You selected View Low Inventory.');

            // viewLowInventory();

        } else if (managerChoice.options === 'Add to Inventory') {
            
            // console.log('Answer: ' + 'You selected Add to Inventory.');

            addToInventory();

        } else if (managerChoice.options === 'Add New Product') {

            console.log('Answer: ' + 'You selected Add New Product.');

            // addNewProduct();

        }
    });
}

function viewProducts(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
    });
}

// VIEW LOW INVENTORY ---------------------------------------------------------------------------------


function viewLowInventory(){

}

// ADD TO INVENTORY -----------------------------------------------------------------------------------

function addToInventory(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        promptInventory();
    });
}

function promptInventory(){
    inquirer.prompt([{
        type: 'input',
        name: 'inputID',
        message: 'What is the ID of the product you would like to add more of to inventory?',
    },
    {
        type: 'input',
        name: 'inputQuantity',
        message: 'What quantity of this product do you want to add to inventory?',
    }
    ])
    .then(function(userChoice) {

        //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.

    connection.query("SELECT * FROM products WHERE item_id=?", userChoice.inputID, function(err, res) {
        for (var i = 0; i < res.length; i++) {

                console.log("Item: " + res[i].product_name);
                console.log("Department: " + res[i].department_name);
                console.log("Price: " + res[i].price);
                console.log("Quantity: " + userChoice.inputQuantity);
                console.log("Total: " + res[i].price * userChoice.inputQuantity);
                
                //Update mysql database - add the quantity chosen of an item from total quantity 

                updateQuantity(userChoice.inputID, userChoice.inputQuantity, res[i].product_name);
            }
        })
    });
};


function updateQuantity(itemBought, quantityBought, productName) {
    connection.query("UPDATE products SET stock_quantity=stock_quantity + ? WHERE item_id=?",[
        quantityBought, itemBought], function (err, res) {
            console.log("You have successfully added " + quantityBought + " units of " + productName);

        })
}


// ADD NEW PRODUCT ---------------------------------------------------------------------------------

function addNewProduct(){

}