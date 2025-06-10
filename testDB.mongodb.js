/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'summer25_recipeWeb';
const collection = 'recipes';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collection);

// The prototype form to create a collection:
db.createCollection( 
  "recipes",
  {
    capped: false,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title", "ingredients"],
        properties: {
          title: {
            bsonType: "string",
            description: "must be a string and is required"
          },
        ingredients: {
          bsonType: "array",
          items: {
          bsonType: "string"
          }
        }
        }
      }
    },
    validationLevel: "moderate",
    validationAction: "warn",
    //sorts english and case sensitive and accent sensitive
    collation: {
      locale: "en",
      strength: 2
    },
    writeConcern: {
      w: "majority",
      wtimeout: 5000
    },
    //expireAfterSeconds: 3600, // used with TTL index
});

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
