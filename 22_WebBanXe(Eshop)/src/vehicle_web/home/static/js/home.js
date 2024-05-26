/* *****************************SCROLL******************************** */
// hàm gán header khi scroll
window.addEventListener('scroll', function () {
    // Kiểm tra vị trí hiện tại của cuộn
    var brand = document.querySelector('.brand');
    var menu = document.querySelector('.menu');
    var scrollPosition = window.scrollY;

    // Nếu vị trí scroll lớn hơn 15vh qua phần brand
    if (scrollPosition > brand.offsetHeight) {
        // Thêm class 'sticky' cho thanh header
        menu.classList.add('sticky');
    } else {
        // Nếu không, loại bỏ class 'sticky'
        menu.classList.remove('sticky');
    }
});

// Hàm scroll lên đầu trang
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        document.getElementById('scrollToTopBtn').style.display = 'block';
    } else {
        document.getElementById('scrollToTopBtn').style.display = 'none';
    }
}

function scrollToTop() {
    document.documentElement.scrollTop = 350;
}

/* *****************************PAGINATION******************************** */
var currentPage = 1; // Trang hiện tại
var productsPerPage = 9; // Số sản phẩm trên mỗi trang
var allProducts = []; // Mảng chứa tất cả sản phẩm

function loadInitialProducts() {
    // Gửi yêu cầu AJAX để lấy 9 sản phẩm đầu tiên từ API Django
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/vehicles/?limit=9", true); // Giả sử API hỗ trợ tham số limit
    xhr.onload = function () {
        if (xhr.status === 200) {
            allProducts = JSON.parse(xhr.responseText);
            displayProducts(allProducts, 1); // Hiển thị 9 sản phẩm đầu tiên
            createPagination(); // Tạo phân trang (chỉ số trang)
        } else {
            console.error('Request failed. Status code: ' + xhr.status);
        }
    };
    xhr.send();
}

function loadProductsForPage(pageNumber) {
    // Gửi yêu cầu AJAX để lấy sản phẩm cho trang hiện tại
    var start = (pageNumber - 1) * productsPerPage;
    var limit = productsPerPage;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/vehicles/?offset=${start}&limit=${limit}`, true); // Giả sử API hỗ trợ tham số offset và limit
    xhr.onload = function () {
        if (xhr.status === 200) {
            var newProducts = JSON.parse(xhr.responseText);
            if (pageNumber === 1) {
                allProducts = newProducts;
            } else {
                allProducts = allProducts.concat(newProducts);
            }
            displayProducts(newProducts, pageNumber); // Hiển thị sản phẩm cho trang hiện tại
        } else {
            console.error('Request failed. Status code: ' + xhr.status);
        }
    };
    xhr.send();
}

function displayProducts(products, pageNumber) {
    // Hiển thị sản phẩm cho trang hiện tại
    var html = '';
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        html += `<div class="col-md-4 col-sm-6 card">
                        <img src="${product.image}" alt="">
                        <p>${product.title}</p>
                        <h6>Giá chỉ từ: <span>${product.price}</span></h6>
                        <button class="btn btn-product" onclick="redirectToDetail(${product.id})"><span>Chi tiết</span></button>
                        <button class="btn btn-product" onclick="addToCart(${product.id})">
                                <i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng
                            </button>
                    </div>`;
    }
    document.getElementById('product-list').innerHTML = html;
}

function createPagination() {
    var totalPages = Math.ceil(100 / productsPerPage); // Giả sử có 100 sản phẩm, điều chỉnh theo API thực tế
    var paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = ''; // Xóa nút phân trang hiện có

    // Tạo các nút phân trang
    for (var i = 1; i <= totalPages; i++) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#';
        a.innerText = i;
        a.onclick = function (event) {
            event.preventDefault();
            currentPage = parseInt(this.innerText); // Cập nhật trang hiện tại
            loadProductsForPage(currentPage); // Tải sản phẩm cho trang hiện tại
            highlightCurrentPage(this); // Tô màu cho nút phân trang được nhấp
        };
        li.appendChild(a);
        paginationElement.appendChild(li);
    }

    // Tô màu cho nút phân trang đầu tiên khi trang được tạo
    highlightCurrentPage(paginationElement.firstElementChild.firstElementChild);
}

function highlightCurrentPage(selectedPage) {
    // Loại bỏ class 'active' từ tất cả các nút phân trang
    var paginationElements = document.querySelectorAll('#pagination li');
    paginationElements.forEach(function (element) {
        element.classList.remove('active');
    });

    // Thêm class 'active' cho nút phân trang được chọn
    selectedPage.parentElement.classList.add('active');
}

// Gọi hàm loadInitialProducts() để tải 9 sản phẩm đầu tiên và sau đó tải toàn bộ sản phẩm
loadInitialProducts();



// ------------------------------------------------------------------
function redirectToDetail(title) {
    // Tìm sản phẩm trong danh sách sản phẩm theo tiêu đề
    var vehicle = vehicle.find(function(item) {
        return item.title === title;
    });

    if (vehicle) {
        // Chuyển hướng đến trang vehicle_detail với tham số id của sản phẩm
        window.location.href = `/vehicle_detail?id=${vehicle.id}`;
    } else {
        console.error('vehicle not found!');
    }
}