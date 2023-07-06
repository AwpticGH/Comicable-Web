let isEmail = false;
function validasi(){
    let cek = document.getElementById("myemail");
    for (let i = 0; i < cek.value.length; i++){
        let ch = cek.value.charAt(i);
        if (ch === "@") {
            isEmail = true;
            break;
        }
    }
    if (isEmail === false){
        document.getElementById("email").style.display = "block";
    } else {
        document.getElementById("email").style.display = "none";
    }
}