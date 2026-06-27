function calculateScores(){
  return POOL.players.map(player=>{
    let groupPoints = 0;
    Object.entries(POOL.officialGroups).forEach(([group, official])=>{
      if(official.winner === "TBD") return;
      const pick = POOL.groupPicks[player][group];
      if(pick[0] === official.winner) groupPoints += POOL.scoring.groupWinner;
      if(pick[1] === official.runnerUp) groupPoints += POOL.scoring.groupRunnerUp;
    });
    return { player, groupPoints, knockoutPoints:0, bonusPoints:0, total: groupPoints };
  }).sort((a,b)=>b.total-a.total || a.player.localeCompare(b.player));
}
function medal(i){ return ["🥇","🥈","🥉"][i] || `${i+1}`; }
