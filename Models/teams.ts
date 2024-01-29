import db from "../db/db";

import { Team } from "../types/teams";

export const fetchAllTeams = (): Promise<Team[]> => {
  return db
    .collection("teams")
    .get()
    .then((res) => {
      return res.docs.map((teams) => teams.data() as Team);
    });
};

export const fetchOneTeam = (
  teamName: string
): Promise<{ [key: string]: Team }> => {
  return db
    .collection("teams")
    .doc(teamName)
    .get()
    .then((teams) => {
      const teamData = teams.data() as Team; // Type assertion
      if (teamData) {
        return { [teamName]: { ...teamData } };
      } else {
        // Handle the case where team data is not found
        throw new Error("Team data not found");
      }
    });
};

export const fetchConstructors = ({
  sort_by,
}: { sort_by?: "asc" | "desc" } = {}): Promise<Team[]> => {
  if (sort_by !== "asc" && sort_by !== "desc" && sort_by !== undefined) {
    return Promise.reject({ status: 400, msg: "Invalid sort query" });
  }
  if (sort_by == undefined) {
    sort_by = "desc";
  }
  return db
    .collection("teams")
    .get()
    .then((teams) => {
      const teamObject = teams.docs.map((team) => {
        teamsObject.push({ [team.id]: { ...team.data() } });
      });
      return teamsObject;
    })
    .then((teamsData) => {
      return sort_by == "desc"
        ? [...teamsData].sort((a, b) =>
            a[Object.keys(a)[0]]["constructors-points"] <
            b[Object.keys(b)[0]]["constructors-points"]
              ? 1
              : -1
          )
        : [...teamsData].sort((a, b) =>
            a[Object.keys(a)[0]]["constructors-points"] >
            b[Object.keys(b)[0]]["constructors-points"]
              ? 1
              : -1
          );
    });
};

export const removeTeamsData = (rawData: {
  [key: string]: any;
}): Promise<void[]> => {
  return db
    .collection("teams")
    .get()
    .then((res) => {
      return Promise.all(
        res.docs.map((team) => {
          let teamsObj = { ...team.data() };
          let nameOfTeam = team.id;
          Object.keys(rawData).forEach((x) => {
            delete teamsObj[x];
          });
          return db.collection("teams").doc(nameOfTeam).set(teamsObj);
        })
      );
    });
};

export const updateTeamsPoints = (
  points: number,
  teamName: string
): Promise<Team> => {
  return db
    .collection("teams")
    .doc(teamName)
    .get()
    .then((res) => {
      if (res.data() == undefined) {
        throw new Error("Team does not exist");
      }
      let teamObject = res.data();
      teamObject["constructors-points"] += points;
      return db
        .collection("teams")
        .doc(teamName)
        .set(teamObject)
        .then(() => {
          return db
            .collection("teams")
            .doc(teamName)
            .get()
            .then((res) => {
              return res.data();
            });
        });
    });
};

export const updateTeamData = (
  teamData: Team[],
  teamName: string
): Promise<{ [key: string]: Team }> => {
  return db
    .collection("teams")
    .doc(teamName)
    .get()
    .then((res) => {
      if (res.data() == undefined) {
        throw new Error("Team does not exist");
      }
      let oldTeamData = { ...res.data() };
      teamData.forEach((key) => {
        let newKeys = Object.keys(key);
        oldTeamData[newKeys] = key[newKeys];
      });
      return oldTeamData;
    })
    .then((res) => {
      return db.collection("teams").doc(teamName).set(res);
    })
    .then(() => {
      return db
        .collection("teams")
        .doc(teamName)
        .get()
        .then((res) => {
          return [{ [`${teamName}`]: { ...res.data() } }];
        });
    });
};
