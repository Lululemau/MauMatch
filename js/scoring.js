function groupPointsFor(player){
  let points=0, details=[];
  for(const [group, official] of Object.entries(POOL.officialGroupResults)){
    if(!official[0] || !official[1]) continue;
    const pick=POOL.groupPicks[player][group];
    let p=0;
    if(pick[0]===official[0]) p+=POOL.scoring.groupWinner;
    if(pick[1]===official[1]) p+=POOL.scoring.groupRunnerUp;
    points+=p; details.push({group, pick, official, points:p});
  }
  return {points, details};
}
function leaderboard(){
  return POOL.players.map(name=>{
    const g=groupPointsFor(name);
    return {name, group:g.points, knockout:0, bonus:0, total:g.points};
  }).sort((a,b)=>b.total-a.total || a.name.localeCompare(b.name));
}
function statusClass(ok){return ok?'winner':'wrong'}
