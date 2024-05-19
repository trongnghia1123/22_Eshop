let logincontainer = document.getElementById('login-form');

toggle = () => {
    logincontainer.classList.toggle('sign-in');
    logincontainer.classList.toggle('sign-up');
};

setTimeout(() => {
    logincontainer.classList.add('sign-in');
}, 200);