const formUpdate = document.querySelector("#form-update-user");
formUpdate.addEventListener("submit", verifikasi);

let tulisan = ""
function readURL_tambahkomik(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            $('#blah1').attr('src', e.target.result);
            let size = $(".fileSize1")[0].files[0].size;
            size = Math.floor(size/1024)
            $("#size1").text("Ukuran file : "+size + "KB")
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function readURL_verifakun(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            $('#blah2').attr('src', e.target.result);
            let size = $(".fileSize2")[0].files[0].size;
            size = Math.floor(size / 1024)
            $("#size2").text("Ukuran file : " + size + "KB")
        };
        reader.readAsDataURL(input.files[0]);
    }
}

//fungsi dropdown menu

$(document).ready(function() {
  $(".kanan>i").click(function(){
    $("#dropdown").slideToggle();
  });
});
function closeDrop(){
  if($("#dropdown").css("display") != "none"){
    $("#dropdown").slideToggle();
  }
}

function tengokIsi(event){
  event.preventDefault();
  let kosong = false
  let inputan = $(terbuka +" > .modal-konten > form > .input-container").find("input");
  console.log(inputan);
  inputan.each(function(index, el) {
    if ($(el).val() == "") {
      console.log('ada yang kosong nih');
      kosong = true;
    }
    else{
      console.log('terisi');
    }
  });
  return kosong;
}

let terbuka;

function verif() {
    $("#verif").fadeToggle();
    terbuka = "#verif";
    tulisan = "selamat! verifikasi berhasil dan telah tersimpan dalam sistem.";
    $(".content > p").text(tulisan);
}

function profil() {
    $("#profil").fadeToggle();
    terbuka = "#profil";
    tulisan = "selamat! edit profil berhasil dan telah tersimpan.";
    $(".content > p").text(tulisan);
}

function tutup() {
    $(terbuka).fadeToggle();
}

function verifikasi(event){
    if(tengokIsi(event)){
        $('.content2').css('opacity', '1');
        $('.content2').css('visibility','visible');
    } else {
        formUpdate.submit();
        $('.content').css('opacity', '1');
        $('.content').css('visibility','visible');
    }
}
function closeverif(){
  if(tengokIsi()){
    $('.content2').css('opacity', '0');
    $('.content2').css('visibility','hidden');
  }else {
    $('.content').css('opacity', '0');
    $('.content').css('visibility','hidden');
    tutup();
  }
}

const confirmLogout = () => {
    $("#confirm-logout").fadeToggle();
    terbuka = "#confirm-logout";
};
