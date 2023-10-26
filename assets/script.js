const menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog',
    href: '/catalog',
    subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ],
  },
  {
    text: 'orders',
    href: '/orders',
    subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ],
  },
  {
    text: 'account',
    href: '/account',
    subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ],
  },
];

const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>SEI Rocks!</h1>';
mainEl.classList.add('flex-ctr');

const topMenuEl = document.querySelector('#top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

menuLinks.forEach(link => {
  const aElement = document.createElement('a');
  aElement.href = link.href;
  aElement.textContent = link.text;
  topMenuEl.appendChild(aElement);
});

const subMenuEl = document.querySelector('#sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

const topMenuLinks = topMenuEl.querySelectorAll('a');
let showingSubMenu = false;

topMenuEl.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.tagName !== 'A') return;
  const clickedLink = e.target;

  if (clickedLink.classList.contains('active')) {
    clickedLink.classList.remove('active');
    showingSubMenu = false;
    subMenuEl.style.top = '0';
    return;
  }

  topMenuLinks.forEach(link => link.classList.remove('active'));
  clickedLink.classList.add('active');
  showingSubMenu = link.subLinks && link.subLinks.length > 0; // Check if subLinks exist

  if (showingSubMenu) {
    buildSubMenu(clickedLink.subLinks);
    subMenuEl.style.top = '100%';
  } else {
    subMenuEl.style.top = '0';
  }

  if (clickedLink.textContent === 'about') {
    mainEl.innerHTML = '<h1>about</h1>';
  }
});

subMenuEl.addEventListener('click', (e) => {
  e.preventDefault();
  showingSubMenu = false;
  subMenuEl.style.top = '0';
  topMenuLinks.forEach(link => link.classList.remove('active'));
  mainEl.innerHTML = `<h1>${e.target.textContent}</h1>`;
});

function buildSubMenu(subLinks) {
  subMenuEl.innerHTML = '';
  subLinks.forEach(link => {
    const aElement = document.createElement('a');
    aElement.href = link.href;
    aElement.textContent = link.text;
    subMenuEl.appendChild(aElement);
  });
}
