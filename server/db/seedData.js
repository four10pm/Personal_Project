const client = require('./client');

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
            ('Museum of Modern Art', '11 W 53rd St', '$$-$$$', 'Home to over 200,000 art works!', 'https://www.moma.org/', TRUE, 1)
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
            `)
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