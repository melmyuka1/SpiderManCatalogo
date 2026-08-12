document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // logo do header fica "presa" na tela e gira enquanto o usuario rola a pagina
    const heroHeader = document.querySelector('header');
    const brandLogo = document.querySelector('.brand-logo');

    if (!heroHeader || !brandLogo) return;

    gsap.timeline({
        scrollTrigger: {
            trigger: heroHeader,
            start: 'top top',
            end: '+=800',
            scrub: 1,
            pin: true,
        },
    }).to(brandLogo, { rotateZ: 360, ease: 'none' });
});
