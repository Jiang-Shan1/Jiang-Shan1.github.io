const projects = [
 {id:'grasp',title:'手势识别与工件抓取',category:'vision',label:'视觉交互',en:'GESTURE TO ACTION',description:'将手势交互与工件抓取连接起来，展示从人的动作输入到机器人执行的实验过程。',points:['手势输入与机器人动作的关联','工件抓取任务的实际执行']},
 {id:'gluing',title:'机器人涂胶项目',category:'engineering',label:'工程实践',en:'ROBOTIC APPLICATION',description:'面向涂胶任务的机器人应用实践，通过现场视频呈现设备运动与作业过程。',points:['机器人涂胶任务的执行流程','实际应用场景中的设备运行']},
 {id:'scope',title:'灵巧手示波器按键',category:'dexterity',label:'灵巧操作',en:'PRECISION MANIPULATION',description:'面向真实设备的按键操作，观察灵巧手与小尺寸目标之间的接触和动作执行。',points:['手指对按键目标的操作','真实设备上的精细交互过程']},
 {id:'competition',title:'中国机器人及人工智能大赛',category:'engineering',label:'工程实践',en:'COMPETITION PRACTICE',description:'第二十七届中国机器人及人工智能大赛相关项目演示，记录竞赛场景下的系统实践。',points:['竞赛项目的运行过程','系统在实际任务中的演示表现']},
 {id:'hamer',title:'HaMeR 模型手势识别',category:'vision',label:'视觉交互',en:'HAND POSE PERCEPTION',description:'基于 HaMeR 模型的手势识别实验，展示手部动作的视觉感知效果。',points:['模型对手部动作的识别表现','不同手势变化下的可视化结果']},
 {id:'wuji',title:'Wuji Hand 动作演示',category:'dexterity',label:'灵巧操作',en:'DEXTEROUS HAND',description:'记录 Wuji Hand 灵巧手的动作实验，展示手指姿态变化与动作执行。',points:['灵巧手的手指运动','不同动作状态下的姿态变化']},
 {id:'single',title:'单相机猜拳系统',category:'vision',label:'视觉交互',en:'SINGLE-CAMERA INTERACTION',description:'以猜拳为交互场景，展示单相机方案下的手势识别与系统响应。',points:['猜拳手势的视觉输入','单相机交互系统的运行效果']},
];
const grid=document.querySelector('#project-grid');
grid.innerHTML=projects.map((p,i)=>`<article class="project" data-category="${p.category}"><button class="project-media" data-project="${p.id}" aria-label="播放${p.title}演示"><img loading="lazy" src="assets/${p.id}.jpg" alt="${p.title}实验视频封面" width="800" height="500"><span class="play-small" aria-hidden="true">▶</span></button><div class="project-meta"><span>${String(i+1).padStart(2,'0')} / ${p.en}</span><span>${p.label}</span></div><h3><button data-project="${p.id}">${p.title}<span aria-hidden="true">↗</span></button></h3><p>${p.description}</p></article>`).join('');
const dialog=document.querySelector('#project-dialog'),video=document.querySelector('#detail-video');
let opener;
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
 const p=projects.find(p=>p.id===button.dataset.project);opener=button;
 document.querySelector('#dialog-title').textContent=p.title;
 document.querySelector('#dialog-category').textContent=p.label+' / 项目演示'+(['scope','gluing','competition'].includes(p.id)?' · 2 倍速':'');
 document.querySelector('#dialog-number').textContent=p.en;
 document.querySelector('#dialog-description').textContent=p.description;
 document.querySelector('#dialog-points').innerHTML=p.points.map(point=>`<li>${point}</li>`).join('');
 video.src=`assets/${p.id}${['scope','gluing','competition'].includes(p.id)?'-2x':''}.mp4`;video.poster=`assets/${p.id}.jpg`;

 dialog.showModal();document.body.classList.add('modal-open');video.play().catch(()=>{});
}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{video.pause();video.removeAttribute('src');video.load();document.body.classList.remove('modal-open');opener?.focus();});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{const selected=b===button;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});
 let count=0;document.querySelectorAll('.project').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});
 document.querySelector('#result-count').textContent=count+' 个项目';
}));
document.querySelector('#copy-email').addEventListener('click',async()=>{
 const status=document.querySelector('#copy-status');
 try{await navigator.clipboard.writeText('js13345593291@163.com');status.textContent='邮箱已复制。';}
 catch{status.textContent='请长按或选中上方邮箱地址复制。';}
});

video.addEventListener('contextmenu',event=>event.preventDefault());
