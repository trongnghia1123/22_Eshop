
// List tin tức
// const news = [
//     {
//         title: 'EQS Sedan',
//         description: 'Chọn cấu hình chiếc xe mơ ước của bạn ngay.',
//         image: './images/news1.avif',
//     },
//     {
//         title: 'MercedesTrophy Việt Nam',
//         description: 'Cập nhật thông tin chính thức về lịch thi đấu các mùa giải Golf MercedesTrophy 2024.',
//         image: './images/news2.avif',
//     },
//     {
//         title: 'Mercedes-Benz GLC mới',
//         description:
//             'Khám phá GLC thế hệ mới - mẫu xe mang đậm nét hiện đại, thể thao, vốn là dấu ấn đặc trưng của các dòng SUV từ Mercedes-Benz.',
//         image: './images/news3.avif',
//     },
//     {
//         title: 'Mercedes-AMG SL 43',
//         description: 'AMG SL làm sống dậy vẻ kinh điển của tay chơi Roadster trong một diện mạo mới.',
//         image: './images/news4.avif',
//     },
//     {
//         title: 'Vito Tourer',
//         description: 'Khởi đầu những hành trình mới trên Vito Tourer – luôn đủ chỗ cho tất cả.',
//         image: './images/news5.avif',
//     },
//     {
//         title: 'Khám phá xe Mercedes-Benz trên cửa hàng trực tuyến Online Store',
//         description: 'Nhanh chóng & Thuận tiện - Khám phá các mẫu xe hiện có tại Nhà phân phối trên toàn quốc.',
//         image: './images/news6.avif',
//     },
//     {
//         title: 'Các dòng xe thuần điện EQ từ Mercedes-Benz',
//         description: 'Tương lai di chuyển thuần điện xuất phát từ cam kết phát triển bền vững của Mercedes-Benz.',
//         image: './images/news7.avif',
//     },
//     {
//         title: 'Mercedes-AMG: 55 năm hiệu suất lái',
//         description: 'Mercedes-AMG đổi mới trên mọi hành trình khi vẫn giữ vững tinh thần làm chủ cuộc chơi.',
//         image: './images/news8.avif',
//     },
// ];

// /* *****************************LOAD NEWS******************************** */
// const newsPerPage = 4;
// let currentPage = 0;
// const numPages = Math.ceil(news.length / newsPerPage);
// let startItemIndex = 0;

// const carousel = document.getElementById('carousel');

// function showPage(page) {
//     carousel.innerHTML = `<div class="controls">
//                     <button id="prevBtn" class="btn btn-primary"><i class="ti-angle-left"></i></button>
//                     <button id="nextBtn" class="btn btn-primary"><i class="ti-angle-right"></i></button>
//                 </div>`;

//     const prevBtn = document.getElementById('prevBtn');
//     const nextBtn = document.getElementById('nextBtn');
//     prevBtn.addEventListener('click', showPrevPage);
//     nextBtn.addEventListener('click', showNextPage);
//     startItemIndex = page * newsPerPage;
//     const endItemIndex = Math.min(startItemIndex + newsPerPage, news.length);
//     for (let i = startItemIndex; i < endItemIndex; i++) {
//         const item = news[i];
//         const card = document.createElement('div');
//         card.classList.add('col-md-3', 'card');

//         const img = document.createElement('img');
//         img.classList.add('card-img-top');
//         img.src = item.image;
//         img.alt = item.title;

//         const cardBody = document.createElement('div');
//         cardBody.classList.add('card-body');

//         const title = document.createElement('h5');
//         title.classList.add('card-title');
//         title.textContent = item.title;

//         const description = document.createElement('p');
//         description.classList.add('card-text');
//         description.textContent = item.description;

//         const link = document.createElement('a');
//         link.classList.add('btn', 'btn-primary', 'btn-product');
//         link.href = '#';
//         link.textContent = 'Xem thêm';

//         cardBody.appendChild(title);
//         cardBody.appendChild(description);
//         cardBody.appendChild(link);

//         card.appendChild(img);
//         card.appendChild(cardBody);

//         carousel.appendChild(card);
//     }
// }

// function showNextPage() {
//     if (startItemIndex + newsPerPage < news.length) {
//         currentPage++;
//         showPage(currentPage);
//     }
// }

// function showPrevPage() {
//     if (startItemIndex - newsPerPage >= 0) {
//         currentPage--;
//         showPage(currentPage);
//     }
// }


// // Gọi hàm tạo các nút phân trang

// // Lọc sản phẩm khi click vào mục "Loại xe"
// document.querySelectorAll('.loai-xe').forEach((item) => {
//     item.addEventListener('click', function () {
//         const loaiXe = this.getAttribute('data-loai');
//         const filteredProducts = productList.filter((product) => product.loaiXe.toLowerCase() === loaiXe.toLowerCase());
//         showFilteredProducts(filteredProducts);
//     });
// });

// // Lọc sản phẩm khi click vào mục "Hãng xe"
// document.querySelectorAll('.hang-xe').forEach((item) => {
//     item.addEventListener('click', function () {
//         const hangXe = this.getAttribute('data-hang');
//         const filteredProducts = productList.filter((product) => product.hangXe.toLowerCase() === hangXe.toLowerCase());
//         showFilteredProducts(filteredProducts);
//     });
// });