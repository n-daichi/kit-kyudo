// --- 1. スライダーの制御 ---
function scrollSlider(sliderId, direction) {
    const wrapper = document.getElementById(sliderId);
    if (!wrapper) return;

    const scrollAmount = wrapper.clientWidth;
    wrapper.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });

    setTimeout(() => {
        updateDots(sliderId, wrapper);
    }, 400);
}

function updateDots(sliderId, wrapper) {
    const dotsContainer = document.getElementById('dots-' + sliderId);
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('.dot');
    const index = Math.round(wrapper.scrollLeft / wrapper.clientWidth);

    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// スワイプ操作でもドットを更新する設定
document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
    wrapper.addEventListener('scroll', () => {
        updateDots(wrapper.id, wrapper);
    });
});

// --- 2. ページ内リンク & 一番上に戻る (Smooth Scroll) ---
// ※ href が "#" のみ、または "#id" 形式（同一ページ内）のリンクだけ対象
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // 別ページへの遷移（例：event.html#xxx）は除外する
        if (!href || href.includes('.html')) return;

        e.preventDefault();

        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        }
    });
});


// --- 3. ハンバーガーメニューの開閉 ---
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    function closeMenu() {
        navMenu.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    }

    if (toggleBtn && navMenu) {
        // ハンバーガーボタンのクリック
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('is-open');
            toggleBtn.setAttribute('aria-expanded', isOpen);
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-times', isOpen);
            }
        });

        // メニュー外クリックで閉じる（ナビリンク以外）
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('is-open') &&
                !toggleBtn.contains(e.target) &&
                !navMenu.contains(e.target)) {
                closeMenu();
            }
        });

        // ナビリンクは通常遷移を妨げず、遷移後にメニューが残らないよう閉じる
        // ただし preventDefault はしない
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // 少し遅らせて閉じる（遷移を邪魔しないため）
                setTimeout(closeMenu, 50);
            });
        });
    }
});


// --- 4. 予定表の開閉（アコーディオン）---
document.addEventListener('click', (e) => {
    const header = e.target.closest('.collapsible-header');
    if (!header) return;

    const content = header.nextElementSibling;
    if (content && content.classList.contains('collapsible-content')) {
        header.classList.toggle('is-open');
        content.classList.toggle('is-open');
    }
});