const trendingEls = document.querySelectorAll(".cover1");
let startPointer = 0;
let endPointer = 6;

function clickedArrow(value) {

  startPointer += value;
  if (startPointer / trendingLength >= 1) {
    startPointer = 0;
  }
  if (startPointer < 0) {
    startPointer = trendingLength - 1;
  }

  endPointer += value;
  if (endPointer / trendingLength >= 1) {
    endPointer = 0;
  }
  if (endPointer < 0) {
    endPointer = trendingLength - 1;
  }

  for (let i = 0; i < 6; i++) {
    let imgEl = trendingEls[i].querySelector(".image-container img");
    let txtEl = trendingEls[i].querySelector(".text-container p");


    if ((startPointer + i) % trendingLength < trendingLength) {
      imgEl.src = apiData.trending[(startPointer + i) % trendingLength].thumbnail;
      txtEl.innerText = apiData.trending[(startPointer + i) % trendingLength].title;
    } else {
      imgEl.src = apiData.trending[(endPointer + i) % trendingLength].thumbnail;
      txtEl.innerText = apiData.trending[(endPointer + i) % trendingLength].title;
    }
  }
}