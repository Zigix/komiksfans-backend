import TokenRepository from "../repository/TokenRepository.js";

export default class TokenService {

    static async generateTokenForUser(userId) {
        const token = this.#generateToken();
        await TokenRepository.saveToken(token, userId);
        return token;
    };

    static #generateToken() {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let str = '';
            for (let i = 0; i < 30; i++) {
                str += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return str;
    }
}