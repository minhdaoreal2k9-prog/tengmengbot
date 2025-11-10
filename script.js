// script.js (Dùng để kích hoạt hiệu ứng cuộn, Tabs, và Nút về đầu trang)

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Logic cho Hiệu ứng Fade-in khi cuộn
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 
    });

    const sections = document.querySelectorAll('.animated-section');
    sections.forEach((section) => {
        observer.observe(section);
    });

    // 2. Logic đóng menu mobile khi bấm vào 1 link
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('#nav-toggle');
    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navToggle.checked = false;
        }
    });

    // 3. Logic cho Tabs Tính Năng (PHẦN QUAN TRỌNG KHIẾN NÚT HOẠT ĐỘNG)
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.feature-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');

            tabLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(item => item.classList.remove('active'));

            link.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 4. Logic cho Nút Về đầu trang (Scroll-to-Top)
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', () => {
        // Hiện nút khi cuộn xuống 300px
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Xử lý cuộn mượt khi bấm
    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
