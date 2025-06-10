/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('summer25_recipeWeb');

// Insert a few documents into the sales collection.
db.getCollection('recipes').insertMany([
  { 'type': 'dessert', 'ingredient': ['almond extract', 'flour', 'egg'], 'quantity': 3},
  { 'type': 'meal', 'ingredient': ['egg', 'pepper'], 'quantity': 4},
  { 'type': 'meal', 'ingredient': ['jam', 'peanut butter'], 'quantity': 10 },
  { 'type': 'side', 'ingredient': ['cheese', 'potato'], 'quantity': 20},
  { 'type': 'side', 'ingredient': ['sour cream', 'potato'], 'quantity': 10 },
  { 'type': 'meal', 'ingredient': ['salt', 'chicken'], 'quantity': 5},
  { 'type': 'holiday', 'ingredient': ['turkey',  'cranberry'], 'quantity': 10},
  { 'type': 'dessert', 'ingredient': ['honey', 'flour', 'egg'], 'quantity': 5},
]);

// Run a find command to view items sold on April 4th, 2014.
// const salesOnApril4th = db.getCollection('sales').find({
//   date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
// }).count();

//finds a single tag
const recipesMealType = db.getCollection('recipes').find({ type:  "meal" }).count();
//finds multiple tags (&&)
const recipesMultIngredients = db.getCollection('recipes').find({ ingredient: { $all: ["egg", "flour"]} }).count();
//finds any tag (||)
const recipesQuantity = db.getCollection('recipes').find({ quantity:  { $in: [5, 10]} }).count();


// Print a message to the output window.
console.log(`${recipesMealType} recipes that are of type meal`);
console.log(`${recipesMultIngredients} recipes that contain both eggs and flour`);
console.log(`${recipesQuantity} recipes that produce either 5 or 10 units`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
// db.getCollection('sales').aggregate([
//   // Find all of the sales that occurred in 2014.
//   { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
//   // Group the total sales for each product.
//   { $group: { _id: '$type', totalSaleAmount: { $sum: { $multiply: [ '$ingredient', '$quantity' ] } } } }
// ]);
