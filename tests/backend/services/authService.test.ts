import User from "../../../backend/api/models/user";
import AuthService from "../../../backend/api/services/authService";

describe("Testing auth service functionalities", () => {

    xit("can verify user with right password", async () => {
        const marton = new User("Marton", "NotMarton", "DefinitelyNotMarton");
        expect(AuthService.verifyUser(marton, "NotMarton")).toEqual(true);
    });

    xit("won't verify user with wrong password", async () => {
        const marton = new User("Marton", "NotMarton", "DefinitelyNotMarton");
        expect(AuthService.verifyUser(marton, "admin")).toEqual(false);
    });

});
