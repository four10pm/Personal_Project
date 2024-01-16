const client = require('../client')
const util = require('../util')

const getAllCities = async () => {
    try {
        const { rows }
         = await client.query(`
            SELECT *
            FROM cities;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getCityById = async (cityId) => {
    try {
        const {
            rows: [city]
        } = await client.query(
            `
                SELECT *
                FROM cities
                WHERE "cityId" =${cityId};
            `
        )
        return city;
    } catch (error) {
        throw error
    }
}

const createCity = async ({ name, state }) => {
    try {
        const {
            rows: [city],
        } = await client.query (
            `
                INSERT INTO cities(name, state )
                VALUES($1, $2)
                RETURNING *;
            `,
            [name, state]
        )
        return city
    } catch (error) {
        throw error
    }
}

async function updateCity(cityId, fields) {
    try {
        const toUpdate = {}
        for (let column in fields) {
            if (fields[column] !== undefined) toUpdate[column] = fields[column];
        }
        let city;

        if (util.dbFields(toUpdate).insert.length > 0) {
            const { rows } = await client.query(`
            UPDATE city
            SET ${util.dbFields(toUpdate).insert}
            WHERE "cityId"=${cityId}
            RETURNING *;
          `, Object.values(toUpdate));
            city = rows[0];
        }

        return city;
    } catch (error) {
        throw error
    }
}

async function deleteCity(cityId) {
    try {
        const { rows } = await client.query(
            `DELETE FROM cities 
            WHERE "cityId"=$1 
            RETURNING *`, 
            [cityId]);
        return rows[0];
    } catch (err) {
        throw err
    }
}


module.exports = { getAllCities, getCityById, createCity, updateCity, deleteCity } 