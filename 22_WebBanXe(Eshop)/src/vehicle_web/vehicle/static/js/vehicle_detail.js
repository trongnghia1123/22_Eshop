// JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const detailButtons = document.querySelectorAll('.btn-product');

    detailButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const productId = this.dataset.id;
            searchProductsById(productId);
        });
    });

    document.getElementById('search-button').addEventListener('click', function () {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        searchProducts(searchTerm);
    });
});

function searchProducts(searchTerm) {
    fetch(`/api/vehicles/?search=${searchTerm}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            showFilteredProducts(products);
        })
        .catch(error => {
            console.error('Error:', error);
            // Hiển thị thông báo lỗi trên giao diện người dùng nếu cần thiết
        });
}

function redirectToDetail(vehicleId) {
    window.location.href = `/api/vehicle/${vehicleId}/`;
}

// function searchProductsById(vehicleId) {
//     fetch(`/api/vehicle/${vehicleId}/`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(vehicle => {
//             window.location.href = `/vehicle/${vehicle.id}/`; // Chuyển hướng sau khi nhận dữ liệu
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             // Hiển thị thông báo lỗi trên giao diện người dùng nếu cần thiết
//         });
// }


function showFilteredProducts(products) {
    var html = '';
    if (products.length !== 0) {
        products.forEach(product => {
            html += `<div class="col-md-4 col-sm-6 card">
                        <img src="${product.image}" alt="">
                        <p>${product.title}</p>
                        <h6>Giá chỉ từ: <span>${product.price}</span></h6>
                        <button class="btn btn-product" onclick="redirectToDetail(${product.id})"><span>Chi tiết</span></button>
                    </div>`;
        });
    } else {
        html += `<h1>Danh sách trống</h1>`;
    }
    document.getElementById('product-list').innerHTML = html;
}
/* *****************************Hàm Load Product******************************** */
function loadProducts() {
    fetch("/api/vehicles/")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            showFilteredProducts(products);
        })
        .catch(error => {
            console.error('Error:', error);
            // Hiển thị thông báo lỗi trên giao diện người dùng nếu cần thiết
        });
}
loadProducts();