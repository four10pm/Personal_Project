const client = require('../client')
const util = require('../util')

const getAllDateExamples = async () => {
    try {
        const { rows }
         = await client.query(`
            SELECT *
            FROM dateExamples;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getDateExampleById = async (dateExampleId) => {
    try {
        const {
            rows: [dateExample]
        } = await client.query(
            `
                SELECT *
                FROM dateExamples
                WHERE "exampleId" = ${dateExampleId};
            `
        )
        return dateExample;
    } catch (error) {
        throw error
    }
}

const getDateExampleByDateId = async (dateId) => {
    try {
        const { rows } = await client.query(
            `
                SELECT 
                    exs."exampleId" as "exampleId",
                    exs.name as name, 
                    exs.price as price, 
                    exs.description as description, 
                    exs.url as url, 
                    exs."imgUrl" as "imgUrl",
                    exs."beenThere" as "beenThere", 
                    exs.address as address, 
                    exs."dateId" as "dateId",
                    exs.city as "cityId",
                    cities.name as city,
                    cities.state as state
                FROM dateExamples exs
                INNER JOIN cities ON city = cities."cityId"
                WHERE  exs."dateId" = ${dateId};
            `
        )
        return rows;
    } catch (error) {
        throw error
    }
}

const getDateExamplesByCity = async (cityId) => {
    try {
        const { rows } = await client.query(
            `
                SELECT 
                    exs."exampleId" as "exampleId",
                    exs."dateId" as "dateId",
                    exs.name as name, 
                    exs.price as price, 
                    exs.description as description, 
                    exs.url as url, 
                    exs."imgUrl" as "imgUrl",
                    exs."beenThere" as "beenThere", 
                    exs.address as address, 
                    cities.name as city,
                    cities.state as state
                FROM dateExamples exs
                INNER JOIN cities ON city = cities."cityId"
                WHERE city = ${cityId}
            `
        )
        return rows;
    } catch (error) {
        throw error
    }
}


const createDateExample = async ({ name, address, price, description, url, imgUrl, city, dateId }) => {
    try {
        const {
            rows: [dateExample],
        } = await client.query (
            `
                INSERT INTO dateExamples(name, address, price, description, url, "imgUrl", city, "dateId" )
                VALUES($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *;
            `,
            [name, address, price, description, url, imgUrl, city, dateId]
        )
        return dateExample
    } catch (error) {
        throw error
    }
}

async function updateDateExample(dateExampleId, fields) {
    try {
        const toUpdate = {}
        for (let column in fields) {
            if (fields[column] !== undefined) toUpdate[column] = fields[column];
        }
        let dateExample;

        if (util.dbFields(toUpdate).insert.length > 0) {
            const { rows } = await client.query(`
            UPDATE dateExamples
            SET ${util.dbFields(toUpdate).insert}
            WHERE "exampleId"=${dateExampleId}
            RETURNING *;
          `, Object.values(toUpdate));
            dateExample = rows[0];
        }

        return dateExample;
    } catch (error) {
        throw error
    }
}

async function deleteDateExample(dateExampleId) {
    try {
        const { rows } = await client.query('DELETE FROM dateExamples WHERE "exampleId"=$1 RETURNING *', [dateExampleId]);
        return rows[0];
    } catch (err) {
        throw err
    }
}

module.exports = { getAllDateExamples, getDateExampleById, getDateExampleByDateId, getDateExamplesByCity, createDateExample, updateDateExample, deleteDateExample } 