import ComicRepository from "../repository/ComicRepository.js";

export default class ComicService {

    static async createComic(comicData) {
        await ComicRepository.saveComic(comicData);
    }

    static async getAllComics() {
        return await ComicRepository.getAllComics();
    }

    static async getComicById(comicId) {
        const comic = await ComicRepository.getComicById(comicId);
        if (comic === undefined) {
            throw { error: `Comic with id ${comicId} not found` };
        }

        return comic;
    }

    static async searchComics(searchQuery) {
        const key = Object.keys(searchQuery)[0];
        const value = Object.values(searchQuery)[0];
        return await ComicRepository.searchComics(key, value);
    }

    static async modifyComic(comicId, searchQuery) {
        const comic = await ComicRepository.getComicById(comicId);
        if (comic === undefined) {
            throw { error: `Comic with id ${comicId} not found` };
        }
        const key = Object.keys(searchQuery)[0];
        const value = Object.values(searchQuery)[0];

        await ComicRepository.modifyComic(comicId, key, value);
    }
}