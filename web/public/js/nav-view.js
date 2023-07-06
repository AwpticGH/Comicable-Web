const originalPageYOffset = window.pageYOffset;
window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (originalPageYOffset < currentScrollPos) {
        $("#myTopnav").css("opacity","0.5");
    } else {
        $("#myTopnav").css("opacity","1");
    }
}

document.addEventListener('mousemove', logKey);
function logKey(e) {
    if (window.pageYOffset !== originalPageYOffset) {
        if(e.clientY < 85){
            $("#myTopnav").css("opacity","1");
        } else {
            $("#myTopnav").css("opacity","0.5");
        }
    }
}
