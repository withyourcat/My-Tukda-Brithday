const $=s=>document.querySelector(s);const screens=[...document.querySelectorAll('.screen')];const music=$('#music');const pill=$('#musicPill');
const letterLines=[
"happy birthday to the person who somehow became such a huge part of my little world.",
"you never really liked birthdays, and maybe that's why i wanted this one to feel a little different.",
"because since the 11th of march, ordinary days haven't felt quite so ordinary to me anymore.",
"somewhere between our conversations and all the tiny moments, you became someone i can't imagine my days without.",
"now even the smallest things feel special, simply because they're things i get to share with you.",
"i hope today feels soft and warm, and i hope you let yourself be celebrated, even if birthdays were never really your thing.",
"take a breath. you are loved. probably much more than you realise.",
"smile now. yes, i'm telling you to smile. don't argue with your musie.",
"tsk. don't cry silly. come here. i'm giving you the biggest hug right now.",
"mwahh kiths. consider that your official birthday kiss from me.",
"and whatever this next year brings, i just want more mornings, more conversations, more memories, and more us.",
"so here's my tiny little birthday wish: i hope you keep finding reasons to smile, and i hope i get to be one of them.",
"you're stuck with your musie now. no returns, no exchanges. ♡"
];
const messages=[
["take a breath.","yes, i'm serious. just breathe and let yourself be loved."],
["smile now.","there. that's my favourite version of you."],
["tsk. don't cry silly.","come here. i'm stealing a hug before you can escape."],
["mwahh kiths ♡","one tiny birthday kiss. okay fine... maybe more than one."],
["hugs you silly.","squeezing you until all the birthday grumpiness disappears."],
["look at you.","someone who used to not like birthdays somehow became my favourite person to celebrate."],
["happy birthday, my tukda.","and yes... this whole little thing was made just for you."]];
function go(a,b){a.classList.remove('active');setTimeout(()=>{a.classList.add('hidden');b.classList.remove('hidden');requestAnimationFrame(()=>b.classList.add('active'))},350)}
function pop(x,y){const h=document.createElement('span');h.className='heart-pop';h.textContent=['♡','✦','♥'][Math.floor(Math.random()*3)];h.style.left=x+'px';h.style.top=y+'px';document.body.appendChild(h);setTimeout(()=>h.remove(),1200)}
let letterStarted=false,letterIndex=0;let messageIndex=0;const totalMs=45000;const interval=totalMs/letterLines.length;
function showLetterLine(){if(letterIndex>=letterLines.length){$('#letterCue').textContent='swipe up when you are ready ♡';return}const p=document.createElement('p');p.textContent=letterLines[letterIndex];$('#letterText').replaceChildren(p);letterIndex++;$('#progress').style.width=(letterIndex/letterLines.length*100)+'%';setTimeout(showLetterLine,interval)}
function startLetter(){if(letterStarted)return;letterStarted=true;showLetterLine();let t=0;const timer=setInterval(()=>{t+=250;const s=Math.min(45,Math.floor(t/1000));$('#letterTimer').textContent=`0:${String(s).padStart(2,'0')}`;if(t>=45000)clearInterval(timer)},250)}
$('#openBtn').onclick=async e=>{pop(e.clientX,e.clientY);music.volume=.42;try{await music.play();pill.classList.add('show')}catch{}go($('#opening'),$('#letter'));setTimeout(startLetter,500)};
function showMessage(){const m=messages[messageIndex];$('#count').textContent=messageIndex+1;$('#message').classList.remove('in');void $('#message').offsetWidth;$('#message').textContent=m[0];$('#message').classList.add('in');$('#messageTiny').textContent=m[1];if(messageIndex===messages.length-1)$('#nextMessage').innerHTML='reveal ♡';else $('#nextMessage').innerHTML='next ♡'}
function enterMessages(){showMessage();go($('#letter'),$('#messages'))}
function nextMessage(){if(messageIndex<messages.length-1){messageIndex++;showMessage()}else go($('#messages'),$('#final'))}
$('#nextMessage').onclick=e=>{pop(e.clientX,e.clientY);nextMessage()};$('#again').onclick=()=>{location.reload()};
function gesture(el,dir,callback){let sx=0,sy=0;el.addEventListener('touchstart',e=>{sx=e.changedTouches[0].clientX;sy=e.changedTouches[0].clientY},{passive:true});el.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(dir==='up'&&dy<-55&&Math.abs(dy)>Math.abs(dx))callback();if(dir==='left'&&dx<-55&&Math.abs(dx)>Math.abs(dy))callback()},{passive:true});let mx=0,my=0,down=false;el.addEventListener('pointerdown',e=>{down=true;mx=e.clientX;my=e.clientY});el.addEventListener('pointerup',e=>{if(!down)return;down=false;const dx=e.clientX-mx,dy=e.clientY-my;if(dir==='up'&&dy<-55&&Math.abs(dy)>Math.abs(dx))callback();if(dir==='left'&&dx<-55&&Math.abs(dx)>Math.abs(dy))callback()})}
gesture($('#letterCard'),'up',enterMessages);gesture($('#messageCard'),'left',nextMessage);
document.addEventListener('keydown',e=>{if($('#letter').classList.contains('active')&&['ArrowUp',' '].includes(e.key))enterMessages();else if($('#messages').classList.contains('active')&&['ArrowLeft',' '].includes(e.key))nextMessage()});
$('#musicToggle').onclick=()=>{if(music.paused){music.play();$('#musicToggle').textContent='Ⅱ'}else{music.pause();$('#musicToggle').textContent='▶'}};
document.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;pop(e.clientX,e.clientY)});
