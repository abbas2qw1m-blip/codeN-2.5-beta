document.addEventListener('DOMContentLoaded', function () {

    console.log('🚀 بدء التحميل...');

    // ========================================
    // 0. Global Variables
    // ========================================
    const body = document.body;

    // ========================================
    // 1. Lenis Initialization
    // ========================================
    const lenis = new Lenis({
        duration: 1.5,
        smoothWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    window.lenis = lenis;

    // ========================================
    // 2. GSAP Plugins & Lenis Ticker Sync
    // ========================================
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ==============================================
    // 3. GSAP Animations
    // ==============================================
    gsap.fromTo(".aboutTitle",
        { opacity: 0, y: 300 },
        {
            opacity: 1,
            y: 0,
            duration: 6,
            scrollTrigger: {
                trigger: ".secTwo",
                start: "top 60%",
                end: "top 10%",
                scrub: true,
                markers: false,
            }
        }
    );

    gsap.fromTo(".carousel",
        { opacity: 0 },
        {
            opacity: 1,
            duration: 5,
            scrollTrigger: {
                trigger: ".secTwo",
                start: "top 90%",
                end: "top 60%",
                scrub: true,
                markers: false,
            }
        }
    );

    gsap.fromTo(".bio-card",
        { opacity: 0, y: 300 },
        {
            opacity: 1,
            y: 0,
            duration: 5,
            scrollTrigger: {
                trigger: ".secTwo",
                start: "top 50%",
                end: "top 10%",
                scrub: true,
                markers: false,
            }
        }
    );

    gsap.fromTo(".stats-card",
        { opacity: 0, y: 300 },
        {
            opacity: 1,
            y: 0,
            duration: 5,
            scrollTrigger: {
                trigger: ".secTwo",
                start: "top 50%",
                end: "top 10%",
                scrub: true,
                markers: false,
            }
        }
    );

    gsap.fromTo(".skills-card",
        { opacity: 0, y: 300 },
        {
            opacity: 1,
            y: 0,
            duration: 5,
            scrollTrigger: {
                trigger: ".aboutContent",
                start: "top 100%",
                end: "top 10%",
                scrub: true,
                markers: false,
            }
        }
    );

    // Links Active States Highlights
    const navLinks = [
        { selector: ".aHome", trigger: ".hero" },
        { selector: ".aAbout", trigger: ".secTwo" },
        { selector: ".aContent", trigger: ".contentSec" },
        { selector: ".aFaq", trigger: ".faqSec" },
        { selector: ".aPro", trigger: ".proSec" }
    ];

    navLinks.forEach(link => {
        if (document.querySelector(link.selector) && document.querySelector(link.trigger)) {
            gsap.to(link.selector, {
                duration: 0.3,
                color: "#D1B371",
                scrollTrigger: {
                    trigger: link.trigger,
                    start: "top 20%",
                    end: "bottom 20%",
                    toggleActions: "play reverse play reverse",
                }
            });
        }
    });

    // FAQ Section Animations
    gsap.fromTo(".FAQTitle",
        { opacity: 0, y: 300 },
        {
            opacity: 1,
            y: 0,
            duration: 6,
            scrollTrigger: {
                trigger: ".faqSec",
                start: "top 60%",
                end: "top 10%",
                scrub: true,
                markers: false,
            }
        }
    );

    gsap.fromTo(".faqForm",
        { opacity: 0, y: 60, scale: 0.96 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".faqSec",
                start: "top 75%",
                end: "top 30%",
                scrub: true,
                markers: false,
            }
        }
    );

    gsap.from(".faq-image, .faq-subheading, .faq-title, .faq-description, #faqContainer", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".faqSec",
            start: "top 65%",
            end: "top 30%",
            scrub: true,
            markers: false,
        }
    });

    // Project Section
    gsap.fromTo(".PROTitle",
        { opacity: 0, y: 300 },
        {
            opacity: 1,
            y: 0,
            duration: 6,
            scrollTrigger: {
                trigger: ".proSec",
                start: "top 60%",
                end: "top 10%",
                scrub: true,
                markers: false,
            }
        }
    );

    // Content Section
    gsap.fromTo(".CONTitle",
        { opacity: 0, y: 300 },
        {
            opacity: 1,
            y: 0,
            duration: 6,
            scrollTrigger: {
                trigger: ".contentSec",
                start: "top 60%",
                end: "top 10%",
                scrub: true,
                markers: false,
            }
        }
    );

    gsap.fromTo(".cards-container",
        { opacity: 0, y: 300 },
        {
            opacity: 1,
            y: 0,
            duration: 6,
            scrollTrigger: {
                trigger: ".contentSec",
                start: "top 60%",
                end: "top 10%",
                scrub: true,
                markers: false,
            }
        }
    );

    // ========================================
    // 4. AOS Initialization
    // ========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: false,
            mirror: false,
            offset: 100,
            easing: 'ease-out-cubic',
            disable: false,
        });

        lenis.on('scroll', () => {
            AOS.refresh();
        });
    }

    // ========================================
    // 5. Mobile Menu & Navigation handling
    // ========================================
    const openBtn = document.querySelector('.humBtn');
    const closeBtn = document.querySelector('.close');
    const humMenu = document.querySelector('.humMenu');

    function closeMenu() {
        if (humMenu) humMenu.classList.remove('active');
        lenis.start();
        body.style.overflow = "auto";
    }

    if (openBtn && closeBtn && humMenu) {
        openBtn.addEventListener('click', () => {
            humMenu.classList.add('active');
            lenis.stop();
            body.style.overflow = "hidden";
        });

        closeBtn.addEventListener('click', closeMenu);
    }

    // ========================================
    // 6. Universal Smooth Scroll Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                closeMenu();

                document.querySelectorAll('.nav-list a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                lenis.scrollTo(targetElement, {
                    duration: 1.5,
                    offset: -80,
                });

                setTimeout(() => {
                    if (typeof AOS !== 'undefined') AOS.refresh();
                    ScrollTrigger.refresh();
                }, 400);
            }
        });
    });

    // ========================================
    // 7. Global Resize Listener
    // ========================================
    window.addEventListener('resize', () => {
        if (typeof AOS !== 'undefined') AOS.refresh();
        ScrollTrigger.refresh();
    });

    // ========================================
    // 8. Hero Image 3D Effect
    // ========================================
    document.querySelectorAll('.imgs').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // ========================================
    // 9. Intro Loader
    // ========================================
    const name = document.querySelector(".name");
    const intro = document.querySelector(".intro-loader");
    const content = document.querySelector('.content');

    lenis.stop();
    body.style.overflow = "hidden";

    setTimeout(() => {
        if (content) content.style.opacity = "0";
        if (name) {
            name.style.opacity = "1";
            name.style.transform = "translateY(0)";
        }
    }, 300);

    setTimeout(() => {
        if (intro) intro.style.top = "-100%";
        if (content) content.style.opacity = "1";
        lenis.start();
        ScrollTrigger.refresh();
        body.style.overflow = "auto";
    }, 2000);

    // ========================================
    // 10. FAQ Component Dynamic Building
    // ========================================
    const faqs = [
        {
            question: "How to use this component?",
            answer: "To use this component, you need to import it in your project and use it in your JSX code. Here's an example of how to use it:",
        },
        {
            question: "Are there any other components available?",
            answer: "Yes, there are many other components available in this library. You can find them in the 'Components' section of the website.",
        },
        {
            question: "Are components responsive?",
            answer: "Yes, all components are responsive and can be used on different screen sizes.",
        },
        {
            question: "Can I customize the components?",
            answer: "Yes, you can customize the components by passing props to them. You can find more information about customizing components in the 'Customization' section of the website.",
        },
    ];

    const container = document.getElementById("faqContainer");

    if (container) {
        faqs.forEach((faq, index) => {
            const wrapper = document.createElement("div");
            wrapper.className = "faq-item";

            const header = document.createElement("div");
            header.className = "faq-header";
            header.innerHTML = `
                <h3 class="faq-question">${faq.question}</h3>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon">
                    <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                        stroke="#1D293D" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;

            const answer = document.createElement("p");
            answer.className = "answer";
            answer.textContent = faq.answer;

            wrapper.appendChild(header);
            wrapper.appendChild(answer);
            container.appendChild(wrapper);

            header.addEventListener("click", () => {
                const allAnswers = document.querySelectorAll(".answer");
                const allIcons = document.querySelectorAll(".icon");

                allAnswers.forEach((el, i) => {
                    if (i === index) {
                        const isOpen = el.classList.contains("open");
                        el.classList.toggle("open", !isOpen);
                        allIcons[i].classList.toggle("rotate-180", !isOpen);
                    } else {
                        el.classList.remove("open");
                        allIcons[i].classList.remove("rotate-180");
                    }
                });
            });
        });
    }

    // ========================================
    // 11. Video Gallery Logic
    // ========================================
    const wrappers = document.querySelectorAll('.vgal-player-wrapper');

    wrappers.forEach(wrapper => {
        const video = wrapper.querySelector('.vgal-player');
        const overlay = wrapper.querySelector('.vgal-overlay');
        const toggleBtn = wrapper.querySelector('.btn-toggle');
        const muteBtn = wrapper.querySelector('.btn-mute');
        const progressBar = wrapper.querySelector('.progress-bar');
        const progressContainer = wrapper.querySelector('.progress-container');

        if (!video) return;

        function togglePlay() {
            if (video.paused) {
                document.querySelectorAll('.vgal-player').forEach(v => {
                    if (v !== video) {
                        v.pause();
                        const pWrapper = v.closest('.vgal-player-wrapper');
                        if (pWrapper) pWrapper.classList.remove('is-playing');
                    }
                });

                video.play();
                wrapper.classList.add('is-playing');
                if (toggleBtn) toggleBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
            } else {
                video.pause();
                wrapper.classList.remove('is-playing');
                if (toggleBtn) toggleBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
            }
        }

        if (overlay) overlay.addEventListener('click', togglePlay);
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                togglePlay();
            });
        }

        if (muteBtn) {
            muteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                video.muted = !video.muted;
                muteBtn.innerHTML = video.muted ?
                    '<i class="bi bi-volume-mute-fill"></i>' :
                    '<i class="bi bi-volume-up-fill"></i>';
            });
        }

        video.addEventListener('timeupdate', () => {
            if (video.duration) {
                const percent = (video.currentTime / video.duration) * 100;
                if (progressBar) progressBar.style.width = `${percent}%`;
            }
        });

        if (progressContainer) {
            progressContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                const rect = progressContainer.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                video.currentTime = pos * video.duration;
            });
        }

        video.addEventListener('ended', () => {
            wrapper.classList.remove('is-playing');
            if (toggleBtn) toggleBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
            if (progressBar) progressBar.style.width = '0%';
        });
    });

    console.log('✅ اكتمل تجهيز الكود بنجاح!');
});
