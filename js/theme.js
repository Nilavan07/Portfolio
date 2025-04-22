
const themeToggle     = document.querySelector('.theme-toggle');
const themeToggleBall = document.querySelector('.toggle-ball');
const html            = document.documentElement;


const savedTheme = localStorage.getItem('theme') ||
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (window.innerWidth >= 768 && savedTheme === 'dark') {
  html.setAttribute('data-theme', 'dark');
  themeToggleBall.style.transform = 'translateX(30px)';
} else {
  html.setAttribute('data-theme', 'light');
}


themeToggle.addEventListener('click', function() {
  if (window.innerWidth < 768) return;      

  const currentTheme = html.getAttribute('data-theme');
  const newTheme     = currentTheme === 'light' ? 'dark' : 'light';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  themeToggleBall.style.transform =
    newTheme === 'dark' ? 'translateX(30px)' : 'translateX(0)';
});


const primaryButtons = document.querySelectorAll('.btn-primary');
primaryButtons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    cursor.style.backgroundColor       = 'white';
    cursorFollower.style.borderColor   = 'white';
  });
  button.addEventListener('mouseleave', () => {
    cursor.style.backgroundColor       = 'var(--primary-color)';
    cursorFollower.style.borderColor   = 'var(--primary-color)';
  });
});
