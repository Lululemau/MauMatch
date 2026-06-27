function el(id){return document.getElementById(id)}
function table(headers, rows){return `<div class="table-wrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function renderLeaderboard(target='leaderboard-mini'){
  if(!el(target)) return;
  const rows=leaderboard().map((r,i)=>[`<span class="rank">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</span>`,r.name,r.group,r.knockout,r.bonus,`<strong>${r.total}</strong>`]);
  el(target).innerHTML=table(['Rank','Player','Groups','Knockout','Bonus','Total'],rows);
}
function renderImpact(){
  if(!el('impact-list')) return;
  el('impact-list').innerHTML=POOL.matches.slice(0,4).map(m=>`<div class="impact-item"><strong>${m.teams}</strong><br><span class="muted">${m.stage} · ${m.date} · ${m.time}</span><p>${m.impact}</p></div>`).join('');
}
function renderMatches(){
  const ids=['upcoming-matches','matches-list']; ids.forEach(id=>{if(el(id)) el(id).innerHTML=POOL.matches.map(m=>`<div class="match"><div><strong>${m.teams}</strong><small>${m.stage} · ${m.date} · ${m.time}</small></div><span class="pill warn">Impact</span></div><p class="muted">${m.impact}</p>`).join('')});
}
function renderStory(){
  if(!el('pool-story')) return;
  const lb=leaderboard();
  el('pool-story').innerHTML=`<p><strong>${lb[0].name}</strong> currently leads based on completed group results entered in V1.</p><p class="muted">Group K and Group L still have major swing potential because players are split on Colombia/Portugal and England/Croatia/Panama.</p>`;
}
function renderGroups(){
  if(!el('groups-table')) return;
  let html='';
  for(const group of Object.keys(POOL.groups)){
    const official=POOL.officialGroupResults[group];
    html+=`<div class="card"><h3>Group ${group}</h3><p class="muted">Teams: ${POOL.groups[group].join(', ')}</p>`;
    html+=table(['Player','Winner Pick','Runner-up Pick','Official','Pts'], POOL.players.map(p=>{
      const pick=POOL.groupPicks[p][group];
      const pts=official[0]&&official[1]?((pick[0]===official[0]?3:0)+(pick[1]===official[1]?2:0)):'Pending';
      const off=official[0]?`${official[0]} / ${official[1]}`:'Pending';
      return [p,pick[0],pick[1],off,pts];
    }));
    html+='</div>';
  }
  el('groups-table').innerHTML=html;
}
function renderPlayers(){
  if(!el('players-grid')) return;
  const lb=leaderboard(); const totals=Object.fromEntries(lb.map(x=>[x.name,x.total]));
  el('players-grid').innerHTML=POOL.players.map(p=>{const t=POOL.tournamentPicks[p];return `<div class="card player-card"><div><h4>${p}</h4><p><span class="pill">Champion</span> ${t.champion||'—'}</p><p><span class="pill">Runner-up</span> ${t.runnerUp||'—'}</p><p><span class="pill">Dark Horse</span> ${t.darkHorse||'—'}</p><p class="muted">Golden Boot: ${t.goldenBoot||'Not entered'}</p></div><div class="score">${totals[p]}</div></div>`}).join('');
}
function renderAdmin(){
  if(!el('admin-content')) return;
  el('admin-content').innerHTML=`<div class="notice"><strong>V1 Admin Note:</strong> For now, results are stored inside <code>js/data.js</code>. Update the <code>officialGroupResults</code> section, commit, and push to GitHub. In V1.1 we can make this an editable form that saves to browser storage.</div>`;
}
renderLeaderboard();renderImpact();renderMatches();renderStory();renderGroups();renderPlayers();renderAdmin();
