const screens = {
  opening: document.getElementById('opening'),
  letter: document.getElementById('letter'),
  messages: document.getElementById('messages'),
  final: document.getElementById('final')
};
const music = document.getElementById('music');
const pill = document.getElementById('musicPill');
const messages = [
  "you know what? i still can't believe i get to call you mine. my favourite person, my favourite problem, my favourite everything.",
  "if loving you is a little silly, then i don't wanna be sensible ever again. i just wanna keep choosing you, annoying you, loving you, and calling you my tukda for as long as you'll let me.",
  "and if i could make one wish for today, it wouldn't even be anything fancy. i'd just wish for more mornings with you, more stupid little conversations, more memories, and a whole lot more us."
];
let messageIndex = 0;

function go(from, to) {
  from.classList.add('fade-out');
  setTimeout(() => {
    from.classList.add('hidden');
    from.classList.remove('fade-out');
    to.classList.remove('hidden');
    to.style.opacity = '0';
    to.style.transform = 'translateY(12px)';
    requestAnimationFrame(() => {
      to.style.transition = 'opacity .8s ease, transform .8s ease';
      to.style.opacity = '1';
      to.style.transform = 'translateY(0)';
    });
    window.scrollTo({top:0, behavior:'smooth'});
  }, 700);
}

document.getElementById('openBtn').addEventListener('click', async () => {
  music.volume = 0.42;
  try { await music.play(); pill.classList.add('visible'); } catch(e) {}
  go(screens.opening, screens.letter);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  document.getElementById('message').textContent = messages[messageIndex];
  document.getElementById('message').classList.remove('show');
  void document.getElementById('message').offsetWidth;
  document.getElementById('message').classList.add('show');
  go(screens.letter, screens.messages);
});

document.getElementById('messageBtn').addEventListener('click', () => {
  messageIndex++;
  if (messageIndex < messages.length) {
    const box = document.getElementById('message');
    box.classList.remove('show');
    void box.offsetWidth;
    box.textContent = messages[messageIndex];
    box.classList.add('show');
  } else {
    go(screens.messages, screens.final);
  }
});
