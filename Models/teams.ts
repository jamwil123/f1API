import { db } from "../db/db";

import { Team, TeamStandings, Teams } from "../types/teams";
import { hyphenToCamelCase } from "../utils/utilityFunctions";

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

export const fetchConstructors = (
  sort_by?: "asc" | "desc"
): Promise<Team[]> => {
  if (
    sort_by !== undefined &&
    typeof sort_by === "string" &&
    sort_by !== "asc" &&
    sort_by !== "desc"
  ) {
    return Promise.reject({
      msg: "Invalid sort_by value.",
      status: 400,
    });
  }

  return db
    .collection("teams")
    .get()
    .then((teams) => {
      let teamsData: Team[] = teams.docs.map((team) => ({
        ...(team.data() as Team),
      }));

      if (sort_by === "asc") {
        return teamsData.sort((a, b) =>
          a.fullTeamName.localeCompare(b.fullTeamName)
        );
      }

      // Default sort (desc)
      teamsData = teamsData.sort((a, b) =>
        b.fullTeamName.localeCompare(a.fullTeamName)
      );

      return teamsData;
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

export const updateKeys = async () => {
  try {
    const teamsSnapshot = await db.collection("teams").get();

    const updatePromises = teamsSnapshot.docs.map(async (teamDoc) => {
      const teamData = teamDoc.data();
      const updatedData: { [key: string]: any } = {};

      Object.keys(teamData).forEach((key) => {
        const camelCaseKey = hyphenToCamelCase(key);
        updatedData[camelCaseKey] = teamData[key];
      });

      // Update the document in Firestore with the new keys
      await db.collection("teams").doc(teamDoc.id).set(updatedData);
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    ("Keys updated successfully.");
  } catch (error: any) {
    console.error("Error updating keys in Firestore:", error.message);
    throw error;
  }
};

export const fetchTeamStandings = (standingsNumber, teamName) => {
  // Validate standingsNumber
  if (
    (standingsNumber && !Number.isInteger(standingsNumber)) ||
    standingsNumber < 1 ||
    standingsNumber > 20
  ) {
    return db
      .collection("team-standings")
      .doc(standingsNumber.toString()) // Assuming the document names are numbers
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        } else {
          throw new Error("No standings found for the specified number.");
        }
      });
  }

  if (teamName && typeof teamName === "string") {
    return db
      .collection("team-standings")
      .get()
      .then((teams) => {
        return teams.docs
          .map((team) => team.data())
          .filter((team) => team.name === teamName);
      });
  }

  if (!teamName && !standingsNumber) {
    console.log("inside");
    return db
      .collection("team-standings")
      .get()
      .then((standings) => {
        return standings.docs.map((standing) => standing.data());
      });
  }
  throw new Error("Selection invalid");
};
