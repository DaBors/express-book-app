import AuthService from '../services/authService';

export default class User {

    id: string;
    username: string;
    hash: string;
    authorPseudonym: string;

    constructor(username: string, password: string, authorPseudonym: string) {
        this.id = "";
        this.username = username;
        this.hash = AuthService.generateHash(password);
        this.authorPseudonym = authorPseudonym;
    }

}

