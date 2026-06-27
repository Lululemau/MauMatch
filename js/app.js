const $ = id => document.getElementById(id);
const scores = calculateScores();

function renderMiniLeaderboard(){
  const el = $('leaderboardMini'); if(!el) return;
  el.innerHTML = scores.map((s,i)=>`<div class="leader-row"><div><span class="rank">${medal(i)}</span> <strong>${s.player}</strong><div class="small">Groups ${s.groupPoints} · Bonus ${s.bonusPoints}</div></div><div class="points">${s.total} pts</div></div>`).join('');
  const leader = $('dashboardLeader'); if(leader) leader.textContent = `${scores[0].player} — ${scores[0].total} pts`;
}
function renderFullLeaderboard(){
  const el = $('leaderboardFull'); if(!el) return;
  el.innerHTML = `<table class="score-table"><thead><tr><th>Rank</th><th>Player</th><th>Groups</th><th>Knockout</th><th>Bonus</th><th>Total</th></tr></thead><tbody>${scores.map((s,i)=>`<tr><td>${medal(i)}</td><td><strong>${s.player}</strong></td><td>${s.groupPoints}</td><td>${s.knockoutPoints}</td><td>${s.bonusPoints}</td><td class="points">${s.total}</td></tr>`).join('')}</tbody></table>`;
}
function renderImpact(){
  const el = $('impactList'); if(!el) return;
  el.innerHTML = [`Group K is still a swing group: Mauricio and Laura picked Colombia first; Lisa and Natalia picked Portugal first.`,`England matters for Mauricio and Natalia because both picked England as runner-up.`,`Laura’s Dark Horse is Panama, so every Panama result is important for her bonus path.`,`Lisa has France as champion and Sweden as Dark Horse, creating a dramatic France vs Sweden storyline.`].map(x=>`<p>• ${x}</p>`).join('');
}
function renderMatches(){
  const ids = ['matchCards','matchesPage'];
  ids.forEach(id=>{ const el=$(id); if(!el) return; el.innerHTML = POOL.matches.map(m=>`<article class="card match-card"><div><span class="pill">${m.date}</span><h3>${m.title}</h3><p class="muted">${m.insight}</p></div></article>`).join(''); });
}
function renderTournamentPicks(){
  const el = $('tournamentPicksMini'); if(!el) return;
  el.innerHTML = POOL.players.map(p=>{const t=POOL.tournamentPicks[p]; return `<div class="pick-row"><div><strong>${p}</strong><div class="small">Champion: ${t.champion} · Runner-up: ${t.runnerUp}</div></div><span class="pill">Dark Horse: ${t.darkHorse}</span></div>`}).join('');
}
function renderGroups(){
  const el = $('groupsGrid'); if(!el) return;
  el.innerHTML = Object.keys(POOL.officialGroups).map(g=>{
    const official=POOL.officialGroups[g];
    const rows = POOL.players.map(p=>{ const pick=POOL.groupPicks[p][g]; const w = official.winner !== 'TBD' && pick[0]===official.winner; const r = official.runnerUp !== 'TBD' && pick[1]===official.runnerUp; return `<tr><td>${p}</td><td>${pick[0]} <span class="${w?'ok':'bad'}">${official.winner==='TBD'?'':' '+(w?'✓':'×')}</span></td><td>${pick[1]} <span class="${r?'ok':'bad'}">${official.runnerUp==='TBD'?'':' '+(r?'✓':'×')}</span></td></tr>`}).join('');
    return `<article class="card group-card"><h2>Group ${g}</h2><p class="muted">Official: ${official.winner} / ${official.runnerUp}</p><table><thead><tr><th>Player</th><th>Winner</th><th>Runner-up</th></tr></thead><tbody>${rows}</tbody></table></article>`;
  }).join('');
}
function renderPlayers(){
  const el = $('playersGrid'); if(!el) return;
  el.innerHTML = POOL.players.map(p=>{ const s=scores.find(x=>x.player===p); const t=POOL.tournamentPicks[p]; return `<article class="card"><div class="player-name">${p}</div><p class="points">${s.total} pts</p><p><span class="pill">Champion: ${t.champion}</span><span class="pill">Runner-up: ${t.runnerUp}</span><span class="pill">Dark Horse: ${t.darkHorse}</span></p><p class="muted">Group points: ${s.groupPoints}. Knockout and bonus scoring will be added in V1.1.</p></article>` }).join('');
}
renderMiniLeaderboard(); renderFullLeaderboard(); renderImpact(); renderMatches(); renderTournamentPicks(); renderGroups(); renderPlayers();
