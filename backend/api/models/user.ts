import { v4 as uuidv4 } from "uuid";
import AuthService from "../services/authService";
import { users } from "../services/dataService";

export default class User {

    id: string;
    username: string;
    hash: string;
    authorPseudonym: string;

    constructor(username: string, password: string, authorPseudonym: string) {
        this.id = uuidv4();
        this.username = username;
        this.hash = AuthService.generateHash(password);
        this.authorPseudonym = authorPseudonym;
    }

    /**
    * Returns a `User` by one of it's unique identifiers `id` or `username`
    *
    * @param id - The `id` of the user to look it up by
    * @param username - The `username` of the user to look it up by
    * 
    * @returns The `User` in case it is found by one of its id, returns `undefined` otherwise
    */
    static getUserBy({ id = "", username = "" }): User | undefined {
        var user: User | undefined;
        if (id) {
            user = users.find((user) => {
                return user.id === id;
            });

            return user;
        }
        else if (username) {
            user = users.find((user) => {
                return user.username === username;
            });

            return user;
        }

        return undefined;
    }

}

