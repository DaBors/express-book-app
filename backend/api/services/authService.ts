import * as bcrypt from "bcrypt";
import { Request } from "express";
import User from "../models/user";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

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
    * Verifies if the user has provided the right password that corresponds to the stored hash and returns the authorization jwt
    *
    * @param user - The User object that represent the user who needs to be verified
    * @param password - The password that has submitted for verification
    * 
    * @returns Returns the authorization jwt if the password matches to the hash, returns null otherwise
    */
    static authenticateUser(user: User, password: string): string | null {
        if (bcrypt.compareSync(password, user.hash)) {
            const token: string = jsonwebtoken.sign({ userId: user.id }, process.env.JWT_SECRET ?? "topSecretJwt", { expiresIn: 86400 });
            return token
        }

        return null;
    }

    /**
    * Verifies the user making the api call based on the Jwt provided in the authorization header
    *
    * @param request - The request express object
    * 
    * @returns The User object representing the authenticated user, null if the jwt couldn't be verified
    */
    static verifyLoggedInUser(request: Request): User | null {
        if (request.headers.authorization && request.headers.authorization.split(" ")[0] === "Bearer") {
            const token = request.headers.authorization.split(' ')[1];
            const jwt: JwtPayload = jsonwebtoken.verify(token, process.env.JWT_SECRET ?? "topSecretJwt") as JwtPayload;
    
            const user: User | undefined = User.getUserBy({ id: jwt.userId });
            if (user) {
                return user;
            }
        }

        return null;
    }
}   