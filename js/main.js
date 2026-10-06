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
  pilotLink.href        = "pages/cabinet.html";
}

const onlineCourses = [
  { name: "Python для начинающих",   info: "8 недель, видеоуроки и тесты" },
  { name: "Английский язык A1-A2",   info: "12 недель, живые вебинары" },
  { name: "Обществознание: ЕГЭ",     info: "10 недель, онлайн-практика" },
  { name: "Основы JavaScript",       info: "6 недель, задания с проверкой" }
];

const offlineCourses = [
  { name: "3D-моделирование",        info: "Лаборатория, главный офис" },
  { name: "Китайский язык",          info: "Группы до 8 человек" },
  { name: "Юридическая грамотность", info: "Вечерние занятия, 2 раза в неделю" },
  { name: "Физика: практикум",       info: "Опыты и лабораторные работы" }
];

const courseList = document.getElementById("courseList");
const btnOnline  = document.getElementById("btnOnline");
const btnOffline = document.getElementById("btnOffline");

function showCourses(list) {
  let html = "";
  for (let i = 0; i < list.length; i++) {
    html = html + '<div class="nerv-card">';
    html = html + '<h3>' + list[i].name + '</h3>';
    html = html + '<p>' + list[i].info + '</p>';
    html = html + '</div>';
  }
  courseList.innerHTML = html;
}

btnOnline.addEventListener("click", function () {
  showCourses(onlineCourses);
  btnOnline.classList.add("tab-on");
  btnOffline.classList.remove("tab-on");
});

btnOffline.addEventListener("click", function () {
  showCourses(offlineCourses);
  btnOffline.classList.add("tab-on");
  btnOnline.classList.remove("tab-on");
});

showCourses(onlineCourses);

const teachers = [
  { name: "Акаги Рицуко",            subject: "Программирование", rate: 4.9 },
  { name: "Сорью Аска Лэнгли",       subject: "Английский язык",  rate: 4.8 },
  { name: "Кацураги Мисато",         subject: "Обществознание",   rate: 4.7 },
  { name: "Фуюцуки Кодзо",           subject: "Юридическая грамотность", rate: 4.6 },
  { name: "Аянами Рей",              subject: "Китайский язык",   rate: 4.5 }
];

const teacherBody = document.getElementById("teacherBody");
let rows = "";

for (let i = 0; i < teachers.length; i++) {
  let stars = "";
  for (let s = 0; s < Math.round(teachers[i].rate); s++) {
    stars = stars + "★";
  }
  rows = rows + "<tr>";
  rows = rows + "<td>" + teachers[i].name + "</td>";
  rows = rows + "<td>" + teachers[i].subject + "</td>";
  rows = rows + '<td><span class="star">' + stars + "</span> " + teachers[i].rate + "</td>";
  rows = rows + "</tr>";
}
teacherBody.innerHTML = rows;

const orgScore   = document.getElementById("orgScore");
const orgVotes   = document.getElementById("orgVotes");
const voteSelect = document.getElementById("voteSelect");
const voteBtn    = document.getElementById("voteBtn");
const voteMsg    = document.getElementById("voteMsg");

let score = 4.7;
let votes = 120;

voteBtn.addEventListener("click", function () {
  if (localStorage.getItem("orgVoted") == "yes") {
    voteMsg.style.color = "#e60012";
    voteMsg.textContent = "AT-FIELD: повторное голосование запрещено";
  } else {
    const mark = Number(voteSelect.value);
    score = (score * votes + mark) / (votes + 1);
    votes = votes + 1;
    orgScore.textContent = score.toFixed(2);
    orgVotes.textContent = votes;
    voteMsg.style.color  = "#39ff14";
    voteMsg.textContent  = "Оценка принята. Синхронизация завершена";
    localStorage.setItem("orgVoted", "yes");
  }
});
