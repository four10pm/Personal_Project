const client = require('../client')
const util = require('../util')


const getAllDateList = async () => {
    try {
        const { rows }
         = await client.query(`
            SELECT *
            FROM dateList;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getDateTypes = async () => {
    try {
        const { rows }
         = await client.query(`
            SELECT type
            FROM dateList;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getDateListItemById = async (dateListId) => {
    try {
        const {
            rows: [dateList]
        } = await client.query(
            `
                SELECT *
                FROM dateList
                WHERE "dateId" =${dateListId};
            `
        )
        return dateList;
    } catch (error) {
        throw error
    }
}

const createDateListItem = async ({ name, atHome, type, price, description, imgUrl }) => {
    try {
        const {
            rows: [dateList],
        } = await client.query (
            `
                INSERT INTO dateList(name, "atHome", type, price, description, "imgUrl" )
                VALUES($1, $2, $3, $4, $5, $6)
                RETURNING *;
            `,
            [name, atHome, type, price, description, imgUrl]
        )
        return dateList
    } catch (error) {
        throw error
    }
}

async function updateDateListItem(dateListId, fields) {
    try {
        const toUpdate = {}
        for (let column in fields) {
            if (fields[column] !== undefined) toUpdate[column] = fields[column];
        }
        let dateList;

        if (util.dbFields(toUpdate).insert.length > 0) {
            const { rows } = await client.query(`
            UPDATE dateList
            SET ${util.dbFields(toUpdate).insert}
            WHERE "dateId"=${dateListId}
            RETURNING *;
          `, Object.values(toUpdate));
            dateList = rows[0];
        }

        return dateList;
    } catch (error) {
        throw error
    }
}

async function deleteDateListItem(dateListId) {
    try {
        const { rows } = await client.query('DELETE FROM dateList WHERE "dateId"=$1 RETURNING *', [dateListId]);
        return rows[0];
    } catch (err) {
        throw err
    }
}

module.exports = { getAllDateList, getDateTypes, getDateListItemById, createDateListItem, updateDateListItem, deleteDateListItem } 