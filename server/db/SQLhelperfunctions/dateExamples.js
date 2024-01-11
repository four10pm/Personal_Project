module.exports = {
    ...require('./client'),
    ...require('./util'),
};

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
                FROM dateExample
                WHERE "dateExampleId" =${dateExampleId};
            `
        )
        return dateExample;
    } catch (error) {
        throw error
    }
}

const createDateExample = async ({ name, address, price, description, url, imgUrl, city }) => {
    try {
        const {
            rows: [dateExample],
        } = await client.query (
            `
                INSERT INTO dateExamples(name, address, price, description, url, imgUrl, city )
                VALUES($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `,
            [name, address, price, description, url, imgUrl, city]
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
            WHERE "dateExampleId"=${dateExampleId}
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
        const { rows } = await client.query('DELETE FROM dateExamples WHERE "dateExampleId"=$1 RETURNING *', [dateExampleId]);
        return rows[0];
    } catch (err) {
        throw err
    }
}

module.exports = { getAllDateExamples, getDateExampleById, createDateExample, updateDateExample, deleteDateExample } 