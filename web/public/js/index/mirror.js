const mirrorEls = document.querySelectorAll(".kanan2-isi");
const paginationMirrorTextEl = document.querySelector(".sidebar .kanan2 .atas .atas-kanan .pagination p");
const paginationMirrorPrevEl = document.querySelector(".sidebar .kanan2 .atas .atas-kanan .pagination-previous");
const paginationMirrorNextEl = document.querySelector(".sidebar .kanan2 .atas .atas-kanan .pagination-next");

let pageMirror = 1;
let paginationMirror = 6;
let lengthMirror = apiData.mirror.length;
let pagesMirror = Math.floor(lengthMirror / paginationMirror);
if (lengthMirror % pagesMirror > 0) {
    pagesMirror += 1;
}

let changePageMirror = (value) => {
    pageMirror += value;
    if (pageMirror >= 1 && pageMirror <= pagesMirror) {
        redrawPageMirror(pageMirror);
    }

    if (pageMirror < 1) {
        pageMirror = 1;
    }
    if (pageMirror > pagesMirror) {
        pageMirror = pagesMirror;
    }
};

function redrawPageMirror(value) {
    for (let i = 0; i < lengthMirror; i++) {
        let el = mirrorEls[i];
        el.style.display = (Math.floor(i / paginationMirror) === value - 1) ? "flex" : "none";
    }
    paginationMirrorTextEl.innerText = value;
    paginationMirrorPrevEl.style.display = (value <= 1) ? "none" : "inline-block";
    paginationMirrorNextEl.style.display = (value >= pagesMirror) ? "none" : "inline-block";
}

redrawPageMirror(pageMirror);