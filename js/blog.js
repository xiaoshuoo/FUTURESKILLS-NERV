const burgerBtn = document.getElementById("burgerBtn");
const mainMenu  = document.getElementById("mainMenu");

burgerBtn.addEventListener("click", function () {
  mainMenu.classList.toggle("open");
});

const pilotLink = document.getElementById("pilotLink");
const pilotData = localStorage.getItem("currentUser");
let pilotName   = "ГОСТЬ";

if (pilotData != null) {
  const pilot = JSON.parse(pilotData);
  pilotLink.textContent = "ПИЛОТ: " + pilot.name;
  pilotLink.href        = "cabinet.html";
  pilotName             = pilot.name;
}

function setupPost(n) {
  const readBtn    = document.getElementById("readBtn" + n);
  const fullText   = document.getElementById("fullText" + n);
  const likeBtn    = document.getElementById("likeBtn" + n);
  const likeCount  = document.getElementById("likeCount" + n);
  const shareBtn   = document.getElementById("shareBtn" + n);
  const shareMsg   = document.getElementById("shareMsg" + n);
  const commentBtn = document.getElementById("commentBtn" + n);
  const commentIn  = document.getElementById("commentInput" + n);
  const commentLs  = document.getElementById("commentList" + n);
  const commentErr = document.getElementById("commentError" + n);

  readBtn.addEventListener("click", function () {
    if (fullText.classList.contains("hidden")) {
      fullText.classList.remove("hidden");
      readBtn.textContent = "Свернуть";
    } else {
      fullText.classList.add("hidden");
      readBtn.textContent = "Читать полностью";
    }
  });

  let likes = 0;
  let liked = false;
  likeBtn.addEventListener("click", function () {
    if (liked == false) {
      likes = likes + 1;
      liked = true;
      likeBtn.classList.add("liked");
    } else {
      likes = likes - 1;
      liked = false;
      likeBtn.classList.remove("liked");
    }
    likeCount.textContent = likes;
  });

  let fire = 0;
  let wow  = 0;
  let up   = 0;

  document.getElementById("reactFire" + n).addEventListener("click", function () {
    fire = fire + 1;
    document.getElementById("fire" + n).textContent = fire;
  });

  document.getElementById("reactWow" + n).addEventListener("click", function () {
    wow = wow + 1;
    document.getElementById("wow" + n).textContent = wow;
  });

  document.getElementById("reactUp" + n).addEventListener("click", function () {
    up = up + 1;
    document.getElementById("up" + n).textContent = up;
  });

  shareBtn.addEventListener("click", function () {
    const link = window.location.href.split("#")[0] + "#post" + n;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      shareMsg.textContent = "SYNC OK: ссылка скопирована";
    } else {
      prompt("Скопируйте ссылку:", link);
    }
  });

  const saved  = localStorage.getItem("comments" + n);
  let comments = [];
  if (saved != null) {
    comments = JSON.parse(saved);
  }

  function drawComments() {
    let html = "";
    for (let i = 0; i < comments.length; i++) {
      html = html + '<div class="comment-item"><span>' + comments[i].author + ':</span> ' + comments[i].text + '</div>';
    }
    commentLs.innerHTML = html;
  }
  drawComments();

  commentBtn.addEventListener("click", function () {
    let value = commentIn.value.trim();
    commentErr.textContent = "";

    if (value == "") {
      commentErr.textContent = "ОШИБКА SYNC: пустой сигнал не принят";
    } else {
      value = value.replace("<", "&lt;").replace(">", "&gt;");
      comments.push({ author: pilotName, text: value });
      localStorage.setItem("comments" + n, JSON.stringify(comments));
      commentIn.value = "";
      drawComments();
    }
  });
}

for (let p = 1; p <= 3; p++) {
  setupPost(p);
}
