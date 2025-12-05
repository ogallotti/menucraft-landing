// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic',
});

// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.header__mobile-link');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-open');
            const icon = mobileMenu.classList.contains('is-open') ? 'x' : 'menu';
            // Re-render icon
            mobileMenuToggle.innerHTML = `<i data-lucide="${icon}"></i>`;
            lucide.createIcons();
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-open');
                mobileMenuToggle.innerHTML = `<i data-lucide="menu"></i>`;
                lucide.createIcons();
            });
        });
    }

    // Hero Before/After Slider
    const slider = document.getElementById('hero-slider');
    if (slider) {
        const afterImage = slider.querySelector('.comparison-slider__image--after');
        const handle = slider.querySelector('.comparison-slider__handle');
        let isDragging = false;

        const updateSlider = (x) => {
            const rect = slider.getBoundingClientRect();
            let percentage = ((x - rect.left) / rect.width) * 100;
            
            // Clamp percentage between 0 and 100
            percentage = Math.max(0, Math.min(100, percentage));

            afterImage.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        };

        const startDrag = (e) => {
            isDragging = true;
            updateSlider(e.type.includes('touch') ? e.touches[0].clientX : e.clientX);
        };

        const stopDrag = () => {
            isDragging = false;
        };

        const moveDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent scrolling on touch
            updateSlider(e.type.includes('touch') ? e.touches[0].clientX : e.clientX);
        };

        slider.addEventListener('mousedown', startDrag);
        slider.addEventListener('touchstart', startDrag);

        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('touchend', stopDrag);

        window.addEventListener('mousemove', moveDrag);
        window.addEventListener('touchmove', moveDrag);
    }

    // Testimonial Carousel
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (track && prevBtn && nextBtn && dotsContainer) {
        const cards = Array.from(track.children);
        let currentIndex = 0;

        // Create dots
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        const updateCarousel = () => {
            const width = cards[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * width}px)`;
            
            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        };

        const goToSlide = (index) => {
            currentIndex = index;
            if (currentIndex < 0) currentIndex = cards.length - 1;
            if (currentIndex >= cards.length) currentIndex = 0;
            updateCarousel();
        };

        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

        // Handle resize
        window.addEventListener('resize', updateCarousel);
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                }
            });
            
            // Toggle current item
            item.classList.toggle('open');
        });
    });

    // Logo Marquee Cloning (for infinite loop)
    const marqueeTrack = document.querySelector('.logo-bar__track');
    if (marqueeTrack) {
        // Clone items to ensure seamless loop
        const items = Array.from(marqueeTrack.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            marqueeTrack.appendChild(clone);
        });
    }
});
