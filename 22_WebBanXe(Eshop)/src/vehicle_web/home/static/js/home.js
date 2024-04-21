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

function loadProducts() {
    // Gửi yêu cầu AJAX để lấy danh sách sản phẩm từ API Django
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/vehicles/", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var products = JSON.parse(xhr.responseText);
            showFilteredProducts(products);
            createPagination(products);
        } else {
            console.error('Request failed. Status code: ' + xhr.status);
        }
    };
    xhr.send();
}

function displayProducts(products, pageNumber) {
    // Tính chỉ số bắt đầu và chỉ số kết thúc của sản phẩm trên trang hiện tại
    var startIndex = (pageNumber - 1) * productsPerPage;
    var endIndex = Math.min(startIndex + productsPerPage, products.length);
    var html = '';
    for (var i = startIndex; i < endIndex; i++) {
        var product = products[i];
        html += `<div class="col-md-4 col-sm-6 card">
                        <img src="${product.image}" alt="">
                        <p>${product.title}</p>
                        <h6>Giá chỉ từ: <span>${product.price}</span></h6>
                        <button class="btn btn-product" onclick="redirectToDetail(${product.id})"><span>Chi tiết</span></button>
                    </div>`;
    }
    document.getElementById('product-list').innerHTML = html;
}

function createPagination(products) {
    var totalPages = Math.ceil(products.length / productsPerPage);
    var paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = ''; // Xóa nút phân trang hiện có
    for (var i = 1; i <= totalPages; i++) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#';
        a.innerText = i;
        a.onclick = function (event) {
            event.preventDefault();
            currentPage = parseInt(this.innerText); // Cập nhật trang hiện tại
            displayProducts(products, currentPage);
            highlightCurrentPage(this); // Gọi hàm để tô màu cho nút phân trang được nhấp
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
loadProducts();

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
