const likeButton = document.getElementById('like-button');
const likeFeedback = document.getElementById('like-feedback');
const portrait = document.querySelector('.avatar-link');
// Render the message outside the scrollable profile so it cannot be clipped.
document.body.appendChild(likeFeedback);
function positionLikeFeedback() {
  const bounds = likeButton.getBoundingClientRect();
  const width = likeFeedback.offsetWidth;
  const left = Math.max(8, Math.min(bounds.right + 8, window.innerWidth - width - 8));
  likeFeedback.style.setProperty('--feedback-left', `${left}px`);
  likeFeedback.style.setProperty('--feedback-top', `${bounds.top + bounds.height / 2}px`);
}
window.addEventListener('resize', positionLikeFeedback);
window.addEventListener('scroll', positionLikeFeedback, true);
let feedbackTimer;
likeButton.addEventListener('click', () => {
  clearTimeout(feedbackTimer);
  likeFeedback.textContent = '谢谢喜欢';
  positionLikeFeedback();
  likeButton.classList.add('is-loved');
  likeFeedback.classList.add('is-visible');
  portrait.classList.add('is-liked');
  feedbackTimer = setTimeout(() => {
    likeFeedback.classList.remove('is-visible');
    likeButton.classList.remove('is-loved');
    portrait.classList.remove('is-liked');
    likeFeedback.textContent = '';
  }, 2200);
});
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




