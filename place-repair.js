/* Compatibility repair for area-guide data created by place.js. */
for (const k of Object.keys(P)) {
  const x=P[k];
  if (!Array.isArray(x.near)) {
    x.hero=x.near;
    x.near=x.day;
    x.day=x.things;
    x.things=x.best;
    x.best=x.icon;
  }
}
const repairKey=new URLSearchParams(location.search).get('spot')||'oldmontreal';
const repairD=P[repairKey]||P.oldmontreal;
const repairSlug={Bali:'bali','Cancún':'cancun',Miami:'miami',London:'london',Goa:'goa','Montréal':'montreal'}[repairD.city];
document.title=`${repairD.name} — GoWandria`;
const repairCity=document.querySelector('#placeCity'); if(repairCity) repairCity.textContent=repairD.city.toUpperCase();
const repairBack=document.querySelector('#placeBack'); if(repairBack){repairBack.href=`destination.html?place=${repairSlug}`;repairBack.textContent=`← ${repairD.city}`;}
const repairBest=repairD.best.map(x=>`<span>${x}</span>`).join('');
const repairDos=repairD.things.map((x,i)=>`<article class="detail-do"><b>0${i+1}</b><span>${x[2]}</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('');
const repairDay=repairD.day.map(x=>`<div class="day-row"><strong>${x[0]}</strong><span>${x[1]}</span><p>${x[2]}</p></div>`).join('');
const repairNear=repairD.near.map(x=>`<a class="next-card" href="place.html?spot=${x[2]}"><small>EXPLORE NEXT</small><h3>${x[0]}</h3><p>${x[1]}</p><b>Open guide →</b></a>`).join('');
document.querySelector('#place').innerHTML=`<section class="place-hero"><img src="${repairD.hero}" alt="${repairD.name}"><div><div class="eyebrow">${repairD.city.toUpperCase()} · AREA GUIDE</div><h1>${repairD.name}</h1><p>${repairD.line}</p></div></section><section id="why" class="place-intro"><div><div class="eyebrow coral">WHY WANDER HERE</div><h2>Not just a card.<br><em>A place to explore.</em></h2></div><div><p class="lead">${repairD.intro}</p><div class="best-tags">${repairBest}</div></div></section><section id="do" class="detail-section"><div class="eyebrow coral">MAKE IT YOURS</div><h2>What we'd actually<br><em>do while here.</em></h2><div class="detail-grid">${repairDos}</div></section><section id="day" class="day"><div class="eyebrow">A DAY AROUND HERE</div><h2>Enough structure.<br><em>Plenty of room.</em></h2><div class="day-list">${repairDay}</div></section><section id="nearby" class="next-section"><div class="eyebrow coral">KEEP EXPLORING ${repairD.city.toUpperCase()}</div><h2>Don't stop here.<br><em>Pick another corner.</em></h2><div class="next-grid">${repairNear}</div><p class="back-city"><a href="destination.html?place=${repairSlug}">← Back to all of ${repairD.city}</a></p></section>`;