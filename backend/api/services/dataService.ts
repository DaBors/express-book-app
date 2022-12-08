import * as fs from "fs";
import User from "../models/user";
import development_data from "../database/development_users.json";
import test_data from "../database/test_users.json";

class DataService {

    /**
    * Saves a User in the db in case the username doesn't already exists
    *
    * @param user - The `user` object to be saved
    * 
    * @returns `true` if the user was successfully saved, returns `false` otherwise
    */
    static saveUser(user: User): boolean {
        if (User.getUserBy({ username: user.username }) === undefined) {
            users.push(user)
            fs.writeFileSync(`./backend/api/database/${process.env.NODE_ENV}_users.json`, JSON.stringify(users, null, 2), "utf-8");

            return true;
        }

        return false;
    }

    /**
    * Returns all the users stored in the db corresponding to the current environment
    * 
    * @returns `User` array that holds the data of the users stored in the db
    */
    static loadAllUsers(): User[] {
        switch (process.env.NODE_ENV) {
            case "development": {
                return development_data as User[];
            }
            case "test": {
                return test_data as User[];
            }
            default: {
                return []
            }
        }

    }

}

/**
* Stores all the `User` objects in the current environment
*/
var users: User[] = DataService.loadAllUsers();

export { users, DataService };