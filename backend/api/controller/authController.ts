import { Request, Response } from "express";
import xml from "xml";
import User from "../models/user";
import jsonwebtoken from "jsonwebtoken";
import AuthService from "../services/authService";

const generateResponse = (respCode: number, respInfo: Object, req: Request, res: Response) => {
    const contentType: string | undefined = req.headers["content-type"]
    if (contentType === "application/json") {
        res.status(respCode).json(respInfo);
    }
    else if (contentType === "text/xml") {
        res.set("Content-Type", "text/xml");
        res.status(respCode).send(xml(JSON.stringify(respInfo)));
    }
    else {
        res.sendStatus(400);
    }
}


const authenticate = (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user: User | undefined = User.getUserBy({ username: username });
    if (user) {
        const verified: boolean = AuthService.verifyUser(user, password);
        console.log(verified)
        if (verified) {
            const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET ?? "topSecretJwt", { expiresIn: 86400 });
            return generateResponse(200, { token }, req, res);
        }
    } 
    return generateResponse(401, {error: "Incorrect username or password"}, req, res);
};

export { authenticate };