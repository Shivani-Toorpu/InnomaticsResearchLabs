let index = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - n)}%)`;
    });
}

function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
}

function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
}

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Initialize first slide position
showSlide(index);
