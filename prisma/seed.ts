import prisma from "../src/config/db.js";

const teams = [
  { name: "CATAR" },
  { name: "EQUADOR" },
  { name: "SENEGAL" },
  { name: "HOLANDA" },
  { name: "INGLATERRA" },
  { name: "IRÃ" },
  { name: "ESTADOS UNIDOS" },
  { name: "PAÍS DE GALES" },
  { name: "ARGENTINA" },
  { name: "ARÁBIA SAUDITA" },
  { name: "MÉXICO" },
  { name: "POLÔNIA" },
  { name: "FRANÇA" },
  { name: "AUSTRÁLIA" },
  { name: "DINAMARCA" },
  { name: "TUNÍSIA" },
  { name: "ESPANHA" },
  { name: "COSTA RICA" },
  { name: "ALEMANHA" },
  { name: "JAPÃO" },
  { name: "BELGICA" },
  { name: "CANADÁ" },
  { name: "MARROCOS" },
  { name: "CROÁCIA" },
  { name: "BRASIL" },
  { name: "SÉRVIA" },
  { name: "SUÍÇA" },
  { name: "CAMARÕES" },
  { name: "PORTUGAL" },
  { name: "GANA" },
  { name: "URUGUAI" },
  { name: "COREIA DO SUL" },
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
];

async function main() {
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
