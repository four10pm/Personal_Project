const client = require('./client');
const { rebuildDB, testDB } = require('./seedData');

async function dropTables() {
    try {
        console.log('Dropping All Tables...');
        await client.query(`
      DROP TABLE IF EXISTS dateList;
      DROP TABLE IF EXISTS dateExamples;
      DROP TABLE IF EXISTS city;
      DROP TABLE IF EXISTS users;
    `);
    } catch (error) {
        throw error;
    }
}

async function createTables() {
    try {
        console.log('Building All Tables...');
        await client.query(`
        CREATE TABLE dateList (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            "atHome" BOOLEAN DEFAULT false,
            type VARCHAR(25) UNIQUE NOT NULL,
            price VARCHAR(10) NOT NULL,
            description TEXT NOT NULL,
            "imgUrl" VARCHAR(255) DEFAULT 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Ddating&psig=AOvVaw3s5euocQv2ZACjFrFxB3IC&ust=1705087443798000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNCT_PWH1oMDFQAAAAAdAAAAABAa' 
            "lastDone" TIMESTAMP,
            examples INTEGER UNIQUE NOT NULL
            );
        CREATE TABLE dateExamples (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            address VARCHAR(255) NOT NULL,
            price VARCHAR(10) NOT NULL,
            description TEXT NOT NULL,
            url TEXT NOT NULL,
            "imgUrl" VARCHAR(255) DEFAULT 'https://media.istockphoto.com/id/506670970/photo/sharing-a-moment-of-romance.jpg?s=612x612&w=0&k=20&c=GGgoSU2yMdLX9FChw7jzKeMmlOWomqJlVRyFi7Oau2w='
            "beenThere" BOOLEAN DEFAULT false,
            "city" INTEGER, 
            );
        CREATE TABLE city (
            id SERIAL PRIMARY KEY,
            name VARCHAR(25) UNIQUE NOT NULL,
            state VARCHAR(15) UNIQUE NOT NULL
        )
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL, 
            username VARCHAR(25) UNIQUE NOT NULL,
            city INTEGER,
            favorites INTEGER,
            "latestActivity" INTEGER
        )
        `);
    } catch (error) {
        throw error;
    }
}


rebuildDB()
  .catch(console.error)
  .finally(() => client.end());