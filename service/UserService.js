import UserRepository from "../repository/UserRepository.js";
import ComicService from "./ComicService.js";

export default class UserService {
    static async getAllUsers() {
        return await UserRepository.getAllUsers();
    };

    static async toggleBlock(userId) {
        const user = await UserRepository.getUserById(userId);
        if (user === undefined) {
            throw { error: `User with id ${userId} doesn't exists` };
        }

        if (user.role === "admin") {
            throw { error: "No permission to block admin user" };
        }

        if (user.is_blocked === 1) { 
            await UserRepository.unblockUser(userId);
            return;
        }

        await UserRepository.blockUser(userId);
    }

    static async deleteUser(userId) {
        const user = await UserRepository.getUserById(userId);
        if (user === undefined) {
            throw { error: `User with id ${userId} doesn't exists`};
        }

        if (user.role === "admin") {
            throw { error: "No permission to delete admin user" };
        }

        await UserRepository.deleteUser(userId);
    }

    static async upgradePermission(userId) {
        const user = await UserRepository.getUserById(userId);
        if (user === undefined) {
            throw { error: `User with id ${userId} doesn't exists`};
        }

        if (user.role === "admin") {
            throw { error: "This user is already admin" };
        }

        await UserRepository.upgradePermission(userId);
    }

    static async toggleFavorite(userId, comicId) {
        console.log(userId + comicId);
        const exists = await UserRepository.existsByFavorite(userId, comicId);
        console.log(exists);
        if (exists) {
            await UserRepository.removeFromFavorite(userId, comicId);
            return;
        }
        await UserRepository.addToFavorite(userId, comicId);
    }

    static async getFavorite(userId) {
        return await UserRepository.getFavorite(userId);
    }
}