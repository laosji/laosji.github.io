window.addEventListener('load', function() {
    initCategorySlider();
});

function initCategorySlider() {
    const slider = document.querySelector('.category-slider');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const pages = document.querySelectorAll('.slider-page');
    const container = document.querySelector('.slider-container');
    const CARDS_PER_PAGE = 17; // 每页固定显示17个卡片

    if (!slider || !prevBtn || !nextBtn || pages.length === 0) {
        console.error('Slider elements not found');
        return;
    }

    let currentPage = 0;
    let startX;
    let isDragging = false;
    let currentTranslate = 0;

    // 获取页面宽度
    function getPageWidth() {
        return container ? container.offsetWidth : 0;
    }

    // 更新滑块位置
    function updateSliderPosition(animate = true) {
        if (!animate) {
            slider.style.transition = 'none';
        } else {
            slider.style.transition = 'transform 0.3s ease-in-out';
        }

        const offset = currentPage * getPageWidth();
        slider.style.transform = `translateX(-${offset}px)`;

        if (!animate) {
            requestAnimationFrame(() => {
                slider.style.transition = 'transform 0.3s ease-in-out';
            });
        }

        updateNavigationState();
    }

    // 更新导航按钮状态
    function updateNavigationState() {
        const isFirstPage = currentPage === 0;
        const isLastPage = currentPage === pages.length - 1;

        prevBtn.disabled = isFirstPage;
        nextBtn.disabled = isLastPage;
        
        prevBtn.style.opacity = isFirstPage ? '0.5' : '1';
        nextBtn.style.opacity = isLastPage ? '0.5' : '1';
    }

    // 处理滑动逻辑
    function goToPage(direction) {
        if (direction === 'next' && currentPage < pages.length - 1) {
            currentPage++;
        } else if (direction === 'prev' && currentPage > 0) {
            currentPage--;
        }
        updateSliderPosition();
    }

    // 触摸事件处理
    function touchStart(event) {
        startX = event.touches[0].clientX;
        isDragging = true;
        currentTranslate = -currentPage * getPageWidth();
        slider.style.transition = 'none';
    }

    function touchMove(event) {
        if (!isDragging) return;

        const currentX = event.touches[0].clientX;
        const diff = currentX - startX;
        const newTranslate = currentTranslate + diff;
        
        // 添加边界阻力
        const maxTranslate = 0;
        const minTranslate = -(pages.length - 1) * getPageWidth();
        
        if (newTranslate > maxTranslate) {
            slider.style.transform = `translateX(${newTranslate * 0.3}px)`;
        } else if (newTranslate < minTranslate) {
            const overScroll = minTranslate - newTranslate;
            slider.style.transform = `translateX(${(minTranslate - overScroll * 0.3)}px)`;
        } else {
            slider.style.transform = `translateX(${newTranslate}px)`;
        }
    }

    function touchEnd(event) {
        if (!isDragging) return;
        
        isDragging = false;
        slider.style.transition = 'transform 0.3s ease-in-out';
        
        const currentX = event.changedTouches[0].clientX;
        const diff = currentX - startX;
        const threshold = getPageWidth() * 0.2; // 20% threshold
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentPage > 0) {
                currentPage--;
            } else if (diff < 0 && currentPage < pages.length - 1) {
                currentPage++;
            }
        }
        
        updateSliderPosition();
    }

    // 添加事件监听器
    prevBtn.addEventListener('click', () => goToPage('prev'));
    nextBtn.addEventListener('click', () => goToPage('next'));
    
    // 触摸事件
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchmove', touchMove);
    slider.addEventListener('touchend', touchEnd);
    
    // 窗口大小改变时重新计算
    const handleResize = debounce(() => {
        updateSliderPosition(false);
    }, 100);
    
    window.addEventListener('resize', handleResize);

    // 添加键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPage('prev');
        } else if (e.key === 'ArrowRight') {
            goToPage('next');
        }
    });

    // 初始化
    updateSliderPosition(false);
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}