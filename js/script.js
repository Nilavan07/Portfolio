document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu 
  const mobileMenuBtn = document.querySelector('.mobile-menu');
  const navMenu = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');
  
  mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
  
  
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
  
  
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
    });
  });
  
  // Skills tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.skills-tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      
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
  
  
  const preloader = document.querySelector('.preloader');
  
  window.addEventListener('load', function() {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 1000);
  });
  
  
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
  
  
  animateOnScroll();
  
  
  window.addEventListener('scroll', animateOnScroll);
  
  
  document.querySelectorAll('section').forEach(section => {
    const content = section.querySelector('.container');
    if (content) {
      content.classList.add('animate-on-scroll');
    }
  });
// EMAILJS INITIALIZATION 
emailjs.init('sviRmpKsnEq38plf2');

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';
    
    
    const templateParams = {
      name: contactForm.name.value,       
      email: contactForm.email.value,     
      subject: contactForm.subject.value || '(No subject)', 
      message: contactForm.message.value, 
      time: new Date().toLocaleString()   
    };
    
    
    if (!templateParams.name || !templateParams.email || !templateParams.message) {
      formStatus.textContent = 'Please fill all required fields';
      formStatus.classList.add('error');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      return;
    }
    
    
    emailjs.send('service_a0rjk63', 'template_3vb5edq', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        
        
        formStatus.textContent = 'Message sent successfully!';
        formStatus.classList.add('success');
        contactForm.reset();
        
        
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }, 5000);
      }, function(error) {
        console.error('FAILED...', error);
        
        
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
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
  });
}
});