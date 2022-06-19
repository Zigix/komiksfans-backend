import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

/* 
const createComicsTable = `CREATE TABLE IF NOT EXISTS comics (

)`; */
export default await (async () => {
	// open the database
	const db = await open({
		filename: "./komiksfans.sqlite",
		driver: sqlite3.Database,
	});

    const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            email VARCHAR UNIQUE NOT NULL,
            username VARCHAR UNIQUE NOT NULL,
            password VARCHAR NOT NULL,
            role TEXT NOT NULL CHECK(role in ('user', 'admin')),
            is_blocked INTEGER DEFAULT 0 CHECK(is_blocked in (0, 1)),
            created_date DATE DEFAULT CURRENT_DATE
        )`;
    await db.run(createUsersTable);

    const createTokensTable = `CREATE TABLE IF NOT EXISTS tokens (
        token VARCHAR NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) 
    )`;
    await db.run(createTokensTable);

    const createComicsTable = `CREATE TABLE IF NOT EXISTS comics (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        title VARCHAR NOT NULL,
        description VARCHAR NOT NULL,
        series VARCHAR,
        drawer VARCHAR NOT NULL,
        publisher VARCHAR NOT NULL,
        release_date DATE,
        category VARCHAR NOT NULL,
        added_date DATE DEFAULT CURRENT_DATE
    )`;
    await db.run(createComicsTable);

	return db;
})();