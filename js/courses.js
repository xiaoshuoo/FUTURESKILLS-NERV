const burgerBtn = document.getElementById("burgerBtn");
const mainMenu  = document.getElementById("mainMenu");

burgerBtn.addEventListener("click", function () {
  mainMenu.classList.toggle("open");
});

const pilotLink = document.getElementById("pilotLink");
const pilotData = localStorage.getItem("currentUser");

if (pilotData != null) {
  const pilot = JSON.parse(pilotData);
  pilotLink.textContent = "ПИЛОТ: " + pilot.name;
  pilotLink.href        = "cabinet.html";
}

const allCourses = [
  { name: "Русский язык",             block: "social", price: 0,    info: "Грамотность, сочинения, подготовка к экзаменам" },
  { name: "Английский язык",          block: "social", price: 3500, info: "Разговорная практика и грамматика" },
  { name: "Китайский язык",           block: "social", price: 4000, info: "Иероглифы, тоны, базовые диалоги" },
  { name: "Обществознание",           block: "social", price: 0,    info: "Общество, право, экономика" },
  { name: "Юридическая грамотность",  block: "social", price: 2500, info: "Права потребителя, договоры, заявления" },
  { name: "Физика",                   block: "tech",   price: 0,    info: "Механика, электричество, задачи" },
  { name: "Python",                   block: "tech",   price: 0,    info: "Первые программы и алгоритмы" },
  { name: "JavaScript",               block: "tech",   price: 4500, info: "Сайты, события, работа с DOM" },
  { name: "3D-моделирование",         block: "tech",   price: 5000, info: "Blender, создание моделей для печати" },
  { name: "Основы робототехники",     block: "tech",   price: 0,    info: "Датчики, моторы, сборка робота" }
];

const socialList = document.getElementById("socialList");
const techList   = document.getElementById("techList");
const statusBox  = document.getElementById("statusBox");
const btnAll     = document.getElementById("btnAll");
const btnFree    = document.getElementById("btnFree");
const btnPaid    = document.getElementById("btnPaid");

let filter = "all";

function drawCourses() {
  let socialHtml = "";
  let techHtml   = "";

  for (let i = 0; i < allCourses.length; i++) {
    const c = allCourses[i];
    let show = false;

    if (filter == "all") {
      show = true;
    }
    if (filter == "free" && c.price == 0) {
      show = true;
    }
    if (filter == "paid" && c.price > 0) {
      show = true;
    }

    if (show == true) {
      let card = '<div class="nerv-card course-card">';
      card = card + '<h3>' + c.name + '</h3>';
      card = card + '<p>' + c.info + '</p>';
      if (c.price == 0) {
        card = card + '<p class="tag-free">БЕСПЛАТНО</p>';
      } else {
        card = card + '<p class="tag-paid">' + c.price + ' руб.</p>';
      }
      card = card + '<button class="nerv-btn enroll-btn" data-index="' + i + '">Записаться</button>';
      card = card + '</div>';

      if (c.block == "social") {
        socialHtml = socialHtml + card;
      } else {
        techHtml = techHtml + card;
      }
    }
  }

  if (socialHtml == "") {
    socialHtml = '<p class="empty">// данные отсутствуют</p>';
  }
  if (techHtml == "") {
    techHtml = '<p class="empty">// данные отсутствуют</p>';
  }

  socialList.innerHTML = socialHtml;
  techList.innerHTML   = techHtml;

  const buttons = document.getElementsByClassName("enroll-btn");
  for (let j = 0; j < buttons.length; j++) {
    buttons[j].addEventListener("click", enrollClick);
  }
}

function enrollClick(event) {
  const index  = event.target.getAttribute("data-index");
  const course = allCourses[index];

  if (localStorage.getItem("currentUser") == null) {
    statusBox.style.color = "#e60012";
    statusBox.textContent = "ДОСТУП ЗАПРЕЩЕН: пилот не авторизован. Пройдите вход.";
    return;
  }

  let enrolled = [];
  if (localStorage.getItem("enrolled") != null) {
    enrolled = JSON.parse(localStorage.getItem("enrolled"));
  }

  let already = false;
  for (let i = 0; i < enrolled.length; i++) {
    if (enrolled[i] == course.name) {
      already = true;
    }
  }

  if (already == true) {
    statusBox.style.color = "#ff6a00";
    statusBox.textContent = "AT-FIELD: курс «" + course.name + "» уже в списке пилота.";
  } else {
    enrolled.push(course.name);
    localStorage.setItem("enrolled", JSON.stringify(enrolled));
    statusBox.style.color = "#39ff14";
    statusBox.textContent = "SYNC OK: пилот записан на курс «" + course.name + "».";
  }
}

btnAll.addEventListener("click", function () {
  filter = "all";
  btnAll.classList.add("tab-on");
  btnFree.classList.remove("tab-on");
  btnPaid.classList.remove("tab-on");
  drawCourses();
});

btnFree.addEventListener("click", function () {
  filter = "free";
  btnFree.classList.add("tab-on");
  btnAll.classList.remove("tab-on");
  btnPaid.classList.remove("tab-on");
  drawCourses();
});

btnPaid.addEventListener("click", function () {
  filter = "paid";
  btnPaid.classList.add("tab-on");
  btnAll.classList.remove("tab-on");
  btnFree.classList.remove("tab-on");
  drawCourses();
});

drawCourses();
