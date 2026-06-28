(function(){
  const $ = id => document.getElementById(id);

  function safePool(){
    if (typeof POOL !== 'undefined' && POOL && Array.isArray(POOL.players) && POOL.players.length) return POOL;
    if (window.POOL && Array.isArray(window.POOL.players) && window.POOL.players.length) return window.POOL;
    try {
      const saved = localStorage.getItem('mauMatchPool');
      if (saved) { const parsed = JSON.parse(saved); if (parsed && Array.isArray(parsed.players) && parsed.players.length) return parsed; }
    } catch(e) {}
    if (window.DEFAULT_POOL && Array.isArray(window.DEFAULT_POOL.players)) return JSON.parse(JSON.stringify(window.DEFAULT_POOL));
    return { players: [], officialGroups: {}, groupPicks: {}, tournamentPicks: {}, matches: [], scoring: { groupWinner: 3, groupRunnerUp: 2 } };
  }

  function safeScores(){
    try {
      if (typeof calculateScores === 'function') return calculateScores();
    } catch (e) {
      console.error('MauMatch scoring error:', e);
    }
    const pool = safePool();
    return (pool.players || []).map(player => ({ player, groupPoints: 0, knockoutPoints: 0, bonusPoints: 0, total: 0 }));
  }

  function safeMedal(i){
    try { if (typeof medal === 'function') return medal(i); } catch(e) {}
    return ['🥇','🥈','🥉'][i] || String(i + 1);
  }

  function safeMatchWinner(match){
    try { if (typeof matchWinner === 'function') return matchWinner(match); } catch(e) {}
    if (!match || match.status !== 'Final' || match.scoreA == null || match.scoreB == null) return 'TBD';
    if (Number(match.scoreA) > Number(match.scoreB)) return match.teamA;
    if (Number(match.scoreB) > Number(match.scoreA)) return match.teamB;
    return 'Draw';
  }

  function setHtml(id, html){
    const el = $(id);
    if (el) el.innerHTML = html;
  }

  function getGroupProgress(){
    const pool = safePool();
    const groups = Object.values(pool.officialGroups || {});
    const completed = groups.filter(g => g && g.winner && g.runnerUp && g.winner !== 'TBD' && g.runnerUp !== 'TBD').length;
    const total = groups.length || 12;
    return { completed, total, pct: Math.round((completed / total) * 100) };
  }

  function renderTournamentProgress(){
    const el = $('tournamentProgressSummary');
    if(!el) return;
    const p = getGroupProgress();
    const groupStatus = p.completed >= p.total ? 'Completed' : `${p.completed}/${p.total} groups final`;
    const stages = [
      {abbr:'GS', status:groupStatus, active:p.completed < p.total, done:p.completed >= p.total},
      {abbr:'R32', status:'Starts Jun 28'},
      {abbr:'R16', status:'Starts Jul 4'},
      {abbr:'QF', status:'Starts Jul 9'},
      {abbr:'SF', status:'Starts Jul 14'},
      {abbr:'F', status:'Jul 19'}
    ];
    el.innerHTML = `<div class="progress-summary">
      <div class="progress"><span style="width:${Math.max(8, Math.min(100, p.pct))}%"></span></div>
      <div class="progress-meta"><span>Group Stage: ${groupStatus}</span><span>${p.pct}% of groups final</span></div>
      <div class="stage-timeline">${stages.map(s=>`<div class="stage-chip ${s.done?'done':''} ${s.active?'active':''}"><strong>${s.abbr}</strong><small>${s.status}</small></div>`).join('')}</div>
      <p class="small muted">Progress is based on tournament stage and completed official group results.</p>
    </div>`;
  }

  function renderMiniLeaderboard(){
    const scores = safeScores();
    const html = scores.length
      ? scores.map((s,i)=>`<div class="leader-row ${i===0?'leader-first':''}"><div><span class="rank">${safeMedal(i)}</span> <strong>${s.player}</strong><div class="small">Groups ${s.groupPoints || 0} · Bonus ${s.bonusPoints || 0}</div></div><div class="points">${s.total || 0} pts</div></div>`).join('')
      : '<p class="muted">No player data found. Check js/data.js.</p>';
    setHtml('leaderboardMini', html);
    const leader = $('dashboardLeader');
    if(leader && scores[0]) leader.textContent = `${scores[0].player} — ${scores[0].total || 0} pts`;
  }

  function renderFullLeaderboard(){
    const el = $('leaderboardFull'); if(!el) return;
    const scores = safeScores();
    el.innerHTML = `<table class="score-table"><thead><tr><th>Rank</th><th>Player</th><th>Groups</th><th>Knockout</th><th>Bonus</th><th>Total</th></tr></thead><tbody>${scores.map((s,i)=>`<tr class="${i===0?'leader-table-row':''}"><td>${safeMedal(i)}</td><td><strong>${s.player}</strong></td><td>${s.groupPoints || 0}</td><td>${s.knockoutPoints || 0}</td><td>${s.bonusPoints || 0}</td><td class="points">${s.total || 0}</td></tr>`).join('')}</tbody></table>`;
  }

  function renderImpact(){
    const pool = safePool();
    const el = $('impactList'); if(!el) return;
    const open = (pool.matches || []).filter(m=>m.status !== 'Final').slice(0,3);
    const items = open.length ? open.map(m=>({title:`${m.teamA} vs ${m.teamB}`, text:m.insight || 'Potential pool impact pending.'})) : [{title:'No open matches', text:'All listed matches are final. Update the next round in Admin when ready.'}];
    el.innerHTML = items.map(x=>`<div class="impact-bullet"><strong>${x.title}</strong><span>${x.text}</span></div>`).join('');
  }

  function renderMatches(){
    const pool = safePool();
    ['matchCards','matchesPage'].forEach(id=>{
      const el=$(id); if(!el) return;
      const list = id==='matchCards' ? (pool.matches || []).slice(0,4) : (pool.matches || []);
      el.innerHTML = list.map(m=>{
        const score = m.status === 'Final' ? `<div class="scoreline">${m.teamA} ${m.scoreA} — ${m.scoreB} ${m.teamB}</div>` : `<div class="scoreline">${m.teamA} vs ${m.teamB}</div>`;
        return `<article class="card match-card"><div><span class="pill">${m.date || ''}</span><span class="pill ${m.status==='Final'?'success':''}">${m.status || 'Scheduled'}</span>${score}<p class="muted">${m.insight || ''}</p>${m.status==='Final'?`<p class="small">Winner: ${safeMatchWinner(m)}</p>`:''}</div></article>`;
      }).join('');
    });
  }

  function renderTournamentPicks(){
    const pool = safePool();
    const el = $('tournamentPicksMini'); if(!el) return;
    el.innerHTML = (pool.players || []).map(p=>{
      const t=(pool.tournamentPicks || {})[p] || {};
      return `<div class="pick-row"><div><strong>${p}</strong><div class="small">Champion: ${t.champion || '—'}<br>Runner-up: ${t.runnerUp || '—'}</div></div><span class="pill">Dark Horse: ${t.darkHorse || '—'}</span></div>`;
    }).join('');
  }

  function renderGroups(){
    const pool = safePool();
    const el = $('groupsGrid'); if(!el) return;
    el.innerHTML = Object.keys(pool.officialGroups || {}).map(g=>{
      const official=pool.officialGroups[g] || {winner:'TBD', runnerUp:'TBD'};
      const officialSummary = official.winner === 'TBD' ? '<span class="muted">Official: Pending</span>' : `<span class="official-badge winner">🥇 ${official.winner}</span> <span class="official-badge runner">🥈 ${official.runnerUp}</span>`;
      const rows = (pool.players || []).map(p=>{
        const pick=(pool.groupPicks?.[p]?.[g]) || ['—','—'];
        const w = official.winner !== 'TBD' && pick[0]===official.winner;
        const r = official.runnerUp !== 'TBD' && pick[1]===official.runnerUp;
        return `<tr><td>${p}</td><td>${pick[0]} <span class="${w?'ok':'bad'}">${official.winner==='TBD'?'':' '+(w?'✓':'×')}</span></td><td>${pick[1]} <span class="${r?'ok':'bad'}">${official.runnerUp==='TBD'?'':' '+(r?'✓':'×')}</span></td></tr>`;
      }).join('');
      return `<article class="card group-card"><h2>Group ${g}</h2><p>${officialSummary}</p><table><thead><tr><th>Player</th><th>Winner</th><th>Runner-up</th></tr></thead><tbody>${rows}</tbody></table></article>`;
    }).join('');
  }

  function renderPlayers(){
    const pool = safePool();
    const scores = safeScores();
    const el = $('playersGrid'); if(!el) return;
    el.innerHTML = (pool.players || []).map(p=>{
      const s=scores.find(x=>x.player===p) || {total:0, groupPoints:0};
      const t=(pool.tournamentPicks || {})[p] || {};
      return `<article class="card"><div class="player-name">${p}</div><p class="points">${s.total || 0} pts</p><p><span class="pill">Champion: ${t.champion || '—'}</span><span class="pill">Runner-up: ${t.runnerUp || '—'}</span><span class="pill">Dark Horse: ${t.darkHorse || '—'}</span></p><p class="muted">Group points: ${s.groupPoints || 0}. Knockout and bonus scoring are planned next.</p></article>`;
    }).join('');
  }

  function renderAdmin(){
    const pool = safePool();
    const groupsEl = $('adminGroups');
    if(groupsEl){
      groupsEl.innerHTML = Object.keys(pool.officialGroups || {}).map(g=>{
        const o = pool.officialGroups[g] || {winner:'TBD', runnerUp:'TBD'};
        return `<div class="admin-row"><strong>Group ${g}</strong><input data-group="${g}" data-field="winner" value="${o.winner || 'TBD'}" aria-label="Group ${g} winner"><input data-group="${g}" data-field="runnerUp" value="${o.runnerUp || 'TBD'}" aria-label="Group ${g} runner-up"></div>`;
      }).join('');
    }
    const matchesEl = $('adminMatches');
    if(matchesEl){
      matchesEl.innerHTML = (pool.matches || []).map(m=>`<div class="admin-row match-edit"><strong>${m.date || ''}</strong><span>${m.teamA}</span><input type="number" min="0" data-match="${m.id}" data-field="scoreA" value="${m.scoreA ?? ''}" placeholder="0"><span>${m.teamB}</span><input type="number" min="0" data-match="${m.id}" data-field="scoreB" value="${m.scoreB ?? ''}" placeholder="0"><select data-match="${m.id}" data-field="status"><option ${m.status==='Scheduled'?'selected':''}>Scheduled</option><option ${m.status==='Final'?'selected':''}>Final</option></select></div>`).join('');
    }
  }

  function saveAdminChanges(){
    const pool = safePool();
    document.querySelectorAll('[data-group]').forEach(input=>{
      const g=input.dataset.group, f=input.dataset.field;
      if(!pool.officialGroups[g]) pool.officialGroups[g] = {winner:'TBD', runnerUp:'TBD'};
      pool.officialGroups[g][f] = input.value.trim() || 'TBD';
    });
    document.querySelectorAll('[data-match]').forEach(input=>{
      const m=(pool.matches || []).find(x=>x.id===input.dataset.match); if(!m) return;
      const f=input.dataset.field;
      if(f==='scoreA' || f==='scoreB') m[f] = input.value === '' ? null : Number(input.value);
      else m[f] = input.value;
    });
    try{
      if (typeof savePool === 'function') savePool(pool);
      window.POOL = pool;
      try { POOL = pool; } catch(e) {}
      const msg=$('adminMessage'); if(msg) msg.innerHTML='✅ Saved in this browser. Use <strong>Export data.js</strong> to publish changes for everyone.';
      renderAll(false);
    } catch(e){
      console.error('MauMatch save failed:', e);
      const msg=$('adminMessage'); if(msg) msg.textContent='Save failed: ' + e.message;
    }
  }

  function exportDataJS(){
    const pool = safePool();
    const helper = `function loadPool(){\n  try {\n    const saved = localStorage.getItem("mauMatchPool");\n    return saved ? JSON.parse(saved) : structuredClone(DEFAULT_POOL);\n  } catch (e) {\n    return JSON.parse(JSON.stringify(DEFAULT_POOL));\n  }\n}\n\nfunction savePool(pool){\n  localStorage.setItem("mauMatchPool", JSON.stringify(pool));\n}\n\nfunction resetPool(){\n  localStorage.removeItem("mauMatchPool");\n  location.reload();\n}\n\nlet POOL = loadPool();`;
    const fixedHelper = helper.replace('let POOL = loadPool();', 'var POOL = loadPool();\nwindow.DEFAULT_POOL = DEFAULT_POOL;\nwindow.POOL = POOL;');
    const content = `var DEFAULT_POOL = ${JSON.stringify(pool,null,2)};\n\n${fixedHelper}`;
    const blob = new Blob([content], {type:'text/javascript'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'data.js'; a.click(); URL.revokeObjectURL(url);
  }

  function wireAdminButtons(){
    const saveBtn = $('saveAdminBtn'); if(saveBtn) saveBtn.onclick = saveAdminChanges;
    const exportBtn = $('exportDataBtn'); if(exportBtn) exportBtn.onclick = exportDataJS;
    const resetBtn = $('resetPoolBtn'); if(resetBtn) resetBtn.onclick = function(){ if (typeof resetPool === 'function') resetPool(); };
  }

  function renderAll(rebuildAdmin=true){
    renderMiniLeaderboard();
    renderFullLeaderboard();
    renderImpact();
    renderMatches();
    renderTournamentPicks();
    renderGroups();
    renderPlayers();
    if(rebuildAdmin) renderAdmin();
    renderTournamentProgress();
    wireAdminButtons();
  }

  window.saveAdminChanges = saveAdminChanges;
  window.exportDataJS = exportDataJS;
  try { renderAll(); } catch (e) {
    console.error('MauMatch render error:', e);
    ['leaderboardMini','impactList','matchCards','tournamentPicksMini','tournamentProgressSummary'].forEach(id=>setHtml(id, `<p class="muted">Render error: ${e.message}</p>`));
  }
})();
