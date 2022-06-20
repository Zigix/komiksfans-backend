import TokenRepository from "../repository/TokenRepository.js";
import UserRepository from "../repository/UserRepository.js";

export default class PermissionService {

    static getAccessTokenFromRequest(req) {
        const token = req.headers.accesstoken;
        if (token === undefined) {
            throw { error: "No access token provided" };
        }
        return token;
    }

    static async getLoggedUser(accessToken) {
        const userId = await TokenRepository.getUserIdByToken(accessToken);
        const user = await UserRepository.getUserById(userId.user_id);
        return user;
    }

    static async hasRoleAdmin(accessToken) {
        const userId = await TokenRepository.getUserIdByToken(accessToken);
        const user = await UserRepository.getUserById(userId.user_id);
        if (user.role === "admin") return true;
        return false;
    }

    static async hasRoleUser(accessToken) {
        const userId = await TokenRepository.getUserIdByToken(accessToken);
        const user = await UserRepository.getUserById(userId.user_id);
        if (user.role === "user") return true;
        return false;
    }
}