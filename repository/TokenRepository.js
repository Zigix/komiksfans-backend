import db from "../database/database.js";

export default class TokenRepository {

    static async saveToken(token, userId) {
        const query = `INSERT INTO tokens(token, user_id) VALUES ('${token}', '${userId}')`;
        await db.run(query);
    }

    static async deleteToken(token) {
        const query = `DELETE FROM tokens WHERE token='${token}'`;
        await db.run(query);
    }

    static async existsByToken(token) {
        const query = `SELECT EXISTS(SELECT 1 FROM tokens WHERE token='${token}')`;
        const result = await db.run(query);
        const exists = Object.values(result);
        if (exists[0] === 1) {
            return true;
        }
        return false;
    }

    static async getUserIdByToken(token) {
        const query = `SELECT user_id FROM tokens WHERE token='${token}'`;
        return await db.get(query);
    }
}