import { Request, Response } from "express";
import User from "../models/user";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import AuthService from "../services/authService";
import generateResponse from "./responseController";

/**
* Authenticates the user by their username and password.
* Returns a response with jwt and 200 code if the authentication was successful, returns 401 status code otherwise
*
* @param request - The request express object 
* @param response - The response express object 
* 
*/
const authenticate = (request: Request, response: Response) => {
    const { username, password }: { username: string, password: string } = request.body;

    const user: User | undefined = User.getUserBy({ username: username });
    if (user) {
        const token: string | null = AuthService.authenticateUser(user, password);
        if (token) {
            return generateResponse(200, { token }, request, response);
        }
    }
    return generateResponse(401, { error: "Incorrect username or password" }, request, response);
};

/**
* Verifies the user making the api call based on the Jwt provided in the authorization header
*
* @param request - The request express object 
* @param response - The response express object 
* 
* @returns The User object representing the authenticated user, returns with 401 if the jwt couldn't be verified
*/
const handleVerifyLoggedInUser = (request: Request, response: Response): User | null => {
    const user: User | null = AuthService.verifyLoggedInUser(request);
    if (user) {
        return user;
    }

    response.sendStatus(401);
    return null;
};

export { authenticate, handleVerifyLoggedInUser };