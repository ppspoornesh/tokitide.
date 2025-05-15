// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 2500);
});

// Smooth Scroll with Page Transition
document.querySelectorAll('.nav-link, .back-to-top').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageTransition = document.querySelector('.page-transition');
    pageTransition.classList.add('active');
    setTimeout(() => {
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      setTimeout(() => {
        pageTransition.classList.remove('active');
      }, 500);
    }, 500);
  });
});

// Fade-In Scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(el => appearOnScroll.observe(el));

// Back-to-Top and Order-Fab Button Visibility
const backToTop = document.querySelector('.back-to-top');
const orderFab = document.querySelector('.order-fab');
window.addEventListener('scroll', () => {
  const shouldShow = window.scrollY > 400;
  backToTop.style.display = shouldShow ? 'block' : 'none';
  orderFab.style.display = shouldShow ? 'block' : 'none';
});

// Like Button Animation
document.querySelectorAll('.like-btn').forEach(btn => {
  const id = btn.getAttribute('aria-label');
  btn.classList.toggle('liked', localStorage.getItem(id) === 'liked');
  btn.addEventListener('click', () => {
    const isLiked = btn.classList.toggle('liked');
    localStorage.setItem(id, isLiked ? 'liked' : '');
    if (isLiked && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const particles = ['particle-1', 'particle-2', 'particle-3'];
      particles.forEach(particleClass => {
        if (!btn.querySelector(.${particleClass})) {
          const particle = document.createElement('span');
          particle.className = particleClass;
          btn.appendChild(particle);
        }
      });
    }
  });
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const isActive = hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isActive);
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Swiper Initialization for Products
const productSwiper = new Swiper('.swiper-container:not(.reviews-swiper)', {
  slidesPerView: 1,
  spaceBetween: 30,
  grabCursor: true,
  loop: true,
  centeredSlides: true, // Center slides on mobile
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false, // Side-by-side on tablets
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: false, // Side-by-side on desktops
    },
  },
});

// Swiper Initialization for Reviews
const reviewsSwiper = new Swiper('.reviews-swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

// Add Custom Arrows
document.querySelectorAll('.swiper-container').forEach(container => {
  const prevArrow = document.createElement('div');
  prevArrow.className = 'swiper-button-prev-custom';
  prevArrow.innerHTML = '←';
  prevArrow.setAttribute('aria-label', container.classList.contains('reviews-swiper') ? 'Previous review' : 'Previous slide');
  const nextArrow = document.createElement('div');
  nextArrow.className = 'swiper-button-next-custom';
  nextArrow.innerHTML = '→';
  nextArrow.setAttribute('aria-label', container.classList.contains('reviews-swiper') ? 'Next review' : 'Next slide');
  
  const swiperInstance = container.swiper;
  prevArrow.addEventListener('click', () => swiperInstance.slidePrev());
  nextArrow.addEventListener('click', () => swiperInstance.slideNext());
  
  container.appendChild(prevArrow);
  container.appendChild(nextArrow);
});

// Order Button Animation
document.querySelectorAll('[data-order-btn]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const href = btn.getAttribute('href');
    btn.classList.add('order-animating');
    setTimeout(() => {
      btn.classList.remove('order-animating');
      window.open(href, '_blank');
    }, 1000);
  });
});

// Staggered Step Card Animation
const stepCards = document.querySelectorAll('.step-card');
const stepOptions = { threshold: 0.3 };
const stepObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, stepOptions);
stepCards.forEach(card => stepObserver.observe(card));

// Model and Review Card Animation with Stagger
const modelCards = document.querySelectorAll('.model-card, .review-card');
const modelOptions = { threshold: 0.5 };
const modelObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (!entry.isIntersecting) return;
    const card = entry.target;
    card.classList.add('visible');
    const staggerIndex = (index % 3) + 1;
    card.setAttribute('data-stagger', staggerIndex);
    observer.unobserve(card);
  });
}, modelOptions);
modelCards.forEach(card => modelObserver.observe(card));
