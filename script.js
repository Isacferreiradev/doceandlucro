document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optimized Scroll Animation using IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible to save resources
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.promise-card, .feature-item, .pain-item, .module-item, .bonus-card, .offer-card');

    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Countdown Timer
    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = "Auto-destruição em " + minutes + ":" + seconds + "...";

            if (--timer < 0) {
                timer = duration; // Reset or handle expiration
            }
        }, 1000);
    }

    const urgencyBoxSpan = document.querySelector('.urgency-box span');
    if (urgencyBoxSpan) {
        startTimer(300, urgencyBoxSpan); // 5 minutes = 300 seconds
    }

    // Promo Banner Logic
    function updatePromoBanner() {
        const dateElement = document.getElementById('current-date');
        const timerElement = document.getElementById('daily-timer');

        if (!dateElement || !timerElement) return;

        // Set Date
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        dateElement.textContent = `${day}/${month}/${year}`;

        // Set Timer - Start at 23:59:59 and countdown to 00:00:00
        let totalSeconds = 23 * 3600 + 59 * 60 + 59; // 23:59:59 in seconds

        function updateTimer() {
            if (totalSeconds < 0) {
                totalSeconds = 23 * 3600 + 59 * 60 + 59; // Reset when it reaches 0
            }

            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            totalSeconds--;
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    updatePromoBanner();
});
