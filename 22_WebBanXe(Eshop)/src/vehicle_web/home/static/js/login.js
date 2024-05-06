let logincontainer = document.getElementById('login-form');

toggle = () => {
    logincontainer.classList.toggle('sign-in');
    logincontainer.classList.toggle('sign-up');
};

setTimeout(() => {
    logincontainer.classList.add('sign-in');
}, 200);

document.getElementById('login-button').addEventListener('click', function () {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Kiểm tra xem email và password có được nhập hay không
    if (!email || !password) {
        alert('Vui lòng nhập email và mật khẩu');
        return;
    }

    // Gửi yêu cầu POST đến API endpoint để xác minh đăng nhập
    fetch('/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Đăng nhập không thành công');
        }
        return response.json();
    })
    .then(data => {
        // Xử lý phản hồi từ API endpoint (ví dụ: chuyển hướng hoặc hiển thị thông báo)
        console.log(data);
        alert('Đăng nhập thành công');
        window.location.href = '/'; // Chuyển hướng về trang chính sau khi đăng nhập thành công
    })
    .catch(error => {
        // Xử lý lỗi
        console.error('Error:', error);
        alert('Đăng nhập không thành công');
    });
});

document.getElementById('signup-button').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Kiểm tra xem username, email, password và confirm password có được nhập và khớp nhau hay không
    if (!username || !email || !password || !confirmPassword) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
    }
    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp');
        return;
    }

    // Gửi yêu cầu POST đến API endpoint để đăng ký
    fetch('/api/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, email: email, password: password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Đăng ký không thành công');
        }
        return response.json();
    })
    .then(data => {
        // Xử lý phản hồi từ API endpoint (ví dụ: hiển thị thông báo)
        console.log(data);
        alert('Đăng ký thành công');
        window.location.href = '/login/'; // Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
    })
    .catch(error => {
        // Xử lý lỗi
        console.error('Error:', error);
        alert('Đăng ký không thành công');
    });
});

