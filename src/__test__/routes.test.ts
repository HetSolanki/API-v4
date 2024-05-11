import * as user from "../handlers/user";

describe("GET /", () => {
  it("should creates new user", async () => {
    const req = { body: { username: "het", password: "admin" } };
    const res = {
      json(token) {
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req, res, () => {});
  });
});
