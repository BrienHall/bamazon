var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'bamazon'
});

connection.connect(function(err){
  if (err){
    throw err;
  }
});

connection.query('SELECT * FROM products', showProducts);

refresh = function(){
  connection.query('SELECT * FROM products', showProducts);
}

function showProducts(err, res, fields) {
  if (err){
    throw err;
  }
  var products = [];
  for (var r in res) {
    var prod = res[r];
    products.push(prod.product_name + ' in ' + prod.department_name + ':  $' + prod.price + ', ' + prod.stock_quantity + ' available.');
  }
  inquirer.prompt([
    {
      type: 'list',
      name: 'item',
      message: 'Choose a tire:',
      choices: ['Exit', ...products,],
      default: 0
    }
  ]).then(function(response) {
    if (response.item === 'Exit') {
      connection.end();
      return console.log('Closed');
    }
    var item = res[products.indexOf(response.item)];
    if (item.stock_quantity > 0) {
      var qty = [];
      for (var i = 1; i <= item.stock_quantity; i++) qty.push(`${i}`);
      inquirer.prompt([
        {
          type: 'list',
          name: 'quantity',
          message: 'Quantity to purchase:',
          choices: ['< Back', ...qty],
          default: 2
        }
      ]).then(function(response) {
        if (response.quantity === '< Back') {
          return showProducts(err, res, fields);
        }
        makePurchase(item, parseInt(response.quantity), showProducts.bind(this, err, res, fields));
      });
    } else {
      makePurchase(item, 1, showProducts.bind(this, err, res, fields));
    }
  });
}

function makePurchase(item, qty, showProducts) {
  if (item.stock_quantity < qty) {
    console.log("************************************************************************")
    console.log('Insufficient quantity: ' + item.stock_quantity + ' of ' + item.product_name + ' in stock and cannot fill your order.')
    console.log("************************************************************************")
    showProducts();
  } else {
    var totalCost = item.price * qty;
    var updatedInventory = item.stock_quantity - qty;
    console.log("************************************************************************")
    console.log('Total cost: $'+ totalCost+'.00')
    console.log("************************************************************************")
    connection.query('UPDATE products SET stock_quantity ='+updatedInventory+' WHERE item_id ='+item.item_id, function(err) {
      if (err) throw err;
    });
    refresh();
  }
  
}

