function logout() {
    sessionStorage.removeItem("UserEmail");
    let url = window.location.href;
    location.assign(url);
}