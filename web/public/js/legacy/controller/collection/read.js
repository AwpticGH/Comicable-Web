// Note : read nya udh ada di create.js

// let series = document.getElementById("series-title").innerText;
// let comicId;
// let userId;
//
// console.log(series);
//
// reference.child("comics").orderByChild("title").equalTo(series).once("value").then("value", (snapshot) => {
//     snapshot.forEach((dataSnapshot) => {
//         let value = dataSnapshot.val().title;
//         console.log("value : " + value);
//
//         if (value === series) {
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
//                         let value2 = dataSnapshot.val().series;
//
//                         if (isEqual(value1, userId) && isEqual(value2, series)) {
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