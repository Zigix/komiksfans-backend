import db from "../database/database.js";

export default class ComicRepository {
    
    static async saveComic(comicData) {
        const { title, description, series, drawer, publisher, release, category } = comicData;
        const query = `INSERT INTO comics(title, description, series, drawer, publisher, release_date, category) 
                    VALUES ('${title}', '${description}', '${series}', '${drawer}', '${publisher}', '${release}', '${category}')`;
        await db.run(query);
    };

    static async getAllComics() {
        const query = `SELECT * FROM comics`;
        return await db.all(query);
    }

    static async getComicById(comicId) {
        const query = `SELECT * FROM comics WHERE id='${comicId}'`;
        return await db.get(query);
    }

    static async deleteComic(comicId) {
        const query = `DELETE FROM comics WHERE id='${comicId}'`;
        await db.run(query);
    }
}