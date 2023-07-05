
function updateData() {
    let name = document.getElementById("user-name").value;
    let phoneNumber = document.getElementById("user-phone-number").value;
    let address = document.getElementById("user-address").value;
    let dateOfBirth = document.getElementById("user-date-of-birth").value;
    let userId;
    let password;
    reference.child("users").orderByChild("email").equalTo(sessionStorage.getItem("UserEmail")).once("value").then(function(snapshot) {
        console.log("starting update");
        snapshot.forEach((dataSnapshot) => {
            let value = dataSnapshot.val().email;

            if (value === sessionStorage.getItem("UserEmail")) {
                console.log("found");
                userId = dataSnapshot.key;
                password = dataSnapshot.val().password;
            }

        });

        if (userId !== undefined) {
            let user = {
                email : sessionStorage.getItem("UserEmail"),
                password : password,
                name: name,
                phone_number : phoneNumber,
                address : address,
                date_of_birth : dateOfBirth,
                balance : 1000000
            }
            let updates = {};
            updates["/users/" + userId] = user;
            reference.update(updates);
        }
    });
}
