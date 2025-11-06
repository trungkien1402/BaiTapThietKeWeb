document.addEventListener('DOMContentLoaded', function() {
    
    // --- Logic Ẩn/Hiện Danh mục (Giữ nguyên) ---
    // ... (Đoạn code ẩn/hiện danh mục) ...

    // --- Logic Carousel (Chỉ dùng Mũi Tên) ---
    const track = document.getElementById('productTrack');
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');
    
    // Khai báo hằng số
    const TRANSITION_TIME_MS = 500; 
    
    if (track) {
        const cards = document.querySelectorAll('.product-card');
        const realProducts = 5; // Số lượng sản phẩm gốc (index 0 đến 4)
        let currentIndex = 0;
        
        // --- Tính toán kích thước thẻ (bao gồm gap 15px) ---
        const getCardWidth = () => {
            const firstCard = cards[0];
            if (!firstCard) return 0;
            const style = window.getComputedStyle(track);
            const gap = parseInt(style.getPropertyValue('gap')) || 15;
            return firstCard.offsetWidth + gap;
        };
        
        // Hàm cập nhật vị trí cuộn
        function updateCarousel() {
            const cardWidth = getCardWidth();
            const offset = -currentIndex * cardWidth;
            track.style.transform = `translateX(${offset}px)`;
        }
        
        // --- Logic Vòng Lặp Mượt Tới ---
        const loopForward = () => {
            track.style.transition = `transform ${TRANSITION_TIME_MS}ms ease-in-out`;
            currentIndex = realProducts; // Cuộn đến thẻ nhân bản (index 5)
            updateCarousel();

            // Nhảy tức thời về thẻ gốc (index 0) sau khi cuộn xong
            setTimeout(() => {
                track.style.transition = 'none'; 
                currentIndex = 0; 
                updateCarousel();
                
                setTimeout(() => {
                     track.style.transition = `transform ${TRANSITION_TIME_MS}ms ease-in-out`;
                }, 50);

            }, TRANSITION_TIME_MS);
        };
        
        // --- Khởi tạo ban đầu ---
        updateCarousel(); 
        track.style.transition = `transform ${TRANSITION_TIME_MS}ms ease-in-out`;

        // --- Logic Mũi Tên Trái (PREV) ---
        prevArrow.addEventListener('click', () => {
            
            if (currentIndex === 0) {
                 // Nhảy tức thời về thẻ 1 nhân bản (index 5)
                 track.style.transition = 'none';
                 currentIndex = realProducts; 
                 updateCarousel();

                 // Cuộn ngược mượt mà về thẻ 5 gốc (index 4)
                 setTimeout(() => {
                    track.style.transition = `transform ${TRANSITION_TIME_MS}ms ease-in-out`;
                    currentIndex = realProducts - 1; 
                    updateCarousel();
                 }, 50);
                 
            } else {
                // Cuộn bình thường
                currentIndex--;
                track.style.transition = `transform ${TRANSITION_TIME_MS}ms ease-in-out`;
                updateCarousel();
            }
        });

        // --- Logic Mũi Tên Phải (NEXT) ---
        nextArrow.addEventListener('click', () => {
            
            if (currentIndex === realProducts - 1) {
                 // Nếu đang ở thẻ 5 gốc, bắt đầu vòng lặp
                 currentIndex++; 
                 loopForward();
            } else {
                // Cuộn bình thường
                currentIndex++;
                updateCarousel();
            }
        });
        
        // ... (Logic resize) ...
    } 
});