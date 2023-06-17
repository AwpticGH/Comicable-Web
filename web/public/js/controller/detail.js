// var dbRef = firebase.database().ref("Komik");
//
// var juki = sessionStorage.getItem("komik");
// dbRef.orderByChild("komikId").equalTo(juki).once('value', function(snapshot) {
//     snapshot.forEach(function(dataSnapshot) {
//         var data = dataSnapshot.val();
//         document.getElementById("judul").textContent = data.komikId;
//         document.getElementById("episode").textContent = data.episode + (" Episode");
//         document.getElementById("deskripsi").textContent = data.deskripsi;
//         document.getElementById("genre").textContent = "Genre : " + data.genre;
//     })
// });
// var authorId = sessionStorage.getItem("authorId");
// console.log(authorId);
//
// var authorRef = firebase.database().ref("Authors");
// authorRef.orderByChild("authorId").equalTo(authorId).once('value', function(snapshot) {
//     console.log("data");
//     snapshot.forEach(function(dataSnapshot) {
//         console.log("data2");
//         var data = dataSnapshot.val();
//
//         document.getElementById("author").textContent = data.authorName;
//     })
// });