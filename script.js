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
        basicPlanBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // Show modal
            upsellModal.classList.remove('hidden');
            // Small delay to allow display class to apply before toggling opacity for transition
            setTimeout(function () {
                upsellModal.classList.remove('opacity-0');
                if (modalContent) {
                    modalContent.classList.remove('scale-95');
                    modalContent.classList.add('scale-100');
                }
            }, 10);
        });

        function closeModal(e) {
            if (e) e.preventDefault();
            upsellModal.classList.add('opacity-0');
            if (modalContent) {
                modalContent.classList.remove('scale-100');
                modalContent.classList.add('scale-95');
            }
            setTimeout(function () {
                upsellModal.classList.add('hidden');
            }, 300);
        }

        if (closeUpsellModal) closeUpsellModal.addEventListener('click', closeModal);
        if (continueBasic) {
            continueBasic.addEventListener('click', function (e) {
                e.preventDefault();
                closeModal();
                // User continues with basic plan
                console.log("Proceeding with basic plan (R$ 10)");
            });
        }
    }

    // ===== TESTIMONIALS CAROUSEL =====
    (function () {
        var slides = document.querySelectorAll('.depo-slide');
        var dots = document.querySelectorAll('.depo-dot');
        var prevBtn = document.getElementById('depo-prev');
        var nextBtn = document.getElementById('depo-next');
        var counterEl = document.getElementById('depo-current');
        var total = slides.length;
        var current = 0;
        var autoplayInterval = null;
        var autoplayDelay = 4000;

        if (!slides.length) return;

        function goTo(index) {
            // Wrap around
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;

            slides.forEach(function (slide, i) {
                if (i === index) {
                    slide.style.opacity = '1';
                    slide.style.position = 'relative';
                    slide.style.zIndex = '2';
                    slide.style.transform = 'scale(1)';
                } else {
                    slide.style.opacity = '0';
                    slide.style.position = 'absolute';
                    slide.style.zIndex = '1';
                    slide.style.transform = 'scale(0.97)';
                }
            });

            dots.forEach(function (dot, i) {
                if (i === index) {
                    dot.classList.remove('bg-zinc-300');
                    dot.classList.add('bg-primary', 'shadow-md', 'scale-110');
                } else {
                    dot.classList.add('bg-zinc-300');
                    dot.classList.remove('bg-primary', 'shadow-md', 'scale-110');
                }
            });

            if (counterEl) counterEl.textContent = (index + 1).toString();
            current = index;
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }

        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(next, autoplayDelay);
        }

        function stopAutoplay() {
            if (autoplayInterval) clearInterval(autoplayInterval);
        }

        // Button events
        if (nextBtn) nextBtn.addEventListener('click', function () { next(); startAutoplay(); });
        if (prevBtn) prevBtn.addEventListener('click', function () { prev(); startAutoplay(); });

        // Dot events
        dots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                goTo(parseInt(this.getAttribute('data-index')));
                startAutoplay();
            });
        });

        // Touch/swipe support
        var wrapper = document.getElementById('depo-carousel-wrapper');
        if (wrapper) {
            var touchStartX = 0;
            var touchEndX = 0;

            wrapper.addEventListener('touchstart', function (e) {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoplay();
            }, { passive: true });

            wrapper.addEventListener('touchend', function (e) {
                touchEndX = e.changedTouches[0].screenX;
                var diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) next(); else prev();
                }
                startAutoplay();
            }, { passive: true });
        }

        // Pause on hover (desktop)
        var carouselSection = document.querySelector('.testimonials-section');
        if (carouselSection) {
            carouselSection.addEventListener('mouseenter', stopAutoplay);
            carouselSection.addEventListener('mouseleave', startAutoplay);
        }

        // Init
        goTo(0);
        startAutoplay();
    })();

    // ===== PURCHASE NOTIFICATIONS (SOCIAL PROOF) =====
    (function () {
        const names = [
            'Ana Paula', 'Lucas Silva', 'Gabriel Santos', 'Julia Mendes', 'Ricardo Oliveira',
            'Mariana Costa', 'Fernando Souza', 'Beatriz Lima', 'Thiago Rocha', 'Camila Alves',
            'Bruno Ferreira', 'Letícia Gomes', 'Marcos Vinícius', 'Isabela Ribeiro', 'Rafael Machado',
            'Larissa Neves', 'Rodrigo Silva', 'Vanessa Lima', 'Marcelo Diniz', 'Daniela Cruz'
        ];

        const cities = [
            'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Curitiba, PR', 'Porto Alegre, RS',
            'Salvador, BA', 'Fortaleza, CE', 'Brasília, DF', 'Manaus, AM', 'Recife, PE',
            'Goiânia, GO', 'Belém, PA', 'Florianópolis, SC', 'Vitória, ES', 'Natal, RN'
        ];

        let activeNotification = null;

        function getRandomItem(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function createNotification() {
            // Não mostra se houver uma notificação ativa ou se o modal de upsell estiver aberto
            const modal = document.getElementById('upsell-modal');
            const isModalOpen = modal && !modal.classList.contains('hidden');

            if (activeNotification || isModalOpen) return;

            const name = getRandomItem(names);
            const city = getRandomItem(cities);
            
            const notification = document.createElement('div');
            notification.className = 'purchase-notification';
            notification.innerHTML = `
                <div class="purchase-img">
                    <span class="material-symbols-outlined" data-icon="verified" data-weight="fill">verified</span>
                </div>
                <div class="purchase-content">
                    <span class="purchase-title">${name}</span>
                    <span class="purchase-desc">Acabou de comprar o <strong style="color: #22c55e;">Pacote Premium</strong></span>
                    <span class="purchase-time">há 2 minutos • de ${city}</span>
                </div>
            `;

            document.body.appendChild(notification);
            activeNotification = notification;

            // Show with a small delay
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);

            // Hide and remove after 6 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                    activeNotification = null;
                }, 600);
            }, 6000);
        }

        function scheduleNext() {
            const delay = Math.floor(Math.random() * (18000 - 8000) + 8000); // Entre 8s e 18s
            setTimeout(() => {
                createNotification();
                scheduleNext();
            }, delay);
        }

        // Inicia após 5 segundos
        setTimeout(() => {
            createNotification();
            scheduleNext();
        }, 5000);
    })();



});

