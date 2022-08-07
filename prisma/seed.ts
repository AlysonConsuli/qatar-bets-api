import prisma from "../src/config/db.js";

const users = [
  {
    name: "admin",
    password: "$2b$10$dlDETryrvw4qQZ9P1KOywu45kez6qhj7j2PuGSeyrBl8W3flbi0B.",
  },
];

const teams = [
  { name: "Qatar" },
  { name: "Ecuador" },
  { name: "Senegal" },
  { name: "Netherlands" },
  { name: "England" },
  { name: "Iran" },
  { name: "USA" },
  { name: "Wales" },
  { name: "Argentina" },
  { name: "Saudi Arabia" },
  { name: "Mexico" },
  { name: "Poland" },
  { name: "France" },
  { name: "Australia" },
  { name: "Denmark" },
  { name: "Tunisia" },
  { name: "Spain" },
  { name: "Costa Rica" },
  { name: "Germany" },
  { name: "Japan" },
  { name: "Belgium" },
  { name: "Canada" },
  { name: "Morocco" },
  { name: "Croatia" },
  { name: "Brazil" },
  { name: "Serbia" },
  { name: "Switzerland" },
  { name: "Cameroon" },
  { name: "Portugal" },
  { name: "Ghana" },
  { name: "Uruguay" },
  { name: "South Korea" },
];

const games = [
  { team1Id: 3, team2Id: 4 },
  { team1Id: 5, team2Id: 6 },
  { team1Id: 1, team2Id: 2 },
  { team1Id: 7, team2Id: 8 },
  { team1Id: 9, team2Id: 10 },
  { team1Id: 15, team2Id: 16 },
  { team1Id: 11, team2Id: 12 },
  { team1Id: 13, team2Id: 14 },

  { team1Id: 23, team2Id: 24 },
  { team1Id: 19, team2Id: 20 },
  { team1Id: 17, team2Id: 18 },
  { team1Id: 21, team2Id: 22 },
  { team1Id: 27, team2Id: 28 },
  { team1Id: 31, team2Id: 32 },
  { team1Id: 29, team2Id: 30 },
  { team1Id: 25, team2Id: 26 },

  { team1Id: 8, team2Id: 6 },
  { team1Id: 1, team2Id: 3 },
  { team1Id: 4, team2Id: 2 },
  { team1Id: 5, team2Id: 7 },
  { team1Id: 16, team2Id: 14 },
  { team1Id: 12, team2Id: 10 },
  { team1Id: 13, team2Id: 15 },
  { team1Id: 9, team2Id: 11 },

  { team1Id: 20, team2Id: 18 },
  { team1Id: 21, team2Id: 23 },
  { team1Id: 24, team2Id: 22 },
  { team1Id: 17, team2Id: 19 },
  { team1Id: 28, team2Id: 26 },
  { team1Id: 32, team2Id: 30 },
  { team1Id: 25, team2Id: 27 },
  { team1Id: 29, team2Id: 31 },

  { team1Id: 4, team2Id: 1 },
  { team1Id: 2, team2Id: 3 },
  { team1Id: 6, team2Id: 7 },
  { team1Id: 8, team2Id: 5 },
  { team1Id: 14, team2Id: 15 },
  { team1Id: 16, team2Id: 13 },
  { team1Id: 12, team2Id: 9 },
  { team1Id: 10, team2Id: 11 },

  { team1Id: 22, team2Id: 23 },
  { team1Id: 24, team2Id: 21 },
  { team1Id: 20, team2Id: 17 },
  { team1Id: 18, team2Id: 19 },
  { team1Id: 32, team2Id: 29 },
  { team1Id: 30, team2Id: 31 },
  { team1Id: 28, team2Id: 25 },
  { team1Id: 26, team2Id: 27 },
];

async function main() {
  await prisma.users.createMany({ data: users, skipDuplicates: true });
  await prisma.teams.createMany({ data: teams, skipDuplicates: true });
  await prisma.games.createMany({
    data: games,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
