import User from "../../../backend/api/models/user";
import { users, DataService } from "../../../backend/api/services/dataService";

describe("Testing data service functionalities", () => {

    xit("can store new user", async () => {
        const userCountBefore = users.length;
        const masha = new User("Masha", "NotMasha", "DefinitelyNotMasha");
        DataService.saveUser(masha);

        expect(userCountBefore).toEqual(users.length - 1);
    });

});
