document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const slider = document.querySelector('.category-slider');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const pages = document.querySelectorAll('.slider-page');

    console.log('Slider:', slider);
    console.log('Prev button:', prevBtn);
    console.log('Next button:', nextBtn);
    console.log('Pages:', pages);

    if (!slider || !prevBtn || !nextBtn || pages.length === 0) {
        console.error('One or more essential elements are missing');
        return;
    }

    let currentPage = 0;

    function updateSlider() {
        console.log('Updating slider, current page:', currentPage);
        const offset = currentPage * 88.89;  // 88.89% is the visible part of each page (100 / 9 * 8)
        slider.style.transform = `translateX(-${offset}%)`;
        updateButtonVisibility();
    }

    function updateButtonVisibility() {
        prevBtn.style.display = currentPage === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentPage === pages.length - 1 ? 'none' : 'flex';
        console.log('Button visibility updated');
    }

    function goToNextPage() {
        console.log('Next button clicked');
        if (currentPage < pages.length - 1) {
            currentPage++;
            updateSlider();
        }
    }

    function goToPrevPage() {
        console.log('Prev button clicked');
        if (currentPage > 0) {
            currentPage--;
            updateSlider();
        }
    }

    nextBtn.addEventListener('click', goToNextPage);
    prevBtn.addEventListener('click', goToPrevPage);

    console.log('Event listeners added to buttons');

    // Optional: Add touch swipe functionality for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            goToNextPage();
        } else if (touchEndX - touchStartX > 50) {
            goToPrevPage();
        }
    });

    // Initialize button visibility
    updateButtonVisibility();
    console.log('Initial setup complete');
});