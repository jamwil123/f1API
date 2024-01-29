import db from "../db/db";

import { Team, TeamStandings, Teams } from "../types/teams";

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
      const teamsData: Team[] = teams.docs.map((team) => ({
        ...(team.data() as Team),
      }));

      return sort_by == "desc"
        ? [...teamsData].sort((a, b) =>
            a[0][Object.keys(a[0])[0]]["constructors-points"] <
            b[0][Object.keys(b[0])[0]]["constructors-points"]
              ? 1
              : -1
          )
        : [...teamsData].sort((a, b) =>
            a[0][Object.keys(a[0])[0]]["constructors-points"] >
            b[0][Object.keys(b[0])[0]]["constructors-points"]
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
        res.docs.map(async (team) => {
          let teamsObj = { ...team.data() };
          Object.keys(rawData).forEach((x) => {
            delete teamsObj[x];
          });
          await db.collection("teams").doc(team.id).set(teamsObj);
        }) as Promise<void>[]
      );
    });
};

export const updateTeamsPoints = (
  points: number,
  teamName: string
): Promise<TeamStandings> => {
  return db
    .collection("team-standings")
    .doc(teamName)
    .get()
    .then((res) => {
      const teamStandings: TeamStandings = res.data() as TeamStandings;
      if (teamStandings == undefined) {
        throw new Error("Team does not exist");
      }
      let teamObject: TeamStandings = {
        ...teamStandings,
        points: (teamStandings?.points || 0) + points,
      };
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
              return res.data() as TeamStandings;
            });
        });
    });
};
