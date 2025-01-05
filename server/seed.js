// Importing the required libraries
const { faker } = require('@faker-js/faker'); // Used to generate fake data for testing
const MongoClient = require("mongodb").MongoClient; // MongoDB client for connecting to the database
const _ = require("lodash"); // Utility library to simplify operations like random sampling

// Main asynchronous function to perform database operations
async function main() {
    // MongoDB connection URI (Ensure MongoDB server is running)
    const uri = "mongodb://127.0.0.1:27017"; // Localhost connection to MongoDB
    const client = new MongoClient(uri); // Creating a MongoDB client instance

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Accessing the `products` and `categories` collections from the `food-ordering` database
        const productsCollection = client.db("food-ordering").collection("products");
        const categoriesCollection = client.db("food-ordering").collection("categories");

        // Step 1: Create and insert categories
        // Categories represent different product types (e.g., breakfast, lunch, etc.)
        let categories = ['breakfast', 'lunch', 'dinner', 'drinks'].map((category) => {
            return { name: category }; // Mapping each category name to an object
        });
        await categoriesCollection.insertMany(  categories); // Insert all categories into the `categories` collection

        // Step 2: Define a list of image URLs for products
        // These URLs point to product images stored in the cloud (e.g., Cloudinary)
        let imageUrls = [
            'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/1_mfgcb5.png',
            'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/2_afbbos.png',
            'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/3_iawvqb.png',
        ];

        // Step 3: Generate products with random attributes
        let products = [];
        for (let i = 0; i < 10; i += 1) { // Loop to create 10 products
            let newProduct = {
                // Using faker to generate random product data
                name: faker.commerce.productName(), // Random product name
                adjective: faker.commerce.productAdjective(), // Random adjective
                desciption: faker.commerce.productDescription(), // Random description
                price: faker.commerce.price(), // Random price
                category: _.sample(categories).name, // Randomly pick one category from the list
                imageUrl: _.sample(imageUrls) // Randomly pick one image URL from the list
            };
            
            products.push(newProduct); // Add the new product to the products array
        }
        console.log('Generated products:', products);

        // Insert the generated products into the `products` collection
        const result = await productsCollection.insertMany(products);
        console.log('Insert result:', result);

    } catch (e) {
        // Catch and log any errors that occur during the process
        console.error(e);
    } finally {
        // Close the MongoDB client connection
        await client.close();
    }
}

// Invoke the main function to run the script
main();
