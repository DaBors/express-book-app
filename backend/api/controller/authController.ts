import { Request, Response } from "express";
import User from "../models/user";
import jsonwebtoken from "jsonwebtoken";
import AuthService from "../services/authService";
import generateResponse from "./responseController";


const authenticate = (req: Request, res: Response) => {
    const { username, password }: { username: string, password: string } = req.body;

    const user: User | undefined = User.getUserBy({ username: username });
    if (user) {
        const verified: boolean = AuthService.verifyUser(user, password);
        if (verified) {
            const token: string = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET ?? "topSecretJwt", { expiresIn: 86400 });
            return generateResponse(200, { token }, req, res);
        }
    }
    return generateResponse(401, { error: "Incorrect username or password" }, req, res);
};

export { authenticate };