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

    static async hasRoleAdmin(req) {
        const token = this.getAccessTokenFromRequest(req);
        console.log(token);
        const userId = await TokenRepository.getUserIdByToken(token);
        console.log(userId);
        const user = await UserRepository.getUserById(userId);
        console.log(user);
        if (user.role === "admin") return true;
        return false;
    }
}