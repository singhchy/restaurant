// Navigation Sticky Behavior
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        
        // Sticky navbar on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Responsive navigation - hide hamburger on desktop
        function handleResize() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        window.addEventListener('resize', handleResize);
        
        // Initialize
        handleResize();
        
        // Floating Particles Effect
        const particlesCanvas = document.getElementById('particlesCanvas');
        const heroBackground = document.getElementById('heroBackground');
        
        if (particlesCanvas) {
            const ctx = particlesCanvas.getContext('2d');
            let particles = [];
            let animationId = null;
            
            // Set canvas size
            function resizeCanvas() {
                particlesCanvas.width = particlesCanvas.offsetWidth;
                particlesCanvas.height = particlesCanvas.offsetHeight;
            }
            
            // Particle class
            class Particle {
                constructor() {
                    this.x = Math.random() * particlesCanvas.width;
                    this.y = Math.random() * particlesCanvas.height;
                    this.size = Math.random() * 2 + 0.5;
                    this.speedX = Math.random() * 0.5 - 0.25;
                    this.speedY = Math.random() * 0.5 - 0.25;
                    this.color = `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.1})`;
                }
                
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    
                    // Bounce off edges
                    if (this.x > particlesCanvas.width || this.x < 0) this.speedX *= -1;
                    if (this.y > particlesCanvas.height || this.y < 0) this.speedY *= -1;
                }
                
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            // Create particles
            function initParticles() {
                particles = [];
                const particleCount = Math.min(100, Math.floor((particlesCanvas.width * particlesCanvas.height) / 10000));
                
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }
            
            // Animation loop
            function animateParticles() {
                ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
                
                // Draw connecting lines
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 * (1 - distance / 100)})`;
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
                
                // Update and draw particles
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                
                animationId = requestAnimationFrame(animateParticles);
            }
            
            // Initialize and start animation
            function startParticles() {
                resizeCanvas();
                initParticles();
                
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
                animateParticles();
            }
            
            // Handle resize
            window.addEventListener('resize', () => {
                resizeCanvas();
                initParticles();
            });
            
            // Start particles
            startParticles();
        }
        
        // Parallax Effect for Hero Background
        window.addEventListener('scroll', () => {
            if (heroBackground) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
        });
        
        // Scroll-triggered animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Menu Tab Switcher
        const menuTabs = document.getElementById('menuTabs');
        if (menuTabs) {
            const tabButtons = menuTabs.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons and contents
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Show corresponding content
                    const tabId = button.getAttribute('data-tab');
                    const tabContent = document.getElementById(tabId);
                    if (tabContent) {
                        tabContent.classList.add('active');
                    }
                });
            });
        }
        
        // Testimonial Carousel
        const carouselDots = document.querySelectorAll('.carousel-dot');
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        let currentSlide = 0;
        
        function showSlide(index) {
            // Hide all slides
            testimonialSlides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remove active from all dots
            carouselDots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show selected slide and activate corresponding dot
            testimonialSlides[index].classList.add('active');
            carouselDots[index].classList.add('active');
            currentSlide = index;
        }
        
        // Initialize carousel dots
        if (carouselDots.length > 0) {
            carouselDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });
            
            // Auto-advance slides every 5 seconds
            setInterval(() => {
                let nextSlide = currentSlide + 1;
                if (nextSlide >= testimonialSlides.length) {
                    nextSlide = 0;
                }
                showSlide(nextSlide);
            }, 5000);
        }
        
        // Reservation Form Validation
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('fullName').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const date = document.getElementById('date').value;
                const time = document.getElementById('time').value;
                const guests = document.getElementById('guests').value;
                const requests = document.getElementById('requests').value.trim();
                
                // Validation flags
                let isValid = true;
                let errorMessage = '';
                
                // Name validation
                if (!name) {
                    isValid = false;
                    errorMessage += '• Please enter your name.\n';
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email) {
                    isValid = false;
                    errorMessage += '• Please enter your email address.\n';
                } else if (!emailRegex.test(email)) {
                    isValid = false;
                    errorMessage += '• Please enter a valid email address.\n';
                }
                
                // Phone validation (basic)
                if (!phone) {
                    isValid = false;
                    errorMessage += '• Please enter your phone number.\n';
                } else if (phone.replace(/\D/g, '').length < 10) {
                    isValid = false;
                    errorMessage += '• Please enter a valid phone number.\n';
                }
                
                // Date validation
                if (!date) {
                    isValid = false;
                    errorMessage += '• Please select a date.\n';
                } else {
                    const selectedDate = new Date(date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (selectedDate < today) {
                        isValid = false;
                        errorMessage += '• Please select a future date.\n';
                    }
                }
                
                // Time validation
                if (!time) {
                    isValid = false;
                    errorMessage += '• Please select a time.\n';
                }
                
                // Guests validation
                if (!guests || parseInt(guests) < 1 || parseInt(guests) > 20) {
                    isValid = false;
                    errorMessage += '• Please select 1-20 guests.\n';
                }
                
                if (isValid) {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.innerHTML = `
                        <div style="background: rgba(76, 175, 80, 0.1); border: 1px solid #4CAF50; border-radius: 8px; padding: 20px; margin-top: 20px;">
                            <h3 style="color: #4CAF50; margin-bottom: 10px;">Reservation Submitted Successfully!</h3>
                            <p style="color: var(--color-text); margin-bottom: 5px;"><strong>Name:</strong> ${name}</p>
                            <p style="color: var(--color-text); margin-bottom: 5px;"><strong>Date:</strong> ${date} at ${time}</p>
                            <p style="color: var(--color-text); margin-bottom: 5px;"><strong>Guests:</strong> ${guests}</p>
                            <p style="color: var(--color-text); margin-bottom: 5px;"><strong>Confirmation:</strong> We'll send a confirmation to ${email} within 24 hours.</p>
                        </div>
                    `;
                    
                    // Insert after form
                    bookingForm.parentNode.insertBefore(successMessage, bookingForm.nextSibling);
                    
                    // Reset form
                    bookingForm.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Remove success message after 10 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 10000);
                } else {
                    // Show error message
                    alert('Please fix the following errors:\n\n' + errorMessage);
                }
            });
            
            // Add real-time validation feedback
            const formInputs = bookingForm.querySelectorAll('input, select, textarea');
            formInputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    clearFieldError(this);
                });
            });
            
            function validateField(field) {
                const value = field.value.trim();
                const fieldId = field.id;
                
                // Clear previous error
                clearFieldError(field);
                
                // Skip validation if empty (required validation will catch on submit)
                if (!value && field.required) {
                    return;
                }
                
                let error = '';
                
                switch(fieldId) {
                    case 'email':
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (value && !emailRegex.test(value)) {
                            error = 'Please enter a valid email address';
                        }
                        break;
                    case 'phone':
                        if (value && value.replace(/\D/g, '').length < 10) {
                            error = 'Please enter a valid phone number';
                        }
                        break;
                    case 'date':
                        if (value) {
                            const selectedDate = new Date(value);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            
                            if (selectedDate < today) {
                                error = 'Please select a future date';
                            }
                        }
                        break;
                }
                
                if (error) {
                    showFieldError(field, error);
                }
            }
            
            function showFieldError(field, message) {
                // Remove any existing error
                clearFieldError(field);
                
                // Add error class to field
                field.classList.add('error');
                
                // Create error message element
                const errorElement = document.createElement('div');
                errorElement.className = 'field-error';
                errorElement.textContent = message;
                errorElement.style.color = '#ff6b6b';
                errorElement.style.fontSize = '0.85rem';
                errorElement.style.marginTop = '5px';
                
                // Insert after field
                field.parentNode.insertBefore(errorElement, field.nextSibling);
            }
            
            function clearFieldError(field) {
                field.classList.remove('error');
                
                // Remove error message element
                const errorElement = field.parentNode.querySelector('.field-error');
                if (errorElement) {
                    errorElement.remove();
                }
            }
        }
        
        // Auto-add fade-in class to all sections (except hero)
        document.addEventListener('DOMContentLoaded', function() {
            const sections = document.querySelectorAll('.section:not(.hero)');
            sections.forEach(section => {
                // Check if already has fade-in class
                if (!section.classList.contains('fade-in')) {
                    section.classList.add('fade-in');
                }
            });
            
            // Also add fade-in to signature experience cards
            const experienceCards = document.querySelectorAll('.experience-card');
            experienceCards.forEach(card => {
                card.classList.add('fade-in');
            });
            
            // Add fade-in to menu items
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                item.classList.add('fade-in');
            });
            
            // Add fade-in to private dining cards
            const privateCards = document.querySelectorAll('.private-card');
            privateCards.forEach(card => {
                card.classList.add('fade-in');
            });
            
            // Add fade-in to testimonial slides
            const testimonialSlides = document.querySelectorAll('.testimonial-slide');
            testimonialSlides.forEach(slide => {
                slide.classList.add('fade-in');
            });
            
            // Add fade-in to reservation info cards
            const infoCards = document.querySelectorAll('.info-card');
            infoCards.forEach(card => {
                card.classList.add('fade-in');
            });
            
            // Add fade-in to transport options
            const transportOptions = document.querySelectorAll('.transport-option');
            transportOptions.forEach(option => {
                option.classList.add('fade-in');
            });
        });
        
        // Add CSS for error states
        const style = document.createElement('style');
        style.textContent = `
            .form-group input.error,
            .form-group select.error,
            .form-group textarea.error {
                border-color: #ff6b6b !important;
                background: rgba(255, 107, 107, 0.05);
            }
            
            .form-group input.error:focus,
            .form-group select.error:focus,
            .form-group textarea.error:focus {
                box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.1) !important;
            }
        `;
        document.head.appendChild(style);