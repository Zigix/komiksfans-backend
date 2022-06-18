import db from "../database/database.js";

export default class UserRepository {
    
    static async getAllUsers() {
        const query = "SELECT * FROM users";
        return await db.all(query);
    };

    static async getUserByUsername(username) {
        const query = `SELECT * FROM users WHERE username='${username}'`;
        return await db.get(query);
    };

    static async getUserById(id) {
        const query = `SELECT * FROM users WHERE username='${id}'`;
        return await db.get(query);
    };

    static async getUserByUsernameAndPassword(username, password) {
        const query = `SELECT id, email, username, role, is_blocked, created_date 
                        FROM users WHERE username='${username}' AND password='${password}'`;
        return await db.get(query);
    }

    static async saveUser(userData) {
        const query = `INSERT INTO users(username, email, password, role) VALUES (?, ?, ?, ?)`;
        await db.run(query, [userData.username, userData.email, userData.password, "user"]);
    };

    static async existsByUsername(username) {
        const query = `SELECT EXISTS(SELECT 1 FROM users WHERE username='${username}')`;
        const result = await db.get(query);
        const exists = Object.values(result);
        if (exists[0] === 1) {
            return true;
        }
        return false;
    };

    static async existsByEmail(email) {
        const query = `SELECT EXISTS(SELECT 1 FROM users WHERE email='${email}')`;
        const result = await db.get(query);
        const exists = Object.values(result);
        if (exists[0] === 1) {
            return true;
        }
        return false;
    }

    static async deleteUser(id) {
        const query = `DELETE FROM users WHERE id='${id}'`;
        await db.run(query);
    }
}