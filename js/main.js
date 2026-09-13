document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const slideStep = () => {
        const slide = track.querySelector('.slide');
        if (!slide) return track.clientWidth;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        return slide.getBoundingClientRect().width + gap;
    };

    const scrollBySlides = (n) => track.scrollBy({ left: n * slideStep(), behavior: 'smooth' });

    document.querySelectorAll('.carousel-btn').forEach((btn) => {
        btn.addEventListener('click', () => scrollBySlides(Number(btn.dataset.dir)));
    });

    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); scrollBySlides(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); scrollBySlides(-1); }
    });

    // Mouse drag to scroll (touch already scrolls natively).
    let startX = 0, startScroll = 0, moved = false, pointerId = null;

    track.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        pointerId = e.pointerId;
        startX = e.clientX;
        startScroll = track.scrollLeft;
        moved = false;
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
            // Snap to the nearest slide once the drag ends.
            const step = slideStep();
            track.scrollTo({ left: Math.round(track.scrollLeft / step) * step, behavior: 'smooth' });
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
