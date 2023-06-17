// Note : read nya udh ada di create.js

// let comic = document.getElementById("comic-title").innerText;
// let comicId;
// let userId;
//
// console.log(comic);
//
// reference.child("comics").orderByChild("title").equalTo(comic).once("value").then("value", (snapshot) => {
//     snapshot.forEach((dataSnapshot) => {
//         let value = dataSnapshot.val().title;
//         console.log("value : " + value);
//
//         if (value === comic) {
//             comicId = dataSnapshot.key;
//             console.log("comicId : " + comicId);
//         }
//     })
//
//     if (comicId !== null) {
//         let email = sessionStorage.getItem("UserEmail");
//         reference.child("users").orderByChild("email").equalTo(email).once("value").then("value", (snapshot) => {
//             snapshot.forEach((dataSnapshot) => {
//                 let value = dataSnapshot.val().email;
//
//                 if (value === email) {
//                     userId = dataSnapshot.key;
//                     console.log("userId : " + userId);
//                 }
//             });
//
//             if (userId !== null) {
//                 reference.child("collections").orderByChild("user").equalTo("userId").once("value").then("value", (snapshot) => {
//                     snapshot.forEach((dataSnapshot) => {
//                         let value1 = dataSnapshot.val().user;
//                         let value2 = dataSnapshot.val().comic;
//
//                         if (isEqual(value1, userId) && isEqual(value2, comic)) {
//                             disableButton();
//                         }
//                     });
//                 });
//             }
//         });
//     }
// });
//
// function isEqual(string1, string2) {
//     return string1 === string2;
// }
//
// function disableButton() {
//     let button = document.getElementById("btn-beli");
//     button.readOnly = true;
// }