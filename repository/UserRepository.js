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

    static async getUserById(userId) {
        const query = `SELECT * FROM users WHERE id='${userId}'`;
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

    static async deleteUser(userId) {
        const query = `DELETE FROM users WHERE id='${userId}'`;
        await db.run(query);
    }

    static async blockUser(userId) {
        const query = `UPDATE users SET is_blocked=1 WHERE id='${userId}'`;
        await db.run(query);
    }

    static async unblockUser(userId) {
        const query = `UPDATE users SET is_blocked=0 WHERE id='${userId}'`;
        await db.run(query);
    }

    static async upgradePermission(userId) {
        const query = `UPDATE users SET role='admin' WHERE id='${userId}'`;
        await db.run(query);
    }

    static async existsByFavorite(userId, comicId) {
        const query = `SELECT EXISTS(SELECT 1 FROM users_comics WHERE user_id='${userId}' AND comic_id='${comicId}')`;
        const result = await db.get(query);
        const exists = Object.values(result);
        if (exists[0] === 1) {
            return true;
        }
        return false;
    }

    static async addToFavorite(userId, comicId) {
        const query = `INSERT INTO users_comics(user_id, comic_id) VALUES ('${userId}', '${comicId}')`;
        await db.run(query);
    }

    static async removeFromFavorite(userId, comicId) {
        const query = `DELETE FROM users_comics WHERE user_id='${userId}' AND comic_id='${comicId}'`;
        await db.run(query);
    }

    static async getFavorite(userId) {
        const query = `SELECT c.* FROM comics c LEFT JOIN users_comics uc ON c.id=uc.comic_id WHERE uc.user_id='${userId}'`;
        const result = await db.all(query);
        console.log(result);
        return result;
    }
}