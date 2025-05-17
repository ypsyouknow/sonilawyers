// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 50
});

// Navbar Scroll Effect (Shadow on Scroll) and Auto-Hide on Mobile
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const mobileThreshold = 768; // Breakpoint for mobile
const scrollThreshold = 100; // Scroll distance before hiding

window.addEventListener('scroll', () => {
  // Add shadow when scrolled
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Auto-hide navbar on mobile
  if (window.innerWidth < mobileThreshold) {
    let currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold) {
      // Scrolling down: Hide navbar
      navbar.style.transform = 'translateY(-100%)';
      navbar.style.transition = 'transform 0.3s ease';
    } else {
      // Scrolling up: Show navbar
      navbar.style.transform = 'translateY(0)';
      navbar.style.transition = 'transform 0.3s ease';
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Prevent negative scroll values
  } else {
    // Ensure navbar is visible on larger screens
    navbar.style.transform = 'translateY(0)';
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
});

// Close Mobile Menu on Outside Click
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && mobileMenu.style.display === 'block') {
    mobileMenu.style.display = 'none';
  }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenu.style.display = 'none';
    const target = document.querySelector(anchor.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Form Validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const inputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    service: document.getElementById('service'),
    message: document.getElementById('message')
  };

  const errors = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    phone: document.getElementById('phone-error'),
    service: document.getElementById('service-error'),
    message: document.getElementById('message-error')
  };

  const validateForm = () => {
    let isValid = true;

    // Name
    if (!inputs.name.value.trim()) {
      inputs.name.classList.add('error');
      errors.name.classList.add('show');
      isValid = false;
    } else {
      inputs.name.classList.remove('error');
      errors.name.classList.remove('show');
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email.value.trim())) {
      inputs.email.classList.add('error');
      errors.email.classList.add('show');
      isValid = false;
    } else {
      inputs.email.classList.remove('error');
      errors.email.classList.remove('show');
    }

    // Phone
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(inputs.phone.value.trim())) {
      inputs.phone.classList.add('error');
      errors.phone.classList.add('show');
      isValid = false;
    } else {
      inputs.phone.classList.remove('error');
      errors.phone.classList.remove('show');
    }

    // Service
    if (!inputs.service.value) {
      inputs.service.classList.add('error');
      errors.service.classList.add('show');
      isValid = false;
    } else {
      inputs.service.classList.remove('error');
      errors.service.classList.remove('show');
    }

    // Message
    if (!inputs.message.value.trim()) {
      inputs.message.classList.add('error');
      errors.message.classList.add('show');
      isValid = false;
    } else {
      inputs.message.classList.remove('error');
      errors.message.classList.remove('show');
    }

    return isValid;
  };

  // Real-time Validation
  Object.values(inputs).forEach(input => {
    input.addEventListener('input', () => {
      if (input.id === 'name' && input.value.trim()) {
        input.classList.remove('error');
        errors.name.classList.remove('show');
      }
      if (input.id === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        input.classList.remove('error');
        errors.email.classList.remove('show');
      }
      if (input.id === 'phone' && /^\+?\d{10,15}$/.test(input.value.trim())) {
        input.classList.remove('error');
        errors.phone.classList.remove('show');
      }
      if (input.id === 'service' && input.value) {
        input.classList.remove('error');
        errors.service.classList.remove('show');
      }
      if (input.id === 'message' && input.value.trim()) {
        input.classList.remove('error');
        errors.message.classList.remove('show');
      }
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Thank you for your message. We will contact you shortly.');
      contactForm.reset();
    }
  });
}

// Lazy Load Images
const images = document.querySelectorAll('img[loading="lazy"]');
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.src;
        observer.unobserve(img);
      }
    });
  });
  images.forEach(img => observer.observe(img));
}
