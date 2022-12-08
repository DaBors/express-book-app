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

    static getUserBy({ id = null, username = "" }): User | undefined {
        var user: User | undefined;
        if (id) {
            user = users.find((user) => {
                return user.id === id;
            });
        }
        else if (username) {
            user = users.find((user) => {
                return user.username === username;
            });
        }

        return undefined;
    }

}

