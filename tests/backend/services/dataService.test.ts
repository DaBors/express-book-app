import User from "../../../backend/api/models/user";
import { users, DataService } from "../../../backend/api/services/dataService";

describe("Testing data service functionalities", () => {

    afterEach(async () => {
        /**
         * Delete users from test db
         */
        DataService.deleteAllUsers();
    })

    it("can store new user", async () => {
        const masha = new User("Masha", "NotMasha", "DefinitelyNotMasha");
        DataService.saveUser(masha);

        expect(1).toEqual(users.length);
    });

    it("can delete all users", async () => {
        const masha = new User("Masha", "NotMasha", "DefinitelyNotMasha");
        DataService.saveUser(masha);

        DataService.deleteAllUsers();
        expect(0).toEqual(users.length);
    });

});
