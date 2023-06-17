const isLogged = sessionStorage.hasOwnProperty("UserEmail")
if (isLogged) {
    let url = window.location.href;
    let newUrl = url.replace("/unauth/", "/auth/");
    location.assign(newUrl);
}