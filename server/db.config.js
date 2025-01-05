// pre-passing the configurations of db, so that our app can connect to the db

const dbName = 'food-ordering';
const dbHost = 'localhost';
const dbPort = 27017;
module.exports = {
    url: `mongodb://${dbHost}:${dbPort}/${dbName}`
}