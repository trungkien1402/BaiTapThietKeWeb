document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Logic Ẩn/Hiện Danh mục (Dùng cho Mobile) ---
    const categoryHeader = document.querySelector('.categories-header');
    const categoryList = document.querySelector('.category-list');
    
    if (categoryHeader && categoryList) {
        
        categoryHeader.addEventListener('click', function() {
            // Kiểm tra kích thước màn hình để đảm bảo chỉ hoạt động trên Mobile
            if (window.innerWidth <= 768) {
                // Toggle display style (sử dụng style.display để ghi đè CSS media query)
                if (categoryList.style.display === 'block') {
                    categoryList.style.display = 'none';
                    // Đặt lại position: absolute; sau khi ẩn (hoặc bỏ qua)
                } else {
                    categoryList.style.display = 'block';
                    // Đảm bảo position: absolute; được thiết lập để nó không làm xô lệch trang
                    categoryList.style.position = 'absolute';
                    categoryList.style.top = categoryHeader.offsetHeight + 'px'; 
                }
            }
        });
        
        // Đặt lại display: block cho Desktop nếu người dùng resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                categoryList.style.display = 'block';
                categoryList.style.position = 'static'; // Quay lại flow bình thường
            } else {
                 // Đảm bảo nó ẩn lại khi chuyển sang Mobile
                 categoryList.style.display = 'none';
            }
        });

        // Thiết lập ban đầu trên mobile (đảm bảo ẩn)
        if (window.innerWidth <= 768) {
            categoryList.style.display = 'none';
        }
    }


    // --- 2. Logic Carousel (Giữ nguyên, chỉ dùng Mũi Tên) ---
    const track = document.getElementById('productTrack');
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');
    
    const TRANSITION_TIME_MS = 500; 
    
    if (track) {
        // Chỉ chạy carousel trên Desktop/Tablet (trên 768px)
        if (window.innerWidth > 768) {
            const cards = document.querySelectorAll('.product-card');
            const realProducts = cards.length; 
            let currentIndex = 0;
            
            // Tính toán kích thước thẻ
            const getCardWidth = () => {
                const firstCard = cards[0];
                if (!firstCard) return 0;
                const style = window.getComputedStyle(track.parentNode);
                const gap = parseInt(style.getPropertyValue('gap')) || 15;
                // Tính toán chiều rộng của một card + gap
                return firstCard.offsetWidth + gap; 
            };
            
            function updateCarousel() {
                const cardWidth = getCardWidth();
                const offset = -currentIndex * cardWidth;
                track.style.transform = `translateX(${offset}px)`;
            }

            // ... (Giữ nguyên logic prev/next của carousel) ...
            
            // Logic Mũi Tên Trái (PREV)
            prevArrow.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    track.style.transition = `transform ${TRANSITION_TIME_MS}ms ease-in-out`;
                    updateCarousel();
                } else {
                    // Nếu là thẻ đầu tiên, chuyển về thẻ cuối cùng (Tùy chọn)
                    currentIndex = realProducts - 5; // Hiển thị 5 thẻ cuối
                    updateCarousel();
                }
            });

            // Logic Mũi Tên Phải (NEXT)
            nextArrow.addEventListener('click', () => {
                // Giả định 5 thẻ hiển thị cùng lúc
                if (currentIndex < realProducts - 5) {
                    currentIndex++;
                    updateCarousel();
                } else {
                    currentIndex = 0; // Quay về đầu
                    updateCarousel();
                }
            });

            // Cập nhật lại vị trí khi cửa sổ thay đổi kích thước
            window.addEventListener('resize', () => {
                updateCarousel();
            });
            
            // Khởi tạo
            updateCarousel(); 
            track.style.transition = `transform ${TRANSITION_TIME_MS}ms ease-in-out`;

        } else {
             // Trên Mobile/Tablet, đảm bảo track không bị dịch chuyển
             track.style.transform = 'translateX(0)';
             // Cho phép cuộn ngang tự nhiên trên mobile
             const carouselContainer = document.querySelector('.product-carousel');
             if (carouselContainer) {
                 carouselContainer.style.overflowX = 'scroll';
                 carouselContainer.style.overflowY = 'hidden';
                 // Cần thêm CSS cho product-track để không wrap (thêm vào CSS)
             }
        }
    }
});