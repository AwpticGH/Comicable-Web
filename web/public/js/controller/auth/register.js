const databaseRef = reference.child('users');
const email = sessionStorage.getItem("email");

document.getElementById('submitForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let password = document.getElementById("pass").value;

    if (!email || !password) {
        alert('Please fill in all the required fields.');
        return;
    }

    databaseRef.once('value').then(function(snapshot) {
        var data = snapshot.val().email;
        var emailExists = data === email;

        if (emailExists) {
            alert('Email exists.');
        } else {
            if (validate) {
                let confirmed = confirm('Are you sure the data is correct?');

                if (confirmed) {
                    save_user(password);
                }
            }
        }
    });
});

function validate() {
    return isPanjang === false && isPendek === false && iskKecil === true && iskBesar === true && iskAngka === true;
}

function save_user(password) {
    let uid = databaseRef.push().key;

    let data = {
        email: email,
        password: password
    }

    let updates = {};
    updates['/users/' + uid] = data;
    firebase.database().ref().update(updates);
    sessionStorage.removeItem("email");
    window.location.href = "/web/unauth/login.html";
}