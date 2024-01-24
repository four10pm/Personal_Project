const client = require('../client')
const util = require('../util')

const getAllUsers = async () => {
    try {
        const { rows }
         = await client.query(`
            SELECT *
            FROM users;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getUserById = async (username) => {
    try {
        const {
            rows: [user]
        } = await client.query(
            `
                SELECT *
                FROM users
                WHERE username = '${username}';
            `
        )
        return user;
    } catch (error) {
        throw error
    }
}

const createUser = async ({ name, username, password, city }) => {
    try {
        const {
            rows: [user],
        } = await client.query (
            `
                INSERT INTO users(name, username, password, city)
                VALUES($1, $2, $3, $4)
                RETURNING *;
            `,
            [name, username, password, city]
        )
        return user
    } catch (error) {
        throw error
    }
}

async function updateUser(userId, fields) {
    try {
        const toUpdate = {}
        for (let column in fields) {
            if (fields[column] !== undefined) toUpdate[column] = fields[column];
        }
        let user;

        if (util.dbFields(toUpdate).insert.length > 0) {
            const { rows } = await client.query(`
            UPDATE user
            SET ${util.dbFields(toUpdate).insert}
            WHERE "userId"=${userId}
            RETURNING *;
          `, Object.values(toUpdate));
            user = rows[0];
        }

        return user;
    } catch (error) {
        throw error
    }
}

async function deleteUser(userId) {
    try {
        const { rows } = await client.query('DELETE FROM users WHERE "userId"=$1 RETURNING *', [userId]);
        return rows[0];
    } catch (err) {
        throw err
    }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser } 