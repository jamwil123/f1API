const request = require("supertest");
const app = require("../app");

describe("/api/", () => {
  it("Status 200: GET returns the correct data ", () => {
    return request(app)
      .get("/api/")
      .expect(200)
      .then(({ body }) => {
        expect(body['temp data']).toBe("TEMP");
      });
  });
  it("Status 404: GET mis-spelled end point returns error", ()=>{
    return request(app)
    .get("/apii/")
    .expect(404)
  })
  it("Status 404: GET mis-spelled end point with wrong data type returns error", ()=>{
    return request(app)
    .get("/1234")
    .expect(404)
  })
});
