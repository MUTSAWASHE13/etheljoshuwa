document.addEventListener('DOMContentLoaded', () => {
    const metrics = document.querySelectorAll('.metric span[data-target]');

    const animateCounter = (element) => {
        const target = +element.getAttribute('data-target');
        let current = 0;
        const duration = 2000; // 2 seconds

        const updateCounter = () => {
            if (current < target) {
                // Determine increment step
                const increment = target / (duration / 10); 
                current = Math.ceil(current + increment);
                if (current > target) current = target; // Ensure it doesn't overshoot
                element.innerText = current;
                requestAnimationFrame(updateCounter);
            } else {
                element.innerText = target;
            }
        };

        updateCounter();
    };

    // Use Intersection Observer for a smoother effect when section enters view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start animation when the trust bar comes into view
                metrics.forEach(animateCounter);
                observer.unobserve(entry.target); // Stop observing once it's run
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    const trustBar = document.getElementById('trust');
    if (trustBar) {
        observer.observe(trustBar);
    }
});