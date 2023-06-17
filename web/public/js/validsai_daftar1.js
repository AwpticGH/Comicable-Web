var isEmail = false;
function validasi(){
  var cek = document.getElementById("myemail");
  isEmail = false;
  for (var i = 0; i < cek.value.length; i++){
      var ch = cek.value.charAt(i);
      if(ch === "@"){
        isEmail = true;
        break;
        }
     }
  if (isEmail === false){
    document.getElementById("email").style.display = "block";
  } else{
    document.getElementById("email").style.display = "none";
  }
}
  //lanjut ke halaman selanjutnya
function lanjut(){
  if(isEmail===true){
    let email = document.getElementById("myemail").value;
    sessionStorage.setItem("email", email);
    window.location.href = "/web/unauth/daftar2.html";
  }
}
