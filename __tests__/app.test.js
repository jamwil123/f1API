const request = require("supertest");
const db = require('../db/db')
const app = require("../app");
const {
  changeStringToUpperCaseFirstCharOnly,
} = require("../utils/utilityFunctions");

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
            previous_seat: expect.any(String),
            years_in_f1: expect.any(Number),
            favourite_car: expect.any(String)
          });
          expect(body.length).toBe(20);
        });
    });
    it("Status 404: Wrong end point typed in", () => {
      return request(app).get("/api/driverss").expect(404);
    });
    it("Status 404: Wrong end point typed in (wrong data type)", () => {
      return request(app).get("/api/drivers123").expect(404);
    });
  });
  describe("/api/drivers/:driversname", () => {
    it("Status 200: GETS driver data from a name in end point", () => {
      return request(app)
        .get("/api/drivers/lewis_hamilton")
        .expect(200)
        .then(({ body }) => {
          expect(body[0]).toEqual({
            "Lewis Hamilton": expect.any(Object),
          });
          expect(body.length).toBe(1);
        });
    });
    it("Status 200: fetches the data even when uppercase letters are included", () => {
      return request(app)
        .get("/api/drivers/lEwIs_hAmIlToN")
        .expect(200)
        .then(({ body }) => {
          expect(body[0]).toEqual({
            "Lewis Hamilton": expect.any(Object),
          });
          expect(body.length).toBe(1);
        });
    });
    it("Status 404: It will not return the data when names arent seperated by an underscore", () => {
      return request(app).get("/api/drivers/LewisHamilton").expect(404);
    });
    it("Status 404: It will not return the data when the name is not in the database", () => {
      return request(app).get("/api/drivers/Nikita_Mazepin").expect(404);
    });
  });
  describe("/api/teams", () => {
    it("status 200: returns a full list of the teams", () => {
      return request(app)
        .get("/api/teams")
        .expect(200)
        .then(({ body }) => {
          expect(body[0]).toEqual({
            'constructors-points': expect.any(Number),
            'last-win': expect.any(String)
          });
          expect(body.length).toBe(10);
        });
    });
    it("Status 404: When entered the wrong end point", () => {
      return request(app).get("/api/teamsss").expect(404);
    });
    it("Status 404: When entered the wrong datatype in the end point", () => {
      return request(app).get("/api/123456").expect(404);
    });
  });
  describe("/api/teams/constructors", () => {
    it("status 200: Returns a list of all the constructors in desc order as default", () => {
      return request(app)
        .get("/api/teams/constructors")
        .expect(200)
        .then(({ body }) => {
          body.map((team) => {
            expect(team).toEqual({
              [Object.keys(team)[0]]: expect.any(Object),
            });
          })
          expect(Object.keys(body[0])[0]).toEqual('Aston Martin')
        });
    })
    it('Status 200: Returns the constructors in asc order', ()=>{
      return request(app)
        .get("/api/teams/constructors?sort_by=asc")
        .expect(200)
        .then(({ body }) => {
          body.map((team) => {
            expect(team).toEqual({
              [Object.keys(team)[0]]: expect.any(Object),
            });
          })
          expect(body[0][Object.keys(body[0])[0]]["constructors-points"]).toBe(0)
        });
    })
    it('Status 200: Returns the constructors in desc order', ()=>{
      return request(app)
        .get("/api/teams/constructors?sort_by=desc")
        .expect(200)
        .then(({ body }) => {
          body.map((team) => {
            expect(team).toEqual({
              [Object.keys(team)[0]]: expect.any(Object),
            });
          })
          expect(Object.keys(body[0])[0]).toEqual('Aston Martin')
        });
    })
    it('Status 400: Injections prevented when using sort_by query', ()=>{
      return request(app)
        .get("/api/teams/constructors?sort_by=descccc")
        .expect(400)
        .then(({text}) => {
          expect(text).toBe("Invalid sort query")
    })
  })
  describe('/api/drivers/data/add_data', ()=>{
    it('Status 200: POSTS new data into the DB', ()=>{
      return request(app)
      .post("/api/drivers/data/add_data")
      .send({"new_data": "test data" })
      .expect(201)
      .then(({body})=>{
        expect(body[0]['new_data']).toEqual('test data')
        return body
      }).then((drivers)=>{
        return request(app)
        .delete('/api/drivers/data/delete_data')
        .send({"new_data": "test data" })
        .expect(200)
      })
    })
  })
  });
  describe("Util function: ChangeStringToUpperCaseFirstCharOnly", () => {
    it("Inputs a string with underscores between names and returns with capitalised first character", () => {
      expect(changeStringToUpperCaseFirstCharOnly("string_value")).toBe(
        "String Value"
      );
      expect(
        changeStringToUpperCaseFirstCharOnly("string_value_aditional_words")
      ).toBe("String Value Aditional Words");
    });
    it("Inputs a string with underscores between names and returns with capitalised first character even if it already starts capitalised", () => {
      expect(
        changeStringToUpperCaseFirstCharOnly("string_value".toUpperCase())
      ).toBe("String Value");
      expect(
        changeStringToUpperCaseFirstCharOnly(
          "string_value_aditional_words".toUpperCase()
        )
      ).toBe("String Value Aditional Words");
    });
    it("returns a capitalised string when passed only one word with no underscore", () => {
      expect(changeStringToUpperCaseFirstCharOnly("mercedes")).toBe("Mercedes");
    });
  });
});
