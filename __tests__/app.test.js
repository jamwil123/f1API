const request = require("supertest");
const app = require("../app");
const {changeStringToUpperCaseFirstCharOnly} = require('../utils/utilityFunctions')

describe("/api/", () => {
  it("Status 200: GET returns the correct data ", () => {
    return request(app)
      .get("/api/")
      .expect(200)
      .then(({ body }) => {
        expect(body["temp data"]).toBe("TEMP");
      });
  });
  it("Status 404: GET mis-spelled end point returns error", () => {
    return request(app).get("/apii/").expect(404);
  });
  it("Status 404: GET mis-spelled end point with wrong data type returns error", () => {
    return request(app).get("/1234").expect(404);
  });
  describe("/api/drivers", () => {
    it("status 200: GET gets all the drivers from the grid", () => {
      return request(app)
        .get("/api/drivers")
        .expect(200)
        .then(({ body }) => {
          expect(body[0]).toEqual({
            Team: expect.any(String),
            name: expect.any(String),
          });
          expect(body.length).toBe(20);
        })
        
    })
    it("Status 404: Wrong end point typed in", ()=>{
      return request(app)
      .get("/api/driverss")
      .expect(404)
    })
    it("Status 404: Wrong end point typed in (wrong data type)", ()=>{
      return request(app)
      .get("/api/drivers123")
      .expect(404)
    })
  });
  describe("Util function: ChangeStringToUpperCaseFirstCharOnly", ()=>{
    it('Inputs a string with underscores between names and returns with capitalised first character', ()=>{
      expect(changeStringToUpperCaseFirstCharOnly("string_value")).toBe('String Value')
      expect(changeStringToUpperCaseFirstCharOnly("string_value_aditional_words")).toBe('String Value Aditional Words')
    })
    it('Inputs a string with underscores between names and returns with capitalised first character even if it already starts capitalised', ()=>{
      expect(changeStringToUpperCaseFirstCharOnly("string_value".toUpperCase())).toBe('String Value')
      expect(changeStringToUpperCaseFirstCharOnly("string_value_aditional_words".toUpperCase())).toBe('String Value Aditional Words')
    })
  })
});
