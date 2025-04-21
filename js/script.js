document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu');
  const navMenu = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');
  
  mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });
  
  // Active nav link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        card.style.display = 'none';
        
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        }
      });
    });
  });
  
  // Skills tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.skills-tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Update active button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding content
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.getAttribute('data-content') === tabId) {
          content.classList.add('active');
        }
      });
    });
  });
  
  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });
  
  // Preloader
  const preloader = document.querySelector('.preloader');
  
  window.addEventListener('load', function() {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 1000);
  });
  
  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const animateOnScroll = function() {
    animateElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animated');
      }
    });
  };
  
  // Run once on page load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Initialize all elements as animate-on-scroll
  document.querySelectorAll('section').forEach(section => {
    const content = section.querySelector('.container');
    if (content) {
      content.classList.add('animate-on-scroll');
    }
  });
// ===== EMAILJS INITIALIZATION =====
// Must be called before any emailjs.send() calls
emailjs.init('sviRmpKsnEq38plf2'); // Get this from EmailJS Dashboard > Account > API Keys

// ===== CONTACT FORM HANDLER =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form elements
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';
    
    // Prepare form data - matches your template variables
    const templateParams = {
      name: contactForm.name.value,       // Matches {{name}} in template
      email: contactForm.email.value,     // Matches {{email}} in template
      subject: contactForm.subject.value || '(No subject)', // Matches {{subject}}
      message: contactForm.message.value, // Matches {{message}} in template
      time: new Date().toLocaleString()   // Matches {{time}} in template
    };
    
    // Basic validation
    if (!templateParams.name || !templateParams.email || !templateParams.message) {
      formStatus.textContent = 'Please fill all required fields';
      formStatus.classList.add('error');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      return;
    }
    
    // Send email using EmailJS
    emailjs.send('service_a0rjk63', 'template_3vb5edq', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        
        // Success message
        formStatus.textContent = 'Message sent successfully!';
        formStatus.classList.add('success');
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }, 5000);
      }, function(error) {
        console.error('FAILED...', error);
        
        // Detailed error handling
        let errorMessage = 'Failed to send message. Please try again.';
        
        if (error.text.includes('Invalid user ID') || error.text.includes('Public Key is invalid')) {
          errorMessage = 'Configuration error. Please check your EmailJS setup.';
        } else if (error.text.includes('Service not found')) {
          errorMessage = 'Email service not configured. Check your service ID.';
        } else if (error.text.includes('Template not found')) {
          errorMessage = 'Email template not found. Check your template ID.';
        } else if (error.text.includes('Limit exceeded')) {
          errorMessage = 'Email limit reached. Try again later.';
        }
        
        formStatus.textContent = errorMessage;
        formStatus.classList.add('error');
      })
      .finally(() => {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
  });
}
});