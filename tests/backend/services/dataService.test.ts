import User from "../../../backend/api/models/user";
import { users, DataService } from "../../../backend/api/services/dataService";

describe("Testing data service functionalities", () => {

    it("can store new user", async () => {
        const masha = new User("Masha", "NotMasha", "DefinitelyNotMasha");
        DataService.saveUser(masha);

        expect(1).toEqual(users.length);
    });

});
