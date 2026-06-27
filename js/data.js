const POOL = {
  prizePool: 120,
  entryFee: 30,
  players: ["Mauricio", "Laura", "Lisa", "Natalia"],
  scoring: { groupWinner: 3, groupRunnerUp: 2, r32: 2, r16: 4, qf: 8, sf: 16, final: 32, champion: 20, runnerUp: 10, goldenBoot: 10, darkHorse: { r16: 5, qf: 10, sf: 15, final: 20, champion: 30 } },
  officialGroups: {
    A: { winner: "Mexico", runnerUp: "South Korea" },
    B: { winner: "Switzerland", runnerUp: "Canada" },
    C: { winner: "Brazil", runnerUp: "Morocco" },
    D: { winner: "USA", runnerUp: "Australia" },
    E: { winner: "Germany", runnerUp: "Ivory Coast" },
    F: { winner: "Netherlands", runnerUp: "Sweden" },
    G: { winner: "Egypt", runnerUp: "Belgium" },
    H: { winner: "Spain", runnerUp: "Uruguay" },
    I: { winner: "France", runnerUp: "Norway" },
    J: { winner: "Argentina", runnerUp: "Algeria" },
    K: { winner: "TBD", runnerUp: "TBD" },
    L: { winner: "TBD", runnerUp: "TBD" }
  },
  groupPicks: {
    Mauricio: { A:["Mexico","South Korea"], B:["Switzerland","Canada"], C:["Brazil","Morocco"], D:["Paraguay","USA"], E:["Germany","Ecuador"], F:["Netherlands","Japan"], G:["Egypt","Belgium"], H:["Spain","Uruguay"], I:["France","Norway"], J:["Argentina","Algeria"], K:["Colombia","Portugal"], L:["England","Croatia"] },
    Laura: { A:["Czechia","South Korea"], B:["Switzerland","Canada"], C:["Brazil","Scotland"], D:["USA","Paraguay"], E:["Germany","Ecuador"], F:["Netherlands","Japan"], G:["Belgium","Iran"], H:["Uruguay","Spain"], I:["Norway","France"], J:["Argentina","Jordan"], K:["Colombia","Portugal"], L:["Croatia","England"] },
    Lisa: { A:["South Korea","Mexico"], B:["Switzerland","Canada"], C:["Brazil","Morocco"], D:["USA","Paraguay"], E:["Germany","Ecuador"], F:["Netherlands","Japan"], G:["Iran","Belgium"], H:["Uruguay","Spain"], I:["France","Norway"], J:["Argentina","Algeria"], K:["Portugal","Colombia"], L:["England","Croatia"] },
    Natalia: { A:["Mexico","South Korea"], B:["Switzerland","Canada"], C:["Brazil","Morocco"], D:["Türkiye","USA"], E:["Germany","Ecuador"], F:["Sweden","Japan"], G:["Iran","Egypt"], H:["Spain","Uruguay"], I:["France","Norway"], J:["Argentina","Algeria"], K:["Portugal","Colombia"], L:["England","Panama"] }
  },
  tournamentPicks: {
    Mauricio: { champion:"USA", runnerUp:"England", goldenBoot:"", darkHorse:"Scotland", finalScore:"" },
    Laura: { champion:"USA", runnerUp:"Argentina", goldenBoot:"", darkHorse:"Panama", finalScore:"" },
    Lisa: { champion:"France", runnerUp:"USA", goldenBoot:"", darkHorse:"Sweden", finalScore:"" },
    Natalia: { champion:"Spain", runnerUp:"England", goldenBoot:"", darkHorse:"Senegal", finalScore:"" }
  },
  matches: [
    { date:"Jun 27", title:"Panama vs England", insight:"England affects Mauricio and Natalia runner-up hopes. Panama is Laura's Dark Horse." },
    { date:"Jun 27", title:"Colombia vs Portugal", insight:"Group K impacts Mauricio/Laura vs Lisa/Natalia picks." },
    { date:"Jun 29", title:"Brazil vs Japan", insight:"Brazil is a common group winner; Japan affects Group F runner-up picks." },
    { date:"Jun 30", title:"France vs Sweden", insight:"Lisa's Champion France faces her Dark Horse Sweden in a high-impact storyline." }
  ]
};
