// Static GitHub Pages: local appreciation, not a global visitor count.
const likeCount = document.getElementById('like-count');
const likeNote = document.getElementById('like-note');
try {
  localStorage.setItem('linqi-homepage-liked', 'true');
  likeCount.textContent = '1';
  likeNote.textContent = '已点赞 · 谢谢你来';
  likeCount.parentElement.title = '本浏览器已自动点赞；此数字不是全站累计点赞数。';
} catch {
  likeCount.textContent = '♡';
  likeNote.textContent = '谢谢你来';
}
const avatar = document.querySelector('.avatar');
avatar.addEventListener('error', () => avatar.classList.add('is-unavailable'));
if (avatar.complete && !avatar.naturalWidth) avatar.classList.add('is-unavailable');
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const layer = document.getElementById('petals');
  for (let i = 0; i < 12; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = i % 3 === 0 ? '♡' : '✧';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.fontSize = `${10 + Math.random() * 12}px`;
    petal.style.animationDuration = `${14 + Math.random() * 15}s`;
    petal.style.animationDelay = `-${Math.random() * 25}s`;
    layer.appendChild(petal);
  }
}

const navigation = document.querySelector('.side-navigation');
const navToggle = document.querySelector('.nav-toggle');
function closeNavigation() {
  navigation.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}
navToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
});
function revealSection() {
  const target = document.getElementById(location.hash.slice(1));
  if (target && target.tagName === 'DETAILS') target.open = true;
  navigation.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.hash === (location.hash || '#home')) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
navigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  if (link.hash) {
    const target = document.getElementById(link.hash.slice(1));
    if (target && target.tagName === 'DETAILS') target.open = true;
  }
  closeNavigation();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeNavigation();
    navToggle.focus();
  }
});
window.addEventListener('hashchange', revealSection);
revealSection();
