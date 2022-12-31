import User from "../../../backend/api/models/user";
import AuthService from "../../../backend/api/services/authService";
import jsonwebtoken from "jsonwebtoken";

describe("Testing auth service functionalities", () => {

    it("can verify user with right password", async () => {
        const marton: User = new User("Marton", "NotMarton", "DefinitelyNotMarton");
        expect(AuthService.authenticateUser(marton, "NotMarton")).toEqual(jsonwebtoken.sign({ userId: marton.id }, process.env.JWT_SECRET ?? "topSecretJwt", { expiresIn: 86400 }));
    });

    it("won't verify user with wrong password", async () => {
        const marton: User = new User("Marton", "NotMarton", "DefinitelyNotMarton");
        expect(AuthService.authenticateUser(marton, "admin")).toEqual(null);
    });

});
