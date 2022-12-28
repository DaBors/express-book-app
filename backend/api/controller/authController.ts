import { Request, Response } from "express";
import User from "../models/user";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import AuthService from "../services/authService";
import generateResponse from "./responseController";


const authenticate = (request: Request, response: Response) => {
    const { username, password }: { username: string, password: string } = request.body;

    const user: User | undefined = User.getUserBy({ username: username });
    if (user) {
        const verified: boolean = AuthService.verifyUser(user, password);
        if (verified) {
            const token: string = jsonwebtoken.sign({ userId: user.id }, process.env.JWT_SECRET ?? "topSecretJwt", { expiresIn: 86400 });
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
* @returns The User object representing the authenticated user, null if the jwt couldn't be verified
*/
const verifyUser = (request: Request, response: Response): User | null => {
    if (request.headers.authorization && request.headers.authorization.split(" ")[0] === "Bearer") {
        const token = request.headers.authorization.split(' ')[1];
        const jwt: JwtPayload = jsonwebtoken.verify(token, process.env.JWT_SECRET ?? "topSecretJwt") as JwtPayload;

        const user: User | undefined = User.getUserBy({ id: jwt.userId });
        if (user) {
            return user;
        }

        response.sendStatus(400);
        return null;
    }

    response.sendStatus(401);
    return null;
};

export { authenticate, verifyUser };