// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling with Parallax Effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Scroll Animation with Parallax
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .stat-item, .section-title, .contact-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });

    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
};

// Initial state for scroll animation
document.querySelectorAll('.skill-card, .project-card, .stat-item, .section-title, .contact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.5s ease';
});

// Progress Bar Animation with Gradient
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
            bar.style.background = `linear-gradient(90deg, var(--primary-color), var(--secondary-color))`;
        }, 500);
    });
};

// Typing Effect for Hero Text
// const typeWriter = () => {
//     const text = "Web Developer & Designer";
//     const heroText = document.querySelector('.hero p');
//     let i = 0;
    
//     if (heroText) {
//         heroText.textContent = '';
//         const typingInterval = setInterval(() => {
//             if (i < text.length) {
//                 heroText.textContent += text.charAt(i);
//                 i++;
//             } else {
//                 clearInterval(typingInterval);
//             }
//         }, 100);
//     }
// };

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skills')) {
                animateProgressBars();
            }
            if (entry.target.classList.contains('hero')) {
                typeWriter();
            }
        }
    });
}, {
    threshold: 0.1
});

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form Submission with Animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Animate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.style.transform = 'scale(0.95)';
        submitButton.style.backgroundColor = 'var(--secondary-color)';
        
        setTimeout(() => {
            submitButton.style.transform = 'scale(1)';
            submitButton.style.backgroundColor = 'var(--primary-color)';
            
            // Show success message with animation
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(-20px)';
            contactForm.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 100);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(-20px)';
                setTimeout(() => successMessage.remove(), 300);
            }, 3000);
        }, 300);
    });
}

// Mouse Move Parallax Effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.transform = `perspective(1000px) rotateX(${(y - rect.height/2) / 20}deg) rotateY(${-(x - rect.width/2) / 20}deg)`;
    });
});

// Scroll Event Listener
window.addEventListener('scroll', () => {
    // Navbar background change
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'var(--nav-bg)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'var(--nav-bg)';
        nav.style.boxShadow = 'none';
    }
    
    // Trigger scroll animations
    animateOnScroll();
});

// Initialize animations on page load
window.addEventListener('load', () => {
    animateOnScroll();
    animateProgressBars();
    typeWriter();
}); 