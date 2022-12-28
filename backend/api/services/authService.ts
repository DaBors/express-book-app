import * as bcrypt from "bcrypt";
import User from "../models/user";

export default class AuthService {

    /**
    * Creates a hash from the password provided by the user
    *
    * @param password - The password to create the hash from
    * @remarks - The hash contains the salt in itself, so only the hash needs to be stored
    * 
    * @returns The hash of the password
    */
    static generateHash(password: string): string {
        const saltRounds: number = 10;
        const hash: string = bcrypt.hashSync(password, saltRounds);

        return hash;
    }

    /**
    * Verifies if the user has provided the right password that corresponds to the stored hash
    *
    * @param user - The User object that represent the user who needs to be verified
    * @param password - The password that has submitted for verification
    * 
    * @returns Returns true if the password matches to the hash, returns false otherwise
    */
    static authenticateUser(user: User, password: string): boolean {
        if (bcrypt.compareSync(password, user.hash)) {
            return true;
        }

        return false;
    }

}   