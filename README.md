# bamazon

For this assingment, I created a storefront run through the terminal using node and MySQL. The app takes in orders from the terminal and updates the information in MySQL. 

# How it works

In the bamazonCustomer.js page, when node bamazonCustomer.js is run in the terminal, a table populated from MySQL appears and the user is prompted to answer two questions: "What is the ID of the product you would like to buy?" and "What quantity of this product do you want?" The user answers the first question, then the second. Confirmation of purchase appears. When one checks the MySQL Workbench, the changes are shown.

In the bamazonManger.js, I was able to figure out half of this bonus assignment. When the user types in node bamazonManager.js, the menu options appear. The manager can select from "View Products for Sale" and "Add to Inventory." Clicking the first answer populates the table from MySQL in the terminal. The third (second functioning option) populates the table and asks "What is the ID of the product you would like to add more of to invnetory?" Once answered, it asks how many of this product. Then, a detailed description of the product, the price of the product and the total are listed. If you check the Workbench, the table has been updated with the new quantity.

# Issues

I had trouble with the prompt in the bamazonManager portion of the homework. For some reason, the prompt jumped from "View Products..." to "Add to inventory" when clicking up or down on the keyboard. I couldn't figure out why this was happening and ultimately decided to leave the assignment as it was due to time constraints.