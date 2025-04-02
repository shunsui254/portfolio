/**
 * Portfolio Website JavaScript
 * Features:
 * - Dynamic typing effect
 * - Scroll progress indicator
 * - Smooth scrolling navigation
 * - Intersection Observer animations
 * - Mobile-responsive interactions
 */

// Wait for DOM content to be fully loaded before executing
document.addEventListener("DOMContentLoaded", () => {
    // Configuration for the typing animation
    const doctorText = "Future Doctor by Day, ";
    const coderText = "Coder by Night";
    const doctorPart = document.querySelector(".doctor-part");
    const coderPart = document.querySelector(".coder-part");
    let doctorIndex = 0;
    let coderIndex = 0;
    const typingDelay = 100; // Delay between each character (in milliseconds)
    
    // Function to create typing effect for doctor text
    function typeDoctor() {
        if (doctorIndex < doctorText.length) {
            doctorPart.textContent += doctorText.charAt(doctorIndex);
            doctorIndex++;
            setTimeout(typeDoctor, typingDelay);
        } else {
            // Start typing coder text after doctor text is complete
            setTimeout(typeCoder, typingDelay);
        }
    }

    // Function to create typing effect for coder text
    function typeCoder() {
        if (coderIndex < coderText.length) {
            coderPart.textContent += coderText.charAt(coderIndex);
            coderIndex++;
            setTimeout(typeCoder, typingDelay);
        }
    }

    // Start the typing animation after a brief delay
    setTimeout(typeDoctor, 500);

    // Create and initialize scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    // Handle scroll events for progress bar and back-to-top button
    window.addEventListener('scroll', () => {
        // Calculate scroll percentage
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
        
        // Show/hide back-to-top button based on scroll position
        const backToTopBtn = document.getElementById('backToTopBtn');
        if (scrollTop > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Implement smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            // Handle scroll to top
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            // Handle scroll to specific section
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position to account for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Configure Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point
    };
    
    // Create observer to handle section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start animation when section comes into view
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target); // Stop observing after animation starts
            }
        });
    }, observerOptions);
    
    // Initialize all sections with paused animations
    document.querySelectorAll('section').forEach(section => {
        section.style.animationPlayState = 'paused';
        observer.observe(section);
    });
});
