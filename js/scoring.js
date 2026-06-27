function calculateScores(){
  const pool = POOL && POOL.players && POOL.groupPicks && POOL.officialGroups ? POOL : DEFAULT_POOL;
  const scoring = pool.scoring || DEFAULT_POOL.scoring;
  return pool.players.map(player=>{
    let groupPoints = 0;
    Object.entries(pool.officialGroups || {}).forEach(([group, official])=>{
      if(!official || official.winner === "TBD") return;
      const pick = pool.groupPicks?.[player]?.[group];
      if(!pick) return;
      if(pick[0] === official.winner) groupPoints += scoring.groupWinner || 3;
      if(pick[1] === official.runnerUp) groupPoints += scoring.groupRunnerUp || 2;
    });
    return { player, groupPoints, knockoutPoints:0, bonusPoints:0, total: groupPoints };
  }).sort((a,b)=>b.total-a.total || a.player.localeCompare(b.player));
}
function medal(i){ return ["🥇","🥈","🥉"][i] || `${i+1}`; }
function matchWinner(match){
  if(!match || match.status !== "Final" || match.scoreA === null || match.scoreB === null) return "TBD";
  if(Number(match.scoreA) > Number(match.scoreB)) return match.teamA;
  if(Number(match.scoreB) > Number(match.scoreA)) return match.teamB;
  return "Draw";
}
