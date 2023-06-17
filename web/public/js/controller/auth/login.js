let form = document.getElementById("loginForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    // reference.child("Users").once("value").then((snapshot) => {
    //
    //     snapshot.forEach((data) => {
    //         let email = data.val().email;
    //         console.log(email);
    //     });
    // });

    reference.child("users").orderByChild('email').equalTo(email).once('value').then((snapshot) => {
        console.log("masuk fungsi login");
        let found = false;
        snapshot.forEach(function(dataSnapshot) {
            let dataEmail = dataSnapshot.val().email;
            let dataPassword = dataSnapshot.val().password;
            console.log(dataEmail);
            console.log(dataPassword);

            if (isEqual(email, dataEmail)) {
                console.log("email found");
                if (isEqual(pass, dataPassword)) {
                    console.log("password equal");
                    found = true;
                    let verified = dataSnapshot.val().name !== undefined;
                    let balance;
                    if (verified) {
                        balance = dataSnapshot.val().balance;
                        sessionStorage.setItem("UserVerified", verified);
                        sessionStorage.setItem("UserBalance", balance);
                    }

                    sessionStorage.setItem('UserEmail', email);
                    alert('Login successfully!');
                    location.assign("/web/auth/index.html");
                }
            }
        });

        if (!found) {
            console.log("gagal login");
            alert("Username or Password does not match");
        }
    });
});

function isEqual(string1, string2) {
    return string1 === string2;
}