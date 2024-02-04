import app from "../app";
import { Driver } from "../types/drivers";
import { Team } from "../types/teams";
import { changeStringToUpperCaseFirstCharOnly } from "../utils/utilityFunctions";
import request from "supertest";

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
      request(app)
        .get("/api/drivers")
        .expect(200)
        .then(({ body }) => {
          // Now you can use Jest assertions to check the structure of the response
          expect(body).toBeInstanceOf(Array);
          expect(body.length).toBe(20);

          body.map((driver) => {
            expect(driver).toHaveProperty("WDCs", expect.any(String));
            expect(driver).toHaveProperty("country", expect.any(String));
            expect(driver).toHaveProperty("dateOfBirth", expect.any(String));
            expect(driver).toHaveProperty("driversNo", expect.any(String));
            expect(driver).toHaveProperty(
              "grandPrixEntered",
              expect.any(String)
            );
            expect(driver).toHaveProperty("highestGridPos", expect.any(String));
            expect(driver).toHaveProperty(
              "highestRaceFinish",
              expect.any(String)
            );
            expect(driver).toHaveProperty("name", expect.any(String));
            expect(driver).toHaveProperty("placeOfBirth", expect.any(String));
            expect(driver).toHaveProperty("podiums", expect.any(String));
            expect(driver).toHaveProperty("totalPoints", expect.any(String));
            expect(driver).toHaveProperty("totalWins", expect.any(String));
          });
        });
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

  it("Status 404: It will not return the data when names aren't separated by an underscore", () => {
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
        expect(body.length).toBe(10);

        body.forEach((team: Team) => {
          expect(team).toEqual({
            chassis: expect.any(String),
            currentDrivers: expect.arrayContaining([expect.any(String)]),
            firstEntry: expect.any(String),
            fullTeamName: expect.any(String),
            highestRaceFinish: expect.any(String),
            powerUnit: expect.any(String),
            teamBase: expect.any(String),
            teamChief: expect.any(String),
            technicalChief: expect.any(String),
            totalFastestLaps: expect.any(String),
            totalPolePositions: expect.any(String),
            totalWins: expect.any(String),
            worldConstructorChampionships: expect.any(String),
          });
        });
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
        expect(Array.isArray(body)).toBe(true); // Check if response is an array

        // Check if the teams are sorted in descending order by fullTeamName
        const teamNames = body.map((team: Team) => team.fullTeamName);
        const sortedTeamNames = [...teamNames].sort((a, b) =>
          b.localeCompare(a)
        );
        expect(teamNames).toEqual(sortedTeamNames);

        body.forEach((team: Team) => {
          // Check if the team data structure matches the Team interface
          expect(team).toEqual({
            chassis: expect.any(String),
            currentDrivers: expect.arrayContaining([expect.any(String)]),
            firstEntry: expect.any(String),
            fullTeamName: expect.any(String),
            highestRaceFinish: expect.any(String),
            powerUnit: expect.any(String),
            teamBase: expect.any(String),
            teamChief: expect.any(String),
            technicalChief: expect.any(String),
            totalFastestLaps: expect.any(String),
            totalPolePositions: expect.any(String),
            totalWins: expect.any(String),
            worldConstructorChampionships: expect.any(String),
          });
        });
      });
  });

  it("Status 200: Returns the constructors in asc order", () => {
    return request(app)
      .get("/api/teams/constructors?sort_by=asc")
      .expect(200)
      .then(({ body }) => {
        const teamNames = body.map((team: Team) => team.fullTeamName);
        const sortedTeamNames = [...teamNames]
          .sort((a, b) => b.localeCompare(a))
          .reverse();
        expect(teamNames).toEqual(sortedTeamNames);

        body.forEach((team: Team) => {
          // Check if the team data structure matches the Team interface
          expect(team).toEqual({
            chassis: expect.any(String),
            currentDrivers: expect.arrayContaining([expect.any(String)]),
            firstEntry: expect.any(String),
            fullTeamName: expect.any(String),
            highestRaceFinish: expect.any(String),
            powerUnit: expect.any(String),
            teamBase: expect.any(String),
            teamChief: expect.any(String),
            technicalChief: expect.any(String),
            totalFastestLaps: expect.any(String),
            totalPolePositions: expect.any(String),
            totalWins: expect.any(String),
            worldConstructorChampionships: expect.any(String),
          });
        });
      });
  });

  it("Status 200: Returns the constructors in desc order", () => {
    return request(app)
      .get("/api/teams/constructors?sort_by=desc")
      .expect(200)
      .then(({ body }) => {
        const teamNames = body.map((team: Team) => team.fullTeamName);
        const sortedTeamNames = [...teamNames].sort((a, b) =>
          b.localeCompare(a)
        );
        expect(teamNames).toEqual(sortedTeamNames);
      });
  });

  it("Status 400: Injections prevented when using sort_by query", () => {
    return request(app)
      .get("/api/teams/constructors?sort_by=descccc")
      .expect(400)
      .then(({ text }) => {
        expect(text).toBe("Invalid sort_by value.");
      });
  });
});

describe("/api/drivers/data/add_data", () => {
  it("Status 200: POSTS new data into the DB", () => {
    return request(app)
      .post("/api/drivers/data/add_data")
      .send({ new_data: "test data" })
      .expect(201)
      .then(({ body }) => {
        expect(body[0]["new_data"]).toEqual("test data");
        return body;
      })
      .then((drivers) => {
        return request(app)
          .delete("/api/drivers/data/delete_data")
          .send({ new_data: "test data" })
          .expect(200);
      });
  });
});

describe("Util function: ChangeStringToUpperCaseFirstCharOnly", () => {
  it("Inputs a string with underscores between names and returns with a capitalized first character", () => {
    expect(changeStringToUpperCaseFirstCharOnly("string_value")).toBe(
      "String Value"
    );
    expect(
      changeStringToUpperCaseFirstCharOnly("string_value_additional_words")
    ).toBe("String Value Additional Words");
  });

  it("Inputs a string with underscores between names and returns with a capitalized first character even if it already starts capitalized", () => {
    expect(
      changeStringToUpperCaseFirstCharOnly("string_value".toUpperCase())
    ).toBe("String Value");
    expect(
      changeStringToUpperCaseFirstCharOnly(
        "string_value_additional_words".toUpperCase()
      )
    ).toBe("String Value Additional Words");
  });

  it("returns a capitalized string when passed only one word with no underscore", () => {
    expect(changeStringToUpperCaseFirstCharOnly("mercedes")).toBe("Mercedes");
  });
});
