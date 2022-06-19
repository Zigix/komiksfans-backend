import TokenRepository from "../repository/TokenRepository.js";
import UserRepository from "../repository/UserRepository.js";
import PermissionService from "./PermissionService.js";
import TokenService from "./TokenService.js";

export default class AuthService {
    static async register(registerRequest) {
        const { username, email, password, rePassword } = registerRequest;

        const usernameExists = await UserRepository.existsByUsername(username);
        if (usernameExists) {
            throw { error: "This username already exists" };
        }

        const emailExists = await UserRepository.existsByEmail(email);
        if (emailExists) {
            throw { error: "This email already exists" };
        }

        if (password !== rePassword) {
            throw { error: "Passwords doesn't match" };
        }

        await UserRepository.saveUser(registerRequest);
    };


    static async login(loginRequest) {
        const { login, password } = loginRequest;

        const user = await UserRepository.getUserByUsernameAndPassword(login, password);
        if (user === undefined) {
            throw { error: "Invalid username or password" };
        }

        const token = await TokenService.generateTokenForUser(user.id);
        
        return { accessToken: token, user: user };
    }

    static async logout(req) {
        const token = PermissionService.getAccessTokenFromRequest(req);
        await TokenRepository.deleteToken(token);
    }
}