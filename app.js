const $=s=>document.querySelector(s),L='abcd';let cur=0,done={},sc=0,tot=0;
try{done=JSON.parse(localStorage.getItem('apDone')||'{}')}catch(e){}
const nm=i=>i<U.length?`${i+1}. ${U[i].n}`:'🧪 Practice Test (28 Qs)';
function menu(){$('#menu').innerHTML=[...U,0].map((u,i)=>`<a href="#${i}" class="${i==cur?'on':''} ${done[i]?'done':''}">${nm(i)}</a>`).join('')}
const card=(q,i,pre)=>`<div class="q"><h4><span class="pn">${pre}${i+1}.</span> ${q[0]}</h4>${q[1].map((o,j)=>`<div class="opt ${j==q[2]?'right':''}">${L[j]}) ${o}</div>`).join('')}<div class="ans"><b>✅ Answer: ${L[q[2]]}) ${q[1][q[2]]}</b><div class="ex">${q[3]}</div></div></div>`;
function show(){cur=Math.max(0,Math.min(U.length,parseInt(location.hash.slice(1))||0));let h='';
if(cur<U.length){const u=U[cur];h=`<h1>${cur+1}. ${u.n}</h1><button onclick="document.body.classList.toggle('hide')">👁 Self-test mode (hide/show answers)</button><label><input type="checkbox" id="rv" ${done[cur]?'checked':''}> Mark as revised</label>
<details open><summary>📐 Formulas & key ideas</summary>${u.f.map(x=>`<div class="f">${x}</div>`).join('')}<div class="tip">💡 ${u.t}</div></details>
<details open><summary>📘 Solved examples from the book</summary>${u.e.map((q,i)=>card(q,i,'Ex ')).join('')}</details>
<h2>✍️ Exercise questions (with steps)</h2>${u.q.map((q,i)=>card(q,i,'Q')).join('')}`}
else{sc=0;tot=0;h=`<h1>🧪 Practice Test</h1><p>28 new questions. Tap an option: the answer and explanation appear right away.</p><div class="bar" id="sc">Score: 0 / 0 answered</div>${P.map((q,i)=>`<div class="q" id="p${i}"><h4><span class="pn">${q[4]} · Q${i+1}.</span> ${q[0]}</h4>${q[1].map((o,j)=>`<button class="opt" onclick="pick(${i},${j})">${L[j]}) ${o}</button>`).join('')}<div class="ans" style="display:none"></div></div>`).join('')}<button onclick="show()">🔄 Restart test</button>`}
h+=`<br><button onclick="location.hash=${cur-1}" ${cur?'':'disabled'}>◀ Previous</button><button onclick="location.hash=${cur+1}" ${cur<U.length?'':'disabled'}>Next ▶</button>`;
$('#main').innerHTML=h;const r=$('#rv');if(r)r.onchange=e=>{done[cur]=e.target.checked;try{localStorage.setItem('apDone',JSON.stringify(done))}catch(x){}menu()};menu();scrollTo(0,0)}
function pick(i,j){const q=P[i],d=$('#p'+i);if(d.dataset.k)return;d.dataset.k=1;const b=d.querySelectorAll('.opt');b[q[2]].classList.add('right');if(j!=q[2])b[j].classList.add('wrong');
tot++;if(j==q[2])sc++;const a=d.querySelector('.ans');a.style.display='block';a.innerHTML=`<b>${j==q[2]?'🎉 Correct!':'❌ Wrong.'} Answer: ${L[q[2]]}) ${q[1][q[2]]}</b><div class="ex">${q[3]}</div>`;
$('#sc').textContent=`Score: ${sc} / ${tot} answered (of ${P.length})`+(tot==P.length?` — ${sc>=P.length*.8?'Excellent!':sc>=P.length*.5?'Good, revise the missed ones.':'Revise the units again.'}`:'')}
addEventListener('hashchange',show);show();
