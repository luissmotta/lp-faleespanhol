document.addEventListener('DOMContentLoaded', function () {

    // ===== STICKY MOBILE CTA =====
    const stickyBar = document.getElementById('mobile-sticky-cta');
    const heroSection = document.querySelector('header.hero-bg');

    if (stickyBar && heroSection) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    stickyBar.classList.add('visible');
                } else {
                    stickyBar.classList.remove('visible');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(heroSection);
    }

    // ===== COUNTDOWN TIMER =====
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (hoursEl && minutesEl && secondsEl) {
        // Set 15 hours from now (or use stored end time for persistence)
        var storageKey = 'faleespanhol_countdown_end';
        var endTime = localStorage.getItem(storageKey);

        if (!endTime || parseInt(endTime) < Date.now()) {
            endTime = Date.now() + 15 * 60 * 60 * 1000;
            localStorage.setItem(storageKey, endTime.toString());
        } else {
            endTime = parseInt(endTime);
        }

        function updateCountdown() {
            var now = Date.now();
            var diff = endTime - now;

            if (diff <= 0) {
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            var hours = Math.floor(diff / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);

            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ===== SCROLL FADE-IN ANIMATIONS =====
    var fadeElements = document.querySelectorAll('.fade-up');
    if (fadeElements.length > 0) {
        var fadeObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        fadeElements.forEach(function (el) {
            fadeObserver.observe(el);
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                var offset = 80;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // ===== UPSELL MODAL LOGIC =====
    const basicPlanBtn = document.getElementById('basic-plan-btn');
    const upsellModal = document.getElementById('upsell-modal');
    const closeUpsellModal = document.getElementById('close-upsell-modal');
    const continueBasic = document.getElementById('continue-basic');
    const modalContent = document.getElementById('upsell-modal-content');

    if (basicPlanBtn && upsellModal) {
        basicPlanBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Show modal
            upsellModal.classList.remove('hidden');
            // Small delay to allow display class to apply before toggling opacity for transition
            setTimeout(function() {
                upsellModal.classList.remove('opacity-0');
                if(modalContent) {
                    modalContent.classList.remove('scale-95');
                    modalContent.classList.add('scale-100');
                }
            }, 10);
        });

        function closeModal(e) {
            if(e) e.preventDefault();
            upsellModal.classList.add('opacity-0');
            if(modalContent) {
                modalContent.classList.remove('scale-100');
                modalContent.classList.add('scale-95');
            }
            setTimeout(function() {
                upsellModal.classList.add('hidden');
            }, 300);
        }

        if (closeUpsellModal) closeUpsellModal.addEventListener('click', closeModal);
        if (continueBasic) {
            continueBasic.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal();
                // User continues with basic plan
                console.log("Proceeding with basic plan (R$ 10)");
            });
        }
    }
});
