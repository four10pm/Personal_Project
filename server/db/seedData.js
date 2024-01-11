// const client = require('./client');
// const {dropTables, createTables} = require('./seed')

const client = require('./client');

async function dropTables() {
    try {
        console.log('Dropping All Tables...');
        await client.query(`
      DROP TABLE IF EXISTS dateList;
      DROP TABLE IF EXISTS dateExamples;
      DROP TABLE IF EXISTS cities;
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
            "dateId" SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            "atHome" BOOLEAN DEFAULT false,
            type VARCHAR(25) UNIQUE NOT NULL,
            price VARCHAR(10) NOT NULL,
            description TEXT NOT NULL,
            "imgUrl" VARCHAR(255) DEFAULT 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Ddating&psig=AOvVaw3s5euocQv2ZACjFrFxB3IC&ust=1705087443798000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNCT_PWH1oMDFQAAAAAdAAAAABAa',
            "lastDone" DATE,
            examples INTEGER UNIQUE
            );
        CREATE TABLE dateExamples (
            "exampleId" SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            address VARCHAR(255) NOT NULL,
            price VARCHAR(10) NOT NULL,
            description TEXT NOT NULL,
            url TEXT NOT NULL,
            "imgUrl" VARCHAR(255) DEFAULT 'https://media.istockphoto.com/id/506670970/photo/sharing-a-moment-of-romance.jpg?s=612x612&w=0&k=20&c=GGgoSU2yMdLX9FChw7jzKeMmlOWomqJlVRyFi7Oau2w=',
            "beenThere" BOOLEAN DEFAULT false,
            city INTEGER 
            );
        CREATE TABLE cities (
            "cityId" SERIAL PRIMARY KEY,
            name VARCHAR(25) UNIQUE NOT NULL,
            state VARCHAR(15) UNIQUE NOT NULL
        );
        CREATE TABLE users (
            "userId" SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL, 
            username VARCHAR(25) UNIQUE NOT NULL,
            token VARCHAR(100),
            city INTEGER,
            favorites INTEGER,
            "latestActivity" INTEGER
        );
        `);
    } catch (error) {
        throw error;
    }
}

async function createInitialData() {
    try {
        console.log('Creating Initial Data...');
        await client.query(`
        INSERT INTO dateList (name, "atHome", type, price, description, "imgUrl", "lastDone")
        VALUES
            ('Art museum', FALSE, 'art', '$-$$', 'Pick out an art style you want to explore, or look for a special exhibit!', 'https://www.apollo-magazine.com/wp-content/uploads/2021/03/Web-lead-image_FINAL_MET_ZOOM.jpg?resize=900%2C600', '2024-01-01'),
            ('Board game night', TRUE, 'cozy', 'Free - $$', 'Play a co-op game to get closer, or turn up the heat with a competitive game and a prize for the winner!', 'https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233.jpg', '2024-01-01')
            `);
        await client.query(`
        INSERT INTO dateExamples (name, address, price, description, url, "beenThere", city)
        VALUES
            ('Metropolitan Museum of Art', '1000 Fifth Avenue', '$-$$', 'The largest art museum in the Americas!', 'https://www.metmuseum.org/', TRUE, 1),
            ('Museum of Modern Art', '11 W 53rd St', '$$-$$$', 'Home to over 200,000 art works!', 'https://www.moma.org/', TRUE, 1),
            ('Portland Art Museum', '1219 SW Park Ave', '$$', 'The largest art museum in Oregon!', 'https://portlandartmuseum.org/', FALSE, 2)
        `);
        await client.query(`
        INSERT INTO cities (name, state)
        VALUES
            ('New York', 'New York'),
            ('Portland', 'Oregon')
        `);
        await client.query(`
            INSERT INTO users (name, username, token, city)
            VALUES 
                ('Paulina', 'p@f.com', '321', 2)
            `);
        console.log("Yay")
    } catch (error) {
        throw error;
    }
}

async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialData();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    rebuildDB
};