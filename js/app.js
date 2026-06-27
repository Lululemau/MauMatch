const $ = id => document.getElementById(id);
let scores = calculateScores();

function getGroupProgress(){
  const groups = Object.values(POOL.officialGroups || {});
  const completed = groups.filter(g => g.winner && g.runnerUp && g.winner !== 'TBD' && g.runnerUp !== 'TBD').length;
  const total = groups.length || 12;
  return { completed, total, pct: Math.round((completed / total) * 100) };
}

function renderTournamentProgress(){
  const el = $('tournamentProgressSummary');
  if(!el) return;
  const p = getGroupProgress();
  const groupStatus = p.completed >= p.total ? 'Completed' : `${p.completed}/${p.total} groups final`;
  const stages = [
    {abbr:'GS', name:'Group Stage', status:groupStatus, active:p.completed < p.total, done:p.completed >= p.total},
    {abbr:'R32', name:'Round of 32', status:'Starts Jun 28'},
    {abbr:'R16', name:'Round of 16', status:'Starts Jul 4'},
    {abbr:'QF', name:'Quarterfinals', status:'Starts Jul 9'},
    {abbr:'SF', name:'Semifinals', status:'Starts Jul 14'},
    {abbr:'F', name:'Final', status:'Jul 19'}
  ];
  el.innerHTML = `<div class="progress-summary"><div class="progress"><span style="width:${Math.max(8, Math.min(100, p.pct))}%"></span></div><div class="progress-meta"><span>Group Stage: ${groupStatus}</span><span>${p.pct}% of groups final</span></div><div class="stage-timeline">${stages.map(s=>`<div class="stage-chip ${s.done?'done':''} ${s.active?'active':''}"><strong>${s.abbr}</strong><small>${s.status}</small></div>`).join('')}</div></div>`;
}

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
  const open = POOL.matches.filter(m=>m.status !== 'Final').slice(0,4);
  const items = open.length ? open.map(m=>({title:`${m.teamA} vs ${m.teamB}`, text:m.insight})) : [{title:'No open matches', text:'All listed matches are final. Update the next round in Admin when ready.'}];
  el.innerHTML = items.map(x=>`<div class="impact-bullet"><strong>${x.title}</strong><br>${x.text}</div>`).join('');
}
function renderMatches(){
  const ids = ['matchCards','matchesPage'];
  ids.forEach(id=>{ const el=$(id); if(!el) return; const list = id==='matchCards' ? POOL.matches.slice(0,4) : POOL.matches; el.innerHTML = list.map(m=>{
    const score = m.status === 'Final' ? `<div class="scoreline">${m.teamA} ${m.scoreA} — ${m.scoreB} ${m.teamB}</div>` : `<div class="scoreline">${m.teamA} vs ${m.teamB}</div>`;
    return `<article class="card match-card"><div><span class="pill">${m.date}</span><span class="pill ${m.status==='Final'?'success':''}">${m.status}</span>${score}<p class="muted">${m.insight}</p>${m.status==='Final'?`<p class="small">Winner: ${matchWinner(m)}</p>`:''}</div></article>`
  }).join(''); });
}
function renderTournamentPicks(){
  const el = $('tournamentPicksMini'); if(!el) return;
  el.innerHTML = POOL.players.map(p=>{const t=POOL.tournamentPicks[p]; return `<div class="pick-row"><div><strong>${p}</strong><div class="small">Champion: ${t.champion}<br>Runner-up: ${t.runnerUp}</div></div><span class="pill">Dark Horse: ${t.darkHorse}</span></div>`}).join('');
}
function renderGroups(){
  const el = $('groupsGrid'); if(!el) return;
  el.innerHTML = Object.keys(POOL.officialGroups).map(g=>{
    const official=POOL.officialGroups[g];
    const officialSummary = official.winner === 'TBD' ? '<span class="muted">Official: Pending</span>' : `<span class="official-badge winner">🥇 ${official.winner}</span> <span class="official-badge runner">🥈 ${official.runnerUp}</span>`;
    const rows = POOL.players.map(p=>{ const pick=POOL.groupPicks[p][g]; const w = official.winner !== 'TBD' && pick[0]===official.winner; const r = official.runnerUp !== 'TBD' && pick[1]===official.runnerUp; return `<tr><td>${p}</td><td>${pick[0]} <span class="${w?'ok':'bad'}">${official.winner==='TBD'?'':' '+(w?'✓':'×')}</span></td><td>${pick[1]} <span class="${r?'ok':'bad'}">${official.runnerUp==='TBD'?'':' '+(r?'✓':'×')}</span></td></tr>`}).join('');
    return `<article class="card group-card"><h2>Group ${g}</h2><p>${officialSummary}</p><table><thead><tr><th>Player</th><th>Winner</th><th>Runner-up</th></tr></thead><tbody>${rows}</tbody></table></article>`;
  }).join('');
}
function renderPlayers(){
  const el = $('playersGrid'); if(!el) return;
  el.innerHTML = POOL.players.map(p=>{ const s=scores.find(x=>x.player===p); const t=POOL.tournamentPicks[p]; return `<article class="card"><div class="player-name">${p}</div><p class="points">${s.total} pts</p><p><span class="pill">Champion: ${t.champion}</span><span class="pill">Runner-up: ${t.runnerUp}</span><span class="pill">Dark Horse: ${t.darkHorse}</span></p><p class="muted">Group points: ${s.groupPoints}. Knockout and bonus scoring are planned next.</p></article>` }).join('');
}

function renderAdmin(){
  const groupsEl = $('adminGroups');
  if(groupsEl){
    groupsEl.innerHTML = Object.keys(POOL.officialGroups).map(g=>{
      const o = POOL.officialGroups[g];
      return `<div class="admin-row"><strong>Group ${g}</strong><input data-group="${g}" data-field="winner" value="${o.winner}" aria-label="Group ${g} winner"><input data-group="${g}" data-field="runnerUp" value="${o.runnerUp}" aria-label="Group ${g} runner-up"></div>`;
    }).join('');
  }
  const matchesEl = $('adminMatches');
  if(matchesEl){
    matchesEl.innerHTML = POOL.matches.map(m=>`<div class="admin-row match-edit"><strong>${m.date}</strong><span>${m.teamA}</span><input type="number" min="0" data-match="${m.id}" data-field="scoreA" value="${m.scoreA ?? ''}" placeholder="0"><span>${m.teamB}</span><input type="number" min="0" data-match="${m.id}" data-field="scoreB" value="${m.scoreB ?? ''}" placeholder="0"><select data-match="${m.id}" data-field="status"><option ${m.status==='Scheduled'?'selected':''}>Scheduled</option><option ${m.status==='Final'?'selected':''}>Final</option></select></div>`).join('');
  }
}
function saveAdminChanges(){
  document.querySelectorAll('[data-group]').forEach(input=>{
    const g=input.dataset.group, f=input.dataset.field;
    POOL.officialGroups[g][f] = input.value.trim() || 'TBD';
  });
  document.querySelectorAll('[data-match]').forEach(input=>{
    const m=POOL.matches.find(x=>x.id===input.dataset.match); if(!m) return;
    const f=input.dataset.field;
    if(f==='scoreA' || f==='scoreB') m[f] = input.value === '' ? null : Number(input.value);
    else m[f] = input.value;
  });
  try{
    savePool(POOL);
    scores = calculateScores();
    const msg=$('adminMessage'); if(msg) msg.innerHTML='✅ Saved in this browser. Refresh or navigate pages to confirm. Use <strong>Export data.js</strong> to publish changes for everyone.';
    renderAll();
  } catch(e){
    const msg=$('adminMessage'); if(msg) msg.textContent='Save failed: ' + e.message;
  }
}
function exportDataJS(){
  const helper = document.querySelector('#dataHelpers')?.textContent || `function loadPool(){\n  try {\n    const saved = localStorage.getItem("mauMatchPool");\n    return saved ? JSON.parse(saved) : structuredClone(DEFAULT_POOL);\n  } catch (e) {\n    return JSON.parse(JSON.stringify(DEFAULT_POOL));\n  }\n}\n\nfunction savePool(pool){\n  localStorage.setItem("mauMatchPool", JSON.stringify(pool));\n}\n\nfunction resetPool(){\n  localStorage.removeItem("mauMatchPool");\n  location.reload();\n}\n\nlet POOL = loadPool();`;
  const content = `const DEFAULT_POOL = ${JSON.stringify(POOL,null,2)};\n\n${helper}`;
  const blob = new Blob([content], {type:'text/javascript'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'data.js'; a.click(); URL.revokeObjectURL(url);
}
function wireAdminButtons(){
  const saveBtn = $('saveAdminBtn'); if(saveBtn) saveBtn.addEventListener('click', saveAdminChanges);
  const exportBtn = $('exportDataBtn'); if(exportBtn) exportBtn.addEventListener('click', exportDataJS);
  const resetBtn = $('resetPoolBtn'); if(resetBtn) resetBtn.addEventListener('click', resetPool);
}
function renderAll(){
  scores = calculateScores();
  renderMiniLeaderboard(); renderFullLeaderboard(); renderImpact(); renderMatches(); renderTournamentPicks(); renderGroups(); renderPlayers(); renderAdmin(); renderTournamentProgress(); wireAdminButtons();
}
window.saveAdminChanges = saveAdminChanges;
window.exportDataJS = exportDataJS;
window.resetPool = resetPool;
renderAll();
