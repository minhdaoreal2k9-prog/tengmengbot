// script.js (Dùng để kích hoạt hiệu ứng cuộn)

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Logic cho Hiệu ứng Fade-in khi cuộn
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Thêm class 'visible' để kích hoạt CSS transition
                entry.target.classList.add('visible');
                // Dừng theo dõi sau khi đã hiện
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Kích hoạt khi 10% của mục lọt vào màn hình
    });

    // Theo dõi tất cả các khu vực có class .animated-section
    const sections = document.querySelectorAll('.animated-section');
    sections.forEach((section) => {
        observer.observe(section);
    });

    // 2. Logic đóng menu mobile khi bấm vào 1 link
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('#nav-toggle');
    navMenu.addEventListener('click', (e) => {
        // Nếu bấm vào một link (<a>) thì tự động tắt checkbox (để đóng menu)
        if (e.target.tagName === 'A') {
            navToggle.checked = false;
        }
    });

});