document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    const slides = Array.from(track.querySelectorAll('.slide'));

    // Left edge of a slide measured from the start of the track's scroll range.
    const leftOf = (s) => s.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;

    const goTo = (i) => {
        i = Math.max(0, Math.min(slides.length - 1, i));
        track.scrollTo({ left: leftOf(slides[i]), behavior: 'smooth' });
    };

    const step = (n) => {
        // When scrolled to a mid-slide position, "next" means the slide after the one showing.
        const x = track.scrollLeft;
        const showing = slides.reduce((best, s, i) => (leftOf(s) <= x + 2 ? i : best), 0);
        goTo(n > 0 ? showing + 1 : (leftOf(slides[showing]) < x - 2 ? showing : showing - 1));
    };

    // Autoplay: one slide every few seconds, wrapping to the start. Pauses while the
    // pointer is over the strip, while it has focus, while dragging, and for a while
    // after any manual move. Off entirely when the OS asks for reduced motion.
    const AUTOPLAY_MS = 5000;
    const RESUME_AFTER_MS = 10000;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let paused = false, resumeAt = 0;

    const autoAdvance = () => {
        if (paused || document.hidden || Date.now() < resumeAt) return;
        const x = track.scrollLeft;
        const atEnd = x + track.clientWidth >= track.scrollWidth - 2;
        if (atEnd) { goTo(0); return; }
        const showing = slides.reduce((best, s, i) => (leftOf(s) <= x + 2 ? i : best), 0);
        goTo(showing + 1);
    };
    if (!reducedMotion) setInterval(autoAdvance, AUTOPLAY_MS);

    const manual = () => { resumeAt = Date.now() + RESUME_AFTER_MS; };
    const carousel = track.closest('.carousel');
    carousel.addEventListener('pointerenter', () => { paused = true; });
    carousel.addEventListener('pointerleave', () => { paused = false; });
    track.addEventListener('focusin', () => { paused = true; });
    track.addEventListener('focusout', () => { paused = false; });
    track.addEventListener('touchstart', manual, { passive: true });
    track.addEventListener('wheel', manual, { passive: true });

    document.querySelectorAll('.carousel-btn').forEach((btn) => {
        btn.addEventListener('click', () => { manual(); step(Number(btn.dataset.dir)); });
    });

    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); manual(); step(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); manual(); step(-1); }
    });

    // Mouse drag to scroll (touch already scrolls natively).
    let startX = 0, startScroll = 0, moved = false, pointerId = null;

    track.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        pointerId = e.pointerId;
        startX = e.clientX;
        startScroll = track.scrollLeft;
        moved = false;
        manual();
        track.classList.add('dragging');
    });

    track.addEventListener('pointermove', (e) => {
        if (e.pointerId !== pointerId) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 4) moved = true;
        track.scrollLeft = startScroll - dx;
    });

    const endDrag = (e) => {
        if (e.pointerId !== pointerId) return;
        pointerId = null;
        track.classList.remove('dragging');
        if (moved) {
            // Snap to whichever slide edge is nearest once the drag ends.
            const x = track.scrollLeft;
            const nearest = slides.reduce((b, s, i) =>
                Math.abs(leftOf(s) - x) < Math.abs(leftOf(slides[b]) - x) ? i : b, 0);
            goTo(nearest);
        }
    };
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('pointerleave', endDrag);

    // A drag that moved should not also open the slide's link.
    track.addEventListener('click', (e) => {
        if (moved) { e.preventDefault(); moved = false; }
    }, true);
});
