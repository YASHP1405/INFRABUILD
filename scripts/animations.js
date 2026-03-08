// animations.js

gsap.registerPlugin(ScrollTrigger);

// 1. Scroll Progress Bar
gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
    }
});

// 2. Initial Hero Animations
const tl = gsap.timeline();
tl.from('.hero-desc', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4 })
    .from('.hero-btns', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, "-=0.8")
    .from('.hero-visuals', { opacity: 0, scale: 0.9, duration: 1.5, ease: 'power3.out' }, "-=0.5");

// 3. Section Fade-ins
const sections = gsap.utils.toArray('.section-header');
sections.forEach(sec => {
    gsap.from(sec, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// 4. Number Counters
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    ScrollTrigger.create({
        trigger: '#metrics',
        start: "top 80%",
        once: true,
        onEnter: () => {
            gsap.to(counter, {
                innerHTML: target,
                duration: 2,
                snap: { innerHTML: 1 },
                ease: "power2.out"
            });
        }
    });
});

// 5. Product Cards Stagger
ScrollTrigger.create({
    trigger: "#products",
    start: "top 70%",
    once: true,
    onEnter: () => {
        gsap.to('.product-card', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });
    }
});

// 6. Timeline Animation
const timelineItems = gsap.utils.toArray('.timeline-item');
timelineItems.forEach((item, i) => {
    ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        once: true,
        onEnter: () => {
            item.classList.add('visible');
            gsap.fromTo(item,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: item.classList.contains('timeline-delay-1') ? 0.2 : (item.classList.contains('timeline-delay-2') ? 0.4 : 0) }
            );
        }
    });
});
