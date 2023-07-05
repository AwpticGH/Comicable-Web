const latestEls = document.querySelectorAll(".isi .row");
const paginationLatestTextEl = document.querySelector(".isi .isi2 .atas .atas-kanan .pagination p");
const paginationLatestPrevEl = document.querySelector(".isi .isi2 .atas .atas-kanan .pagination-previous");
const paginationLatestNextEl = document.querySelector(".isi .isi2 .atas .atas-kanan .pagination-next");

let pageLatest = 1;
let paginationLatest = 5;
let lengthLatest = apiData.latest.length;
let pagesLatest = Math.floor(lengthLatest / paginationLatest);
if (lengthLatest % pagesLatest > 0) {
    pagesLatest += 1;
}

function changePageLatest(value) {
    pageLatest += value;
    if (pageLatest >= 1 && pageLatest <= pagesLatest) {
        redrawPageLatest(pageLatest);
    }

    if (pageLatest < 1) {
        pageLatest = 1;
    }
    if (pageLatest > pagesLatest) {
        pageLatest = pagesLatest;
    }
}

function redrawPageLatest(value) {
    for (let i = 0; i < lengthLatest; i++) {
        let row = latestEls[i];
        row.style.display = (Math.floor(i / paginationLatest) === value - 1) ? "block" : "none";
    }
    paginationLatestTextEl.innerText = value;
    paginationLatestPrevEl.style.display = (value <= 1) ? "none" : "inline-block";
    paginationLatestNextEl.style.display = (value >= pagesLatest) ? "none" : "inline-block";
}

redrawPageLatest(pageLatest);
