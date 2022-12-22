import User from "../../../backend/api/models/user";
import { DataService } from "../../../backend/api/services/dataService";

describe("Testing user model functionalities", () => {

    afterEach(async () => {
        /**
         * Delete users from test db
         */
        DataService.deleteAllUsers();
    })

    it("can find user", async () => {
        const masha: User = new User("Masha", "NotMasha", "DefinitelyNotMasha");
        const marton: User = new User("Marton", "NotMarton", "DefinitelyNotMarton");
        DataService.saveUser(masha);
        DataService.saveUser(marton);

        expect(User.getUserBy({ id: masha.id })).toEqual(masha);
        expect(User.getUserBy({ username: marton.username })).toEqual(marton);
    });

    it("cannot find user that doesn't exists", async () => {
        const masha: User = new User("Masha", "NotMasha", "DefinitelyNotMasha");
        DataService.saveUser(masha);

        expect(User.getUserBy({ username: "nonExistingUsername" })).toEqual(undefined);
    });

});
