// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeToggleBall = document.querySelector('.toggle-ball');
const html = document.documentElement;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
html.setAttribute('data-theme', savedTheme);
if (savedTheme === 'dark') {
    themeToggleBall.style.transform = 'translateX(30px)';
}

// Theme toggle event
themeToggle.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
        themeToggleBall.style.transform = 'translateX(30px)';
    } else {
        themeToggleBall.style.transform = 'translateX(0)';
    }
});
        // Special effect for primary buttons
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            cursor.style.backgroundColor = 'white';
            cursorFollower.style.borderColor = 'white';
        });
        
        button.addEventListener('mouseleave', function() {
            cursor.style.backgroundColor = 'var(--primary-color)';
            cursorFollower.style.borderColor = 'var(--primary-color)';
        });
    });
