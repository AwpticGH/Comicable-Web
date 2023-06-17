function createData() {
    let comic = document.getElementById("comic-title").innerText;
    console.log("comic : " + comic);
    let userId;
    let comicId;
    let email = sessionStorage.getItem("UserEmail");
    reference.child("users").orderByChild('email').equalTo(email).once('value').then((snapshot) => {
        snapshot.forEach((dataSnapshot) => {
            let data = dataSnapshot.val().email;
            if (email === data) {
                console.log("email found");
                userId = dataSnapshot.key;
            }
        });

        if (userId != undefined) {
            reference.child("comics").orderByChild("title").equalTo(comic).once("value").then((snapshot) => {
                snapshot.forEach((dataSnapshot) => {
                    let data = dataSnapshot.val().title;

                    if (data === comic) {
                        comicId = dataSnapshot.key;
                        console.log("comicId : " + comicId);
                    }
                })

                if (comicId !== undefined) {
                    let hasComic;
                    reference.child("collections").orderByChild("user").equalTo(userId).once("value").then((snapshot) => {
                        snapshot.forEach((dataSnapshot) => {
                            let data1 = dataSnapshot.val().user;
                            let data2 = dataSnapshot.val().comic;

                            if (isEqual(data1, userId) && isEqual(data2, comicId)) {
                                hasComic = true;
                            }
                        })
                        if (hasComic) {
                            alert("You Already Have That Comic!");
                        }
                        else {
                            let collection = {
                                user : userId,
                                comic : comicId
                            }
                            let key = reference.child("collections").push().key;
                            let updates = {};
                            updates["/collections/" + key] = collection;
                            reference.update(updates);
                            alert("You Have Successfully Bought A Comic");
                        }
                    })
                }
            });
        }
    });
}

function isEqual(string1, string2) {
    return string1 === string2;
}