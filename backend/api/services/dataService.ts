import User from "../models/user";


class DataService {

    static saveUser(user: User) {}

    static loadAllUsers(): User[] {
        return [];
    }

}

var users: User[] = []

export {users, DataService};