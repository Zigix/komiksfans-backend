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
}