(function(){
  const $ = id => document.getElementById(id);

  const FALLBACK_POOL = {
  "prizePool": 120,
  "entryFee": 30,
  "players": [
    "Mauricio",
    "Laura",
    "Lisa",
    "Natalia"
  ],
  "scoring": {
    "groupWinner": 3,
    "groupRunnerUp": 2,
    "r32": 2,
    "r16": 4,
    "qf": 8,
    "sf": 16,
    "final": 32,
    "champion": 20,
    "runnerUp": 10,
    "goldenBoot": 10,
    "darkHorse": {
      "r16": 5,
      "qf": 10,
      "sf": 15,
      "final": 20,
      "champion": 30
    }
  },
  "officialGroups": {
    "A": {
      "winner": "Mexico",
      "runnerUp": "South Africa"
    },
    "B": {
      "winner": "Switzerland",
      "runnerUp": "Canada"
    },
    "C": {
      "winner": "Brazil",
      "runnerUp": "Morocco"
    },
    "D": {
      "winner": "USA",
      "runnerUp": "Australia"
    },
    "E": {
      "winner": "Germany",
      "runnerUp": "Ivory Coast"
    },
    "F": {
      "winner": "Netherlands",
      "runnerUp": "Japan"
    },
    "G": {
      "winner": "Belgium",
      "runnerUp": "Egypt"
    },
    "H": {
      "winner": "Spain",
      "runnerUp": "Cape Verde"
    },
    "I": {
      "winner": "France",
      "runnerUp": "Norway"
    },
    "J": {
      "winner": "TBD",
      "runnerUp": "TBD"
    },
    "K": {
      "winner": "TBD",
      "runnerUp": "TBD"
    },
    "L": {
      "winner": "TBD",
      "runnerUp": "TBD"
    }
  },
  "groupPicks": {
    "Mauricio": {
      "A": [
        "Mexico",
        "South Korea"
      ],
      "B": [
        "Switzerland",
        "Canada"
      ],
      "C": [
        "Brazil",
        "Morocco"
      ],
      "D": [
        "Paraguay",
        "USA"
      ],
      "E": [
        "Germany",
        "Ecuador"
      ],
      "F": [
        "Netherlands",
        "Japan"
      ],
      "G": [
        "Egypt",
        "Belgium"
      ],
      "H": [
        "Spain",
        "Uruguay"
      ],
      "I": [
        "France",
        "Norway"
      ],
      "J": [
        "Argentina",
        "Algeria"
      ],
      "K": [
        "Colombia",
        "Portugal"
      ],
      "L": [
        "England",
        "Croatia"
      ]
    },
    "Laura": {
      "A": [
        "Czechia",
        "South Korea"
      ],
      "B": [
        "Switzerland",
        "Canada"
      ],
      "C": [
        "Brazil",
        "Scotland"
      ],
      "D": [
        "USA",
        "Paraguay"
      ],
      "E": [
        "Germany",
        "Ecuador"
      ],
      "F": [
        "Netherlands",
        "Japan"
      ],
      "G": [
        "Belgium",
        "Iran"
      ],
      "H": [
        "Uruguay",
        "Spain"
      ],
      "I": [
        "Norway",
        "France"
      ],
      "J": [
        "Argentina",
        "Jordan"
      ],
      "K": [
        "Colombia",
        "Portugal"
      ],
      "L": [
        "Croatia",
        "England"
      ]
    },
    "Lisa": {
      "A": [
        "South Korea",
        "Mexico"
      ],
      "B": [
        "Switzerland",
        "Canada"
      ],
      "C": [
        "Brazil",
        "Morocco"
      ],
      "D": [
        "USA",
        "Paraguay"
      ],
      "E": [
        "Germany",
        "Ecuador"
      ],
      "F": [
        "Netherlands",
        "Japan"
      ],
      "G": [
        "Iran",
        "Belgium"
      ],
      "H": [
        "Uruguay",
        "Spain"
      ],
      "I": [
        "France",
        "Norway"
      ],
      "J": [
        "Argentina",
        "Algeria"
      ],
      "K": [
        "Portugal",
        "Colombia"
      ],
      "L": [
        "England",
        "Croatia"
      ]
    },
    "Natalia": {
      "A": [
        "Mexico",
        "South Korea"
      ],
      "B": [
        "Switzerland",
        "Canada"
      ],
      "C": [
        "Brazil",
        "Morocco"
      ],
      "D": [
        "Türkiye",
        "USA"
      ],
      "E": [
        "Germany",
        "Ecuador"
      ],
      "F": [
        "Sweden",
        "Japan"
      ],
      "G": [
        "Iran",
        "Egypt"
      ],
      "H": [
        "Spain",
        "Uruguay"
      ],
      "I": [
        "France",
        "Norway"
      ],
      "J": [
        "Argentina",
        "Algeria"
      ],
      "K": [
        "Portugal",
        "Colombia"
      ],
      "L": [
        "England",
        "Panama"
      ]
    }
  },
  "tournamentPicks": {
    "Mauricio": {
      "champion": "USA",
      "runnerUp": "England",
      "goldenBoot": "",
      "darkHorse": "Scotland",
      "finalScore": ""
    },
    "Laura": {
      "champion": "USA",
      "runnerUp": "Argentina",
      "goldenBoot": "",
      "darkHorse": "Panama",
      "finalScore": ""
    },
    "Lisa": {
      "champion": "France",
      "runnerUp": "USA",
      "goldenBoot": "",
      "darkHorse": "Sweden",
      "finalScore": ""
    },
    "Natalia": {
      "champion": "Spain",
      "runnerUp": "England",
      "goldenBoot": "",
      "darkHorse": "Senegal",
      "finalScore": ""
    }
  },
  "matches": [
    {
      "id": "pan-eng",
      "date": "Jun 27",
      "teamA": "Panama",
      "teamB": "England",
      "scoreA": null,
      "scoreB": null,
      "status": "Scheduled",
      "insight": "England affects Mauricio and Natalia runner-up hopes. Panama is Laura's Dark Horse."
    },
    {
      "id": "cro-gha",
      "date": "Jun 27",
      "teamA": "Croatia",
      "teamB": "Ghana",
      "scoreA": null,
      "scoreB": null,
      "status": "Scheduled",
      "insight": "Group L impacts England/Croatia/Panama predictions."
    },
    {
      "id": "col-por",
      "date": "Jun 27",
      "teamA": "Colombia",
      "teamB": "Portugal",
      "scoreA": null,
      "scoreB": null,
      "status": "Scheduled",
      "insight": "Group K impacts Mauricio/Laura vs Lisa/Natalia picks."
    },
    {
      "id": "jor-arg",
      "date": "Jun 27",
      "teamA": "Jordan",
      "teamB": "Argentina",
      "scoreA": null,
      "scoreB": null,
      "status": "Scheduled",
      "insight": "Argentina matters to Laura as runner-up and to all players' Group J logic."
    },
    {
      "id": "bra-jpn",
      "date": "Jun 29",
      "teamA": "Brazil",
      "teamB": "Japan",
      "scoreA": null,
      "scoreB": null,
      "status": "Scheduled",
      "insight": "Brazil is a common group winner; Japan affects Group F runner-up picks."
    },
    {
      "id": "fra-swe",
      "date": "Jun 30",
      "teamA": "France",
      "teamB": "Sweden",
      "scoreA": null,
      "scoreB": null,
      "status": "Scheduled",
      "insight": "Lisa's Champion France faces her Dark Horse Sweden in a high-impact storyline."
    }
  ]
};

  function clone(obj){ return JSON.parse(JSON.stringify(obj)); }

  function isValidPool(pool){
    return !!(pool && Array.isArray(pool.players) && pool.players.length && pool.groupPicks && pool.officialGroups);
  }

  function getPool(){
    if (isValidPool(window.POOL)) return window.POOL;
    try {
      const saved = localStorage.getItem('mauMatchPool');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (isValidPool(parsed)) {
          window.POOL = parsed;
          return window.POOL;
        }
      }
    } catch(e) { console.warn('Saved pool ignored:', e); }
    window.POOL = clone(FALLBACK_POOL);
    return window.POOL;
  }

  function setHtml(id, html){ const el = $(id); if (el) el.innerHTML = html; }
  function medal(i){ return ['🥇','🥈','🥉'][i] || `${i+1}.`; }

  function matchWinner(match){
    if (!match || match.status !== 'Final' || match.scoreA == null || match.scoreB == null) return 'TBD';
    if (Number(match.scoreA) > Number(match.scoreB)) return match.teamA;
    if (Number(match.scoreB) > Number(match.scoreA)) return match.teamB;
    return 'Draw';
  }

  function calculateGroupScores(){
    const pool = getPool();
    const scoring = pool.scoring || { groupWinner: 3, groupRunnerUp: 2 };
    return pool.players.map(player => {
      let groupPoints = 0;
      Object.entries(pool.officialGroups || {}).forEach(([group, official]) => {
        if (!official || !official.winner || !official.runnerUp || official.winner === 'TBD' || official.runnerUp === 'TBD') return;
        const pick = pool.groupPicks?.[player]?.[group];
        if (!pick) return;
        if (pick[0] === official.winner) groupPoints += scoring.groupWinner || 3;
        if (pick[1] === official.runnerUp) groupPoints += scoring.groupRunnerUp || 2;
      });
      return { player, groupPoints, knockoutPoints: 0, bonusPoints: 0, total: groupPoints };
    }).sort((a,b) => b.total - a.total || a.player.localeCompare(b.player));
  }

  function getScores(){
    try {
      if (typeof window.calculateScores === 'function') {
        const scores = window.calculateScores();
        if (Array.isArray(scores) && scores.length) return scores;
      }
    } catch(e) { console.warn('calculateScores ignored:', e); }
    return calculateGroupScores();
  }

  function getGroupProgress(){
    const pool = getPool();
    const groups = Object.values(pool.officialGroups || {});
    const total = groups.length || 12;
    const completed = groups.filter(g => g && g.winner && g.runnerUp && g.winner !== 'TBD' && g.runnerUp !== 'TBD').length;
    return { completed, total, pct: Math.round((completed / total) * 100) };
  }

  function renderMiniLeaderboard(){
    const scores = getScores();
    const html = scores.length
      ? scores.map((s,i)=>`<div class="leader-row ${i===0?'leader-first':''}"><div><span class="rank">${medal(i)}</span> <strong>${s.player}</strong><div class="small">Groups ${s.groupPoints || 0} · Bonus ${s.bonusPoints || 0}</div></div><div class="points">${s.total || 0} pts</div></div>`).join('')
      : '<p class="muted">No player data found. Check js/data.js.</p>';
    setHtml('leaderboardMini', html);
    const leader = $('dashboardLeader');
    if (leader && scores[0]) leader.textContent = `${scores[0].player} — ${scores[0].total || 0} pts`;
  }

  function renderFullLeaderboard(){
    const el = $('leaderboardFull'); if(!el) return;
    const scores = getScores();
    el.innerHTML = `<table class="score-table"><thead><tr><th>Rank</th><th>Player</th><th>Groups</th><th>Knockout</th><th>Bonus</th><th>Total</th></tr></thead><tbody>${scores.map((s,i)=>`<tr class="${i===0?'leader-table-row':''}"><td>${medal(i)}</td><td><strong>${s.player}</strong></td><td>${s.groupPoints || 0}</td><td>${s.knockoutPoints || 0}</td><td>${s.bonusPoints || 0}</td><td class="points">${s.total || 0}</td></tr>`).join('')}</tbody></table>`;
  }

  function renderTournamentProgress(){
    const el = $('tournamentProgressSummary'); if(!el) return;
    const p = getGroupProgress();
    const groupStatus = p.completed >= p.total ? 'Completed' : `${p.completed}/${p.total} groups final`;
    const stages = [
      {abbr:'GS', label:'Group Stage', status:groupStatus, active:p.completed < p.total, done:p.completed >= p.total},
      {abbr:'R32', label:'Round of 32', status:'Starts Jun 28'},
      {abbr:'R16', label:'Round of 16', status:'Starts Jul 4'},
      {abbr:'QF', label:'Quarterfinals', status:'Starts Jul 9'},
      {abbr:'SF', label:'Semifinals', status:'Starts Jul 14'},
      {abbr:'F', label:'Final', status:'Jul 19'}
    ];
    el.innerHTML = `<div class="progress-summary"><div class="progress"><span style="width:${Math.max(8, Math.min(100, p.pct))}%"></span></div><div class="progress-meta"><span>Group Stage: ${groupStatus}</span><span>${p.pct}% groups final</span></div><div class="stage-timeline compact">${stages.map(s=>`<div class="stage-chip ${s.done?'done':''} ${s.active?'active':''}"><strong>${s.abbr}</strong><small>${s.status}</small></div>`).join('')}</div><p class="small muted">Progress uses official group results, not pool points.</p></div>`;
  }

  function renderImpact(){
    const pool = getPool();
    const el = $('impactList'); if(!el) return;
    const open = (pool.matches || []).filter(m => m.status !== 'Final').slice(0,4);
    const items = open.length ? open.map(m => ({title:`${m.teamA || m.title || ''}${m.teamB ? ' vs ' + m.teamB : ''}`, text:m.insight || 'Potential pool impact pending.'})) : [{title:'No open matches', text:'All listed matches are final. Update the next round in Admin when ready.'}];
    el.innerHTML = items.map(x=>`<div class="impact-bullet"><strong>${x.title}</strong><span>${x.text}</span></div>`).join('');
  }

  function renderMatches(){
    const pool = getPool();
    ['matchCards','matchesPage'].forEach(id => {
      const el = $(id); if(!el) return;
      const list = id === 'matchCards' ? (pool.matches || []).slice(0,4) : (pool.matches || []);
      el.innerHTML = list.map(m => {
        const title = m.teamA && m.teamB ? `${m.teamA} vs ${m.teamB}` : (m.title || 'Match');
        const score = m.status === 'Final' && m.teamA && m.teamB ? `<div class="scoreline">${m.teamA} ${m.scoreA} — ${m.scoreB} ${m.teamB}</div>` : `<div class="scoreline">${title}</div>`;
        return `<article class="card match-card"><div><span class="pill">${m.date || ''}</span><span class="pill ${m.status==='Final'?'success':''}">${m.status || 'Scheduled'}</span>${score}<p class="muted">${m.insight || ''}</p>${m.status==='Final'?`<p class="small">Winner: ${matchWinner(m)}</p>`:''}</div></article>`;
      }).join('');
    });
  }

  function renderTournamentPicks(){
    const pool = getPool();
    const el = $('tournamentPicksMini'); if(!el) return;
    el.innerHTML = pool.players.map(p => {
      const t = pool.tournamentPicks?.[p] || {};
      return `<div class="pick-row"><div><strong>${p}</strong><div class="small">Champion: ${t.champion || '—'}<br>Runner-up: ${t.runnerUp || '—'}</div></div><span class="pill">Dark Horse: ${t.darkHorse || '—'}</span></div>`;
    }).join('');
  }

  function renderGroups(){
    const pool = getPool();
    const el = $('groupsGrid'); if(!el) return;
    el.innerHTML = Object.keys(pool.officialGroups || {}).map(group => {
      const official = pool.officialGroups[group] || {winner:'TBD', runnerUp:'TBD'};
      const officialSummary = official.winner === 'TBD' ? '<span class="muted">Official: Pending</span>' : `<span class="official-badge winner">🥇 ${official.winner}</span> <span class="official-badge runner">🥈 ${official.runnerUp}</span>`;
      const rows = pool.players.map(p => {
        const pick = pool.groupPicks?.[p]?.[group] || ['—','—'];
        const w = official.winner !== 'TBD' && pick[0] === official.winner;
        const r = official.runnerUp !== 'TBD' && pick[1] === official.runnerUp;
        return `<tr><td>${p}</td><td>${pick[0]} <span class="${w?'ok':'bad'}">${official.winner==='TBD'?'':(w?'✓':'×')}</span></td><td>${pick[1]} <span class="${r?'ok':'bad'}">${official.runnerUp==='TBD'?'':(r?'✓':'×')}</span></td></tr>`;
      }).join('');
      return `<article class="card group-card"><h2>Group ${group}</h2><p>${officialSummary}</p><table><thead><tr><th>Player</th><th>Winner</th><th>Runner-up</th></tr></thead><tbody>${rows}</tbody></table></article>`;
    }).join('');
  }

  function renderPlayers(){
    const pool = getPool();
    const scores = getScores();
    const el = $('playersGrid'); if(!el) return;
    el.innerHTML = pool.players.map(p => {
      const s = scores.find(x => x.player === p) || {total:0, groupPoints:0};
      const t = pool.tournamentPicks?.[p] || {};
      return `<article class="card"><div class="player-name">${p}</div><p class="points">${s.total || 0} pts</p><p><span class="pill">Champion: ${t.champion || '—'}</span><span class="pill">Runner-up: ${t.runnerUp || '—'}</span><span class="pill">Dark Horse: ${t.darkHorse || '—'}</span></p><p class="muted">Group points: ${s.groupPoints || 0}. Knockout and bonus scoring are planned next.</p></article>`;
    }).join('');
  }

  function renderAdmin(){
    const pool = getPool();
    const groupsEl = $('adminGroups');
    if(groupsEl){
      groupsEl.innerHTML = Object.keys(pool.officialGroups || {}).map(g => {
        const o = pool.officialGroups[g] || {winner:'TBD', runnerUp:'TBD'};
        return `<div class="admin-row"><strong>Group ${g}</strong><input data-group="${g}" data-field="winner" value="${o.winner || 'TBD'}" aria-label="Group ${g} winner"><input data-group="${g}" data-field="runnerUp" value="${o.runnerUp || 'TBD'}" aria-label="Group ${g} runner-up"></div>`;
      }).join('');
    }
    const matchesEl = $('adminMatches');
    if(matchesEl){
      matchesEl.innerHTML = (pool.matches || []).map(m => `<div class="admin-row match-edit"><strong>${m.date || ''}</strong><span>${m.teamA || m.title || ''}</span><input type="number" min="0" data-match="${m.id}" data-field="scoreA" value="${m.scoreA ?? ''}" placeholder="0"><span>${m.teamB || ''}</span><input type="number" min="0" data-match="${m.id}" data-field="scoreB" value="${m.scoreB ?? ''}" placeholder="0"><select data-match="${m.id}" data-field="status"><option ${m.status==='Scheduled'?'selected':''}>Scheduled</option><option ${m.status==='Final'?'selected':''}>Final</option></select></div>`).join('');
    }
  }

  function saveAdminChanges(){
    const pool = getPool();
    document.querySelectorAll('[data-group]').forEach(input => {
      const group = input.dataset.group, field = input.dataset.field;
      if(!pool.officialGroups[group]) pool.officialGroups[group] = {winner:'TBD', runnerUp:'TBD'};
      pool.officialGroups[group][field] = input.value.trim() || 'TBD';
    });
    document.querySelectorAll('[data-match]').forEach(input => {
      const match = (pool.matches || []).find(m => m.id === input.dataset.match); if(!match) return;
      const field = input.dataset.field;
      if(field === 'scoreA' || field === 'scoreB') match[field] = input.value === '' ? null : Number(input.value);
      else match[field] = input.value;
    });
    window.POOL = pool;
    try { localStorage.setItem('mauMatchPool', JSON.stringify(pool)); } catch(e) { console.warn('Local save failed:', e); }
    const msg = $('adminMessage');
    if(msg) msg.innerHTML = '✅ Saved in this browser. Use <strong>Export data.js</strong> to publish changes for everyone.';
    renderAll(false);
  }

  function buildDataFile(pool){
    return `var DEFAULT_POOL = ${JSON.stringify(pool,null,2)};\n\nfunction mauMatchClone(obj){ return JSON.parse(JSON.stringify(obj)); }\nfunction loadPool(){\n  try {\n    var saved = localStorage.getItem('mauMatchPool');\n    var parsed = saved ? JSON.parse(saved) : null;\n    if (parsed && Array.isArray(parsed.players) && parsed.players.length) return parsed;\n  } catch(e) { console.warn('MauMatch local save could not be read; using default data.', e); }\n  return mauMatchClone(DEFAULT_POOL);\n}\nfunction savePool(pool){ localStorage.setItem('mauMatchPool', JSON.stringify(pool)); }\nfunction resetPool(){ localStorage.removeItem('mauMatchPool'); location.reload(); }\nvar POOL = loadPool();\nwindow.DEFAULT_POOL = DEFAULT_POOL;\nwindow.POOL = POOL;\nwindow.loadPool = loadPool;\nwindow.savePool = savePool;\nwindow.resetPool = resetPool;\n`;
  }

  function exportDataJS(){
    const blob = new Blob([buildDataFile(getPool())], {type:'text/javascript'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'data.js'; a.click(); URL.revokeObjectURL(url);
  }

  function resetLocal(){
    try { localStorage.removeItem('mauMatchPool'); } catch(e) {}
    window.POOL = clone(FALLBACK_POOL);
    const msg = $('adminMessage');
    if(msg) msg.textContent = '✅ Local changes reset. Default published data loaded.';
    renderAll(true);
  }

  function wireAdminButtons(){
    const saveBtn = $('saveAdminBtn'); if(saveBtn) saveBtn.onclick = saveAdminChanges;
    const exportBtn = $('exportDataBtn'); if(exportBtn) exportBtn.onclick = exportDataJS;
    const resetBtn = $('resetPoolBtn'); if(resetBtn) resetBtn.onclick = resetLocal;
  }

  function renderAll(rebuildAdmin=true){
    renderMiniLeaderboard();
    renderFullLeaderboard();
    renderTournamentProgress();
    renderImpact();
    renderMatches();
    renderTournamentPicks();
    renderGroups();
    renderPlayers();
    if(rebuildAdmin) renderAdmin();
    wireAdminButtons();
  }

  window.saveAdminChanges = saveAdminChanges;
  window.exportDataJS = exportDataJS;
  window.resetLocalMauMatch = resetLocal;
  try { renderAll(); } catch(e) {
    console.error('MauMatch render error:', e);
    ['leaderboardMini','impactList','matchCards','tournamentPicksMini','tournamentProgressSummary'].forEach(id => setHtml(id, `<p class="muted">Render error: ${e.message}</p>`));
  }
})();
