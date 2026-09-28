
const D=window.BOTSWANA_DATA;
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const path=()=>decodeURIComponent(location.hash.replace(/^#\/?/,'').replace(/\/$/,''))||'';
const navs=[['首页',''],['体验','experience'],['探索','explore'],['住宿','stay'],['旅游信息','travel']];
const intro={
 explore:['探索我们的荒野','惊叹美景，感受辽阔，远离喧嚣，亲近野生动物。博茨瓦纳，非洲最后的秘境。'],
 experience:['沉浸于我们的惊险体验','无论你喜欢的是游猎、乘莫科罗独木舟、四轮全地形车、钓鱼还是四驱越野探险，你都一定能在博茨瓦纳度过最精彩的时光。'],
 stay:['入住博茨瓦纳，自在如归家','博茨瓦纳为游客提供丰富多样的住宿选择，既有顶级酒店、豪华度假小屋与游猎营地，也有平价民宿和露营地。'],
 travel:['旅行需知','原生旷野，野性难驯。博茨瓦纳，留存着大自然壮阔的生命华章。']
};
const im=x=>`<img src="${esc(x)}" alt="" loading="lazy">`;
function nav(active=''){
 return `<header id="nav" class="nav ${active?'solid':''}">
  <a class="brand" href="#/"><span class="mark">BT</span>BOTSWANA</a>
  <nav class="navlinks">${navs.map(n=>`<a class="${active===n[1]?'active':''}" href="#/${n[1]}">${n[0]}</a>`).join('')}</nav>
  <div class="nav-actions"><button class="iconbtn" onclick="openSearch()">⌕</button><button class="iconbtn menu" onclick="toggleMenu()">☰</button></div>
 </header>`;
}
function footer(){return `<footer class="footer"><div class="footergrid"><div><div class="footerbrand">博茨瓦纳旅游局</div><p>原生旷野 · 非洲秘境</p></div><div><p>费尔斯佩斯区，70667号地块</p><p>费尔格朗兹办公园区</p><p>1A和1B栋，2楼（东翼）</p><p>博茨瓦纳哈博罗内</p></div><div><p>电话：+267 391 3111</p><p>传真：+267 395 6810</p><p>邮箱：marketing@botswanatourism.co.bw</p></div></div><div class="footbottom"><span>© Botswana Tourism Organisation</span><span>中文目的地网站框架</span></div></footer>`}
function shell(main,active=''){return `${nav(active)}<main>${main}</main>${footer()}<button id="back" class="back" onclick="scrollTo({top:0,behavior:'smooth'})">↑</button><div id="search" class="search"><div><button class="search-close" onclick="closeSearch()">×</button><input id="searchInput" placeholder="搜索目的地、体验、住宿或旅行信息…" oninput="doSearch(this.value)"><div id="results" class="results"></div></div></div>`}
function home(){
 const I=D.images;
 const heroCards=I.homeTiles.map((x,i)=>`<img class="hero-card" style="--i:${i}" src="${x}" alt="博茨瓦纳野生动物">`).join('');
 const cards=[
  ['探索','探索我们的荒野','惊叹美景，感受辽阔，远离喧嚣，亲近野生动物。博茨瓦纳，非洲最后的秘境。','explore',D.explore.find(x=>x.id==='奥卡万戈三角洲')?.images[0]||I.homeBase],
  ['体验','沉浸于我们的惊险体验','无论你喜欢的是游猎、乘莫科罗独木舟、四轮全地形车、钓鱼还是四驱越野探险，你都一定能在博茨瓦纳度过最精彩的时光。','experience',D.experience[3]?.image||I.homeBase],
  ['住宿','入住博茨瓦纳，自在如归家','博茨瓦纳为游客提供丰富多样的住宿选择，既有顶级酒店、豪华度假小屋与游猎营地，也有平价民宿和露营地。','stay',D.stay[0]?.images[0]||I.homeBase]
 ];
 const f=cards.map(c=>`<a class="feature reveal" href="#/${c[3]}"><div class="feature-img">${im(c[4])}</div><div class="feature-copy"><h3>${c[1]}</h3><p>${c[2]}</p></div><span class="arrow">↗</span></a>`).join('');
 const t=D.travel.map((x,i)=>`<a class="info-card reveal" href="#/travel/${x.routeId}"><h3>${esc(x.title)}</h3><p>点击进入详情 →</p></a>`).join('');
 const reviews=D.reviews.map((r,i)=>`<article class="review ${i?'':'active'}"><div><div class="kicker">游客评价</div><h3>${esc(r.title)}</h3><div class="review-meta">${esc(r.name)} · ${esc(r.location)}</div></div><p>${esc(r.text)}</p></article>`).join('');
 return shell(`<section class="hero"><div class="hero-bg" style="background-image:url('${I.homeBase}')"></div><div class="hero-cards">${heroCards}</div><div class="hero-content"><div><div class="kicker">BOTSWANA TOURISM · 中文目的地</div><h1>博茨瓦纳<span>非洲秘境</span></h1></div></div><div class="hero-fg">${im(I.homeFg)}</div><div class="scroll"><i></i>向下探索</div></section>
 <section class="section"><div class="head"><div><div class="kicker">DISCOVER BOTSWANA</div><h2 class="title">在荒野中寻找<br>属于你的故事</h2></div><p class="intro">以原官网的信息节奏为参考，将“探索、体验、住宿、旅行信息”拆成清晰入口，再通过图文卡片进入更深层的详情内容。</p></div><div class="feature-grid">${f}</div></section>
 <section class="section" style="padding-top:20px"><div class="head"><div><div class="kicker">TRAVEL INFORMATION</div><h2 class="title">旅行信息</h2></div><p class="intro">从基础信息、交通和入境手续，到货币与物品申报，把出发前需要了解的内容集中整理。</p></div><div class="info-grid">${t}</div></section>
 <section class="reviews"><div class="kicker">TOURIST REVIEWS</div><h2 class="title" style="color:#fff;margin:8px 0 40px">游客评价</h2>${reviews}<div class="dots">${D.reviews.map((_,i)=>`<button class="${i?'':'active'}" onclick="reviewGo(${i})"></button>`).join('')}</div></section>`)}
function pageHero(title,desc){return `<section class="pagehero"><div class="kicker">BOTSWANA</div><h1>${esc(title)}</h1><p>${esc(desc)}</p></section>`}
function listing(type){
 const [title,desc]=intro[type],arr=type==='explore'?D.explore:type==='travel'?D.travel:D.stay;
 return shell(`${pageHero(title,desc)}<section class="section"><div class="toolbar"><input class="local-search" id="localSearch" placeholder="搜索${type==='explore'?'景点':type==='travel'?'旅行信息':'住宿'}名称…" oninput="filterCards(this.value)"><span>${arr.length} 项</span></div><div class="grid">${arr.map((x,i)=>{let p=`#/${type}/${x.routeId}`,pic=type==='stay'?x.images[0]:x.images[0];return `<a class="card reveal" data-title="${esc(x.title)}" href="${p}"><div class="card-img">${im(pic)}<span class="index">${String(i+1).padStart(2,'0')}</span></div><div class="card-copy"><h3>${esc(x.title)}</h3><p>点击进入详情 →</p></div></a>`}).join('')}</div></section>`,type)}
function experience(){
 const [title,desc]=intro.experience;
 return shell(`${pageHero(title,desc)}<section class="section"><div class="exp-layout"><div class="sticky"><div class="kicker">17 EXPERIENCES</div><h2 class="title">${title}</h2><p class="intro">${desc}</p><a class="brand" style="color:var(--green);margin-top:20px;display:inline-flex" href="#/explore">探索目的地 ↗</a></div><div class="carousel" id="carousel">${D.experience.map((x,i)=>`<article class="slide ${i?'':'active'}">${im(x.image)}<div class="slide-copy"><h3>${esc(x.title)}</h3><p>${esc(x.content[0]||'')}</p></div></article>`).join('')}<div class="controls"><button class="circle" onclick="expPrev()">←</button><button class="circle" onclick="expNext()">→</button></div></div></div><div class="exp-grid">${D.experience.map(x=>`<a class="exp-card reveal" href="#/experience/${x.routeId}">${im(x.image)}<span>${esc(x.title)}</span></a>`).join('')}</div></section>`,'experience')}
const subheads=new Set(['语言须知','电力说明须知','钻石选购须知','小费须知','应急电话','航空出行须知','陆路出行须知','大巴出行须知','铁路出行须知','市内出行须知','签证须知','行李限额须知','疫苗须知','海关须知','宠物入境须知','船只入境须知','驾照须知','机动车入境须知','货币','银行','信用卡','行李申报','消费品入境','植物入境','宠物入境','马蓬古布韦山','莫特拉巴能','所罗门墙']);
function prose(arr){let h='',list=[];const flush=()=>{if(list.length){h+=`<ul>${list.map(x=>`<li>${esc(x.replace(/^•\s*/,''))}</li>`).join('')}</ul>`;list=[]}};arr.forEach(t=>{if(t.startsWith('•')){list.push(t);return}flush();if(subheads.has(t)||t.startsWith('二级小标题：'))h+=`<div class="sub">${esc(t.replace('二级小标题：',''))}</div>`;else h+=`<p>${esc(t)}</p>`});flush();return h}
function visaTable(){let rows=[['阿富汗','阿塞拜疆','玻利维亚'],['阿尔巴尼亚','巴林','波斯尼亚和黑塞哥维那（波黑）'],['阿尔及利亚','孟加拉国','保加利亚'],['安哥拉','贝宁','布隆迪'],['中国','印度尼西亚','尼泊尔'],['哥伦比亚','伊朗','尼加拉瓜'],['哈萨克斯坦','帕劳','克罗地亚'],['朝鲜','巴拿马','捷克'],['科威特','菲律宾','吉布提'],['老挝','卡塔尔','厄瓜多尔'],['拉脱维亚','罗马尼亚','埃及'],['黎巴嫩','俄罗斯','萨尔瓦多'],['立陶宛','沙特阿拉伯','爱沙尼亚'],['泰国','土耳其','叙利亚'],['阿拉伯联合酋长国（阿联酋）','乌兹别克斯坦','越南'],['也门','','']];return `<table class="table">${rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table>`}
function detail(kind,id){
 const arr=kind==='explore'?D.explore:kind==='travel'?D.travel:kind==='stay'?D.stay:D.experience;const x=arr.find(a=>a.routeId===id);
 if(!x)return shell(`<div class="notfound"><div><h1>页面不存在</h1><a href="#/">返回首页</a></div></div>`);
 const images=x.images||[x.image],title=x.title;
 let body;
 if(kind==='stay'){let desc=x.content[0]||'',rest=x.content.slice(1),pairs=[];for(let i=0;i<rest.length;i+=2)if(rest[i+1])pairs.push([rest[i],rest[i+1]]);body=`<div class="prose"><p>${esc(desc)}</p></div><aside class="panel">${pairs.map(p=>`<div class="row"><div class="label">${esc(p[0])}</div><div class="value">${esc(p[1])}</div></div>`).join('')}</aside>`}
 else if(kind==='travel'&&x.id==='需签证国家及地区名单')body=`<div class="prose"><p>以下名单按提供的中文资料整理为便于浏览的三列名单。出行前请以博茨瓦纳官方最新要求为准。</p></div><div style="overflow:auto">${visaTable()}</div>`;
 else body=`<div class="prose">${prose(x.content)}</div>`;
 return shell(`<div class="crumb"><a href="#/${kind}">${kind==='explore'?'探索':kind==='experience'?'体验':kind==='stay'?'住宿':'旅游信息'}</a> / ${esc(title)}</div><section class="detailhero"><div class="detailhero-bg">${im(images[0])}</div><div><div class="eyebrow">${kind.toUpperCase()}</div><h1>${esc(title)}</h1></div></section><section class="detail"><div class="detail-layout">${body}<aside class="gallery">${images.map(im).join('')}</aside></div></section>`,kind)}
function render(){let p=path(),html;if(!p)html=home();else if(p==='experience')html=experience();else if(p==='explore'||p==='stay'||p==='travel')html=listing(p);else{let [k,id]=p.split('/');html=['experience','explore','stay','travel'].includes(k)?detail(k,id):shell(`<div class="notfound"><h1>找不到页面</h1></div>`)}$('#app').innerHTML=html;scrollTo(0,0);setTimeout(init,50)}
function init(){const n=$('#nav');if(n)window.onscroll=()=>{n.classList.toggle('solid',scrollY>35||!!path());$('#back')?.classList.toggle('show',scrollY>600)};const els=document.querySelectorAll('.reveal'),io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});els.forEach(e=>io.observe(e));startReviews();startExp()}
let rt,ri=0;function startReviews(){clearInterval(rt);if(!D.reviews.length)return;rt=setInterval(()=>reviewGo((ri+1)%D.reviews.length),6000)}function reviewGo(i){ri=i;document.querySelectorAll('.review').forEach((x,j)=>x.classList.toggle('active',j===i));document.querySelectorAll('.dots button').forEach((x,j)=>x.classList.toggle('active',j===i))}
let et,ei=0;function startExp(){clearInterval(et);if(!document.querySelector('.slide'))return;et=setInterval(expNext,5000)}function expGo(i){let s=document.querySelectorAll('.slide');if(!s.length)return;ei=(i+s.length)%s.length;s.forEach((x,j)=>x.classList.toggle('active',j===ei))}function expNext(){expGo(ei+1)}function expPrev(){expGo(ei-1)}
function toggleMenu(){$('#nav')?.classList.toggle('open')}function openSearch(){$('#search')?.classList.add('open');setTimeout(()=>$('#searchInput')?.focus(),50)}function closeSearch(){$('#search')?.classList.remove('open')}function filterCards(q){q=q.toLowerCase().trim();document.querySelectorAll('.card').forEach(c=>c.style.display=c.dataset.title.toLowerCase().includes(q)?'block':'none')}
function doSearch(q){let box=$('#results');if(!box)return;q=q.toLowerCase().trim();if(!q){box.innerHTML='';return}let all=[...D.explore.map(x=>({t:x.title,k:'探索',p:`#/explore/${x.routeId}`})),...D.experience.map(x=>({t:x.title,k:'体验',p:`#/experience/${x.routeId}`})),...D.stay.map(x=>({t:x.title,k:'住宿',p:`#/stay/${x.routeId}`})),...D.travel.map(x=>({t:x.title,k:'旅游信息',p:`#/travel/${x.routeId}`}))];let r=all.filter(x=>x.t.toLowerCase().includes(q)).slice(0,12);box.innerHTML=r.length?r.map(x=>`<a class="result" href="${x.p}" onclick="closeSearch()"><small>${x.k}</small>${esc(x.t)}</a>`).join(''):'<div style="color:white">没有找到相关内容</div>'}
addEventListener('hashchange',render);addEventListener('keydown',e=>{if(e.key==='Escape')closeSearch()});render();
