const $ = id => document.getElementById(id);

function normalizePool(){
  if(!window.POOL || !POOL.players || !POOL.groupPicks || !POOL.officialGroups || !POOL.matches){
    console.warn('MauMatch: invalid saved pool found. Falling back to DEFAULT_POOL.');
    window.POOL = JSON.parse(JSON.stringify(DEFAULT_POOL));
    try { localStorage.removeItem('mauMatchPool'); } catch(e) {}
    return;
  }
  POOL.scoring = POOL.scoring || DEFAULT_POOL.scoring;
  POOL.tournamentPicks = POOL.tournamentPicks || DEFAULT_POOL.tournamentPicks;
  POOL.matches = Array.isArray(POOL.matches) ? POOL.matches : DEFAULT_POOL.matches;
}

normalizePool();
let scores = calculateScores();

function renderMiniLeaderboard(){
  const el = $('leaderboardMini'); if(!el) return;
  el.innerHTML = scores.map((s,i)=>`<div class="leader-row ${i===0?'top-leader':''}"><div><span class="rank">${medal(i)}</span> <strong>${s.player}</strong>${i===0?'<span class="leader-chip">Leader</span>':''}<div class="small">Groups ${s.groupPoints} · Bonus ${s.bonusPoints}</div></div><div class="points">${s.total} pts</div></div>`).join('');
  const leader = $('dashboardLeader'); if(leader) leader.textContent = scores.length ? `${scores[0].player} — ${scores[0].total} pts` : 'No scores yet';
}
function renderFullLeaderboard(){
  const el = $('leaderboardFull'); if(!el) return;
  el.innerHTML = `<table class="score-table"><thead><tr><th>Rank</th><th>Player</th><th>Groups</th><th>Knockout</th><th>Bonus</th><th>Total</th></tr></thead><tbody>${scores.map((s,i)=>`<tr><td>${medal(i)}</td><td><strong>${s.player}</strong></td><td>${s.groupPoints}</td><td>${s.knockoutPoints}</td><td>${s.bonusPoints}</td><td class="points">${s.total}</td></tr>`).join('')}</tbody></table>`;
}
function renderImpact(){
  const el = $('impactList'); if(!el) return;
  const open = (POOL.matches || []).filter(m=>m.status !== 'Final').slice(0,4);
  const base = open.length ? open.map(m=>`${m.teamA} vs ${m.teamB}: ${m.insight || 'Pool impact pending.'}`) : [`All listed matches are final. Update the next round in Admin when ready.`];
  el.innerHTML = base.map(x=>`<p>• ${x}</p>`).join('');
}
function renderMatches(){
  const ids = ['matchCards','matchesPage'];
  ids.forEach(id=>{ const el=$(id); if(!el) return; el.innerHTML = (POOL.matches || []).map(m=>{
    const score = m.status === 'Final' ? `<div class="scoreline">${m.teamA} ${m.scoreA} — ${m.scoreB} ${m.teamB}</div>` : `<div class="scoreline">${m.teamA} vs ${m.teamB}</div>`;
    return `<article class="card match-card"><div class="match-card-inner"><div class="match-meta"><span class="pill">${m.date}</span><span class="pill ${m.status==='Final'?'success':''}">${m.status}</span></div>${score}<p class="muted">${m.insight || ''}</p>${m.status==='Final'?`<p class="small">Winner: ${matchWinner(m)}</p>`:''}</div></article>`
  }).join(''); });
}
function renderTournamentPicks(){
  const el = $('tournamentPicksMini'); if(!el) return;
  el.innerHTML = POOL.players.map(p=>{const t=POOL.tournamentPicks?.[p] || {}; return `<div class="pick-row"><div><strong>${p}</strong><div class="small">Champion: ${t.champion || '-'} · Runner-up: ${t.runnerUp || '-'}</div></div><span class="pill">Dark Horse: ${t.darkHorse || '-'}</span></div>`}).join('');
}
function renderGroups(){
  const el = $('groupsGrid'); if(!el) return;
  el.innerHTML = Object.keys(POOL.officialGroups || {}).map(g=>{
    const official=POOL.officialGroups[g] || {winner:'TBD', runnerUp:'TBD'};
    const officialBlock = official.winner === 'TBD' && official.runnerUp === 'TBD'
      ? `<p class="muted">Official results pending</p>`
      : `<div class="official-label">Official qualifiers</div><div class="official-summary"><span class="qualifier-badge winner">🥇 ${official.winner}</span><span class="qualifier-badge runner">🥈 ${official.runnerUp}</span></div>`;
    const rows = POOL.players.map(p=>{ const pick=POOL.groupPicks?.[p]?.[g] || ['-','-']; const w = official.winner !== 'TBD' && pick[0]===official.winner; const r = official.runnerUp !== 'TBD' && pick[1]===official.runnerUp; return `<tr><td>${p}</td><td>${pick[0]} <span class="${w?'ok':'bad'}">${official.winner==='TBD'?'':' '+(w?'✓':'×')}</span></td><td>${pick[1]} <span class="${r?'ok':'bad'}">${official.runnerUp==='TBD'?'':' '+(r?'✓':'×')}</span></td></tr>`}).join('');
    return `<article class="card group-card"><h2>Group ${g}</h2>${officialBlock}<table><thead><tr><th>Player</th><th>Winner</th><th>Runner-up</th></tr></thead><tbody>${rows}</tbody></table></article>`;
  }).join('');
}
function renderPlayers(){
  const el = $('playersGrid'); if(!el) return;
  el.innerHTML = POOL.players.map(p=>{ const s=scores.find(x=>x.player===p) || {total:0, groupPoints:0}; const t=POOL.tournamentPicks?.[p] || {}; return `<article class="card"><div class="player-name">${p}</div><p class="points">${s.total} pts</p><p><span class="pill">Champion: ${t.champion || '-'}</span><span class="pill">Runner-up: ${t.runnerUp || '-'}</span><span class="pill">Dark Horse: ${t.darkHorse || '-'}</span></p><p class="muted">Group points: ${s.groupPoints}. Knockout and bonus scoring are planned next.</p></article>` }).join('');
}

function renderAdmin(){
  const groupsEl = $('adminGroups');
  if(groupsEl){
    groupsEl.innerHTML = Object.keys(POOL.officialGroups || {}).map(g=>{
      const o = POOL.officialGroups[g];
      return `<div class="admin-row"><strong>Group ${g}</strong><input data-group="${g}" data-field="winner" value="${o.winner}" aria-label="Group ${g} winner"><input data-group="${g}" data-field="runnerUp" value="${o.runnerUp}" aria-label="Group ${g} runner-up"></div>`;
    }).join('');
  }
  const matchesEl = $('adminMatches');
  if(matchesEl){
    matchesEl.innerHTML = (POOL.matches || []).map(m=>`<div class="admin-row match-edit"><strong>${m.date}</strong><span>${m.teamA}</span><input type="number" min="0" data-match="${m.id}" data-field="scoreA" value="${m.scoreA ?? ''}" placeholder="0"><span>${m.teamB}</span><input type="number" min="0" data-match="${m.id}" data-field="scoreB" value="${m.scoreB ?? ''}" placeholder="0"><select data-match="${m.id}" data-field="status"><option ${m.status==='Scheduled'?'selected':''}>Scheduled</option><option ${m.status==='Final'?'selected':''}>Final</option></select></div>`).join('');
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
  savePool(POOL);
  const msg=$('adminMessage'); if(msg) msg.textContent='Saved in this browser. Use Export data.js to publish changes for everyone.';
  scores = calculateScores();
  renderAll();
}
function exportDataJS(){
  const helper = document.querySelector('#dataHelpers');
  if(!helper){ alert('Export is available only from the Admin page.'); return; }
  const content = `const DEFAULT_POOL = ${JSON.stringify(POOL,null,2)};\n\n${helper.textContent}`;
  const blob = new Blob([content], {type:'text/javascript'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'data.js'; a.click(); URL.revokeObjectURL(url);
}

function renderTournamentTimeline(){
  const timeline = $('stageTimeline');
  const fill = $('progressFill');
  const label = $('progressLabel');
  if(!timeline && !fill && !label) return;
  const groups = Object.values(POOL.officialGroups || {});
  const completedGroups = groups.filter(g => g && g.winner && g.runnerUp && g.winner !== 'TBD' && g.runnerUp !== 'TBD').length;
  const allGroupsComplete = completedGroups === 12;
  const now = new Date();
  const stages = [
    { code:'GS', name:'Group Stage', start:'2026-06-11', end:'2026-06-27', detail: allGroupsComplete ? 'Completed' : `${completedGroups}/12 groups final` },
    { code:'R32', name:'Round of 32', start:'2026-06-28', end:'2026-07-03', detail:'Starts Jun 28' },
    { code:'R16', name:'Round of 16', start:'2026-07-04', end:'2026-07-07', detail:'Starts Jul 4' },
    { code:'QF', name:'Quarterfinals', start:'2026-07-09', end:'2026-07-11', detail:'Starts Jul 9' },
    { code:'SF', name:'Semifinals', start:'2026-07-14', end:'2026-07-15', detail:'Starts Jul 14' },
    { code:'F', name:'Final', start:'2026-07-19', end:'2026-07-19', detail:'Jul 19' }
  ];
  function dateOnly(s){ return new Date(`${s}T00:00:00`); }
  function endOf(s){ return new Date(`${s}T23:59:59`); }
  const stageStates = stages.map((s, idx) => {
    let state = 'future';
    let detail = s.detail;
    if(s.code === 'GS'){
      if(allGroupsComplete) { state = 'done'; detail = 'Completed'; }
      else { state = 'active'; detail = `${completedGroups}/12 groups final`; }
    } else if(now < dateOnly(s.start)) {
      state = 'future';
    } else if(now > endOf(s.end)) {
      state = 'done'; detail = 'Completed';
    } else {
      state = 'active'; detail = 'In progress';
    }
    return {...s, state, detail};
  });
  const active = stageStates.find(s => s.state === 'active') || stageStates.find(s => s.state === 'future') || stageStates[stageStates.length-1];
  const doneCount = stageStates.filter(s => s.state === 'done').length;
  const gsFraction = Math.min(completedGroups / 12, 1);
  let progressPct = Math.round(((doneCount + (active?.state === 'active' ? (active.code === 'GS' ? gsFraction : 0.35) : 0)) / stages.length) * 100);
  progressPct = Math.max(4, Math.min(progressPct, 100));
  if(fill) fill.style.width = `${progressPct}%`;
  if(label) label.textContent = `${active.name}: ${active.detail}. Stage progress, not pool points.`;
  if(timeline){
    timeline.innerHTML = stageStates.map(s => `<div class="stage-step ${s.state}"><span class="stage-code">${s.code}</span><div><div class="stage-title">${s.name}</div><div class="stage-detail">${s.detail}</div></div></div>`).join('');
  }
}

function renderAll(){
  try{
    renderMiniLeaderboard(); renderFullLeaderboard(); renderImpact(); renderMatches(); renderTournamentPicks(); renderGroups(); renderPlayers(); renderAdmin(); renderTournamentTimeline();
  } catch(err){
    console.error('MauMatch render error:', err);
    const leader = $('dashboardLeader'); if(leader) leader.textContent = 'Data error — reset local changes in Admin';
  }
}
renderAll();
