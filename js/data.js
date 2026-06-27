const POOL = {
  meta:{name:"MauMatch", title:"Mau's Family World Cup Pool 2026", pot:120, entryFee:30},
  scoring:{groupWinner:3, groupRunnerUp:2, r32:2, r16:4, qf:8, sf:16, finalWinner:32, champion:20, runnerUp:10, goldenBoot:10, darkHorse:{r16:5,qf:10,sf:15,final:20,champion:30}},
  players:["Mauricio","Laura","Lisa","Natalia"],
  tournamentPicks:{
    Mauricio:{champion:"USA", runnerUp:"England", goldenBoot:"", darkHorse:"Scotland", finalScore:""},
    Laura:{champion:"USA", runnerUp:"Argentina", goldenBoot:"", darkHorse:"Panama", finalScore:""},
    Lisa:{champion:"France", runnerUp:"USA", goldenBoot:"", darkHorse:"Sweden", darkHorseStage:"Round of 32", finalScore:""},
    Natalia:{champion:"Spain", runnerUp:"England", goldenBoot:"", darkHorse:"Senegal", finalScore:""}
  },
  groups:{
    A:["Mexico","South Africa","South Korea","Czechia"], B:["Canada","Bosnia and Herzegovina","Qatar","Switzerland"], C:["Brazil","Morocco","Haiti","Scotland"], D:["USA","Paraguay","Australia","Türkiye"],
    E:["Germany","Curaçao","Ivory Coast","Ecuador"], F:["Netherlands","Japan","Sweden","Tunisia"], G:["Belgium","Egypt","Iran","New Zealand"], H:["Spain","Cape Verde","Saudi Arabia","Uruguay"],
    I:["France","Senegal","Iraq","Norway"], J:["Argentina","Algeria","Austria","Jordan"], K:["Portugal","DR Congo","Uzbekistan","Colombia"], L:["England","Croatia","Ghana","Panama"]
  },
  groupPicks:{
    Mauricio:{A:["Mexico","South Korea"],B:["Switzerland","Canada"],C:["Brazil","Morocco"],D:["Paraguay","USA"],E:["Germany","Ecuador"],F:["Netherlands","Japan"],G:["Egypt","Belgium"],H:["Spain","Uruguay"],I:["France","Norway"],J:["Argentina","Algeria"],K:["Colombia","Portugal"],L:["England","Croatia"]},
    Laura:{A:["Czechia","South Korea"],B:["Switzerland","Canada"],C:["Brazil","Scotland"],D:["USA","Paraguay"],E:["Germany","Ecuador"],F:["Netherlands","Japan"],G:["Belgium","Iran"],H:["Uruguay","Spain"],I:["Norway","France"],J:["Argentina","Jordan"],K:["Colombia","Portugal"],L:["Croatia","England"]},
    Lisa:{A:["South Korea","Mexico"],B:["Switzerland","Canada"],C:["Brazil","Morocco"],D:["USA","Paraguay"],E:["Germany","Ecuador"],F:["Netherlands","Japan"],G:["Iran","Belgium"],H:["Uruguay","Spain"],I:["France","Norway"],J:["Argentina","Algeria"],K:["Portugal","Colombia"],L:["England","Croatia"]},
    Natalia:{A:["Mexico","South Korea"],B:["Switzerland","Canada"],C:["Brazil","Morocco"],D:["Türkiye","USA"],E:["Germany","Ecuador"],F:["Sweden","Japan"],G:["Iran","Egypt"],H:["Spain","Uruguay"],I:["France","Norway"],J:["Argentina","Algeria"],K:["Portugal","Colombia"],L:["England","Panama"]}
  },
  officialGroupResults:{
    A:["Mexico","South Korea"], B:["Switzerland","Canada"], C:["Brazil","Morocco"], D:["USA","Australia"], E:["Germany","Ivory Coast"], F:["Netherlands","Sweden"], G:["Belgium","Egypt"], H:["Spain","Uruguay"], I:["France","Norway"], J:["Argentina","Algeria"], K:["",""], L:["",""]
  },
  matches:[
    {date:"Jun 27", time:"4:00 PM CT", stage:"Group L", teams:"Panama vs England", impact:"England matters for Mauricio and Natalia runner-up picks. Panama matters for Laura's Dark Horse and Natalia's Group L runner-up pick."},
    {date:"Jun 27", time:"4:00 PM CT", stage:"Group L", teams:"Croatia vs Ghana", impact:"Croatia affects Mauricio, Laura, and Lisa Group L predictions."},
    {date:"Jun 27", time:"6:30 PM CT", stage:"Group K", teams:"Colombia vs Portugal", impact:"This is a big swing match: Mauricio and Laura picked Colombia first; Lisa and Natalia picked Portugal first."},
    {date:"Jun 27", time:"9:00 PM CT", stage:"Group J", teams:"Jordan vs Argentina", impact:"Argentina is important for Laura's runner-up pick and everyone except no one picked against Argentina as Group J winner."},
    {date:"Jun 28", time:"2:00 PM CT", stage:"Round of 32", teams:"South Africa vs Canada", impact:"First knockout points begin. Round of 32 winner picks are worth 2 points."}
  ]
};
