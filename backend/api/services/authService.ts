import User from "../models/user";

export default class AuthService {

    static generateHash(password: string): string {
        return "";
    }

    static verifyUser(user: User, password: string): boolean {
        return false;
    }
}