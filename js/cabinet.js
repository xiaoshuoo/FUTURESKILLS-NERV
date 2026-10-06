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
  { name: "Русский язык",            block: "social", price: 0 },
  { name: "Английский язык",         block: "social", price: 3500 },
  { name: "Китайский язык",          block: "social", price: 4000 },
  { name: "Обществознание",          block: "social", price: 0 },
  { name: "Юридическая грамотность", block: "social", price: 2500 },
  { name: "Физика",                  block: "tech",   price: 0 },
  { name: "Python",                  block: "tech",   price: 0 },
  { name: "JavaScript",              block: "tech",   price: 4500 },
  { name: "3D-моделирование",        block: "tech",   price: 5000 },
  { name: "Основы робототехники",    block: "tech",   price: 0 }
];

const passedCourses = [
  { name: "Русский язык",   mark: 5 },
  { name: "Обществознание", mark: 4 },
  { name: "Python",         mark: 5 },
  { name: "Физика",         mark: 3 }
];

const cabinetBox = document.getElementById("cabinetBox");
const noAccess   = document.getElementById("noAccess");
let user         = null;

if (localStorage.getItem("currentUser") == null) {
  cabinetBox.classList.add("hidden");
} else {
  noAccess.classList.add("hidden");
  cabinetBox.classList.remove("hidden");
  user = JSON.parse(localStorage.getItem("currentUser"));
  drawProfile();
  drawPassed();
  drawNotPassed();
}

function drawProfile() {
  document.getElementById("fioBox").textContent   = user.surname + " " + user.name + " " + user.patronymic;
  document.getElementById("loginBox").textContent = user.login;
  document.getElementById("emailBox").textContent = user.email;

  if (user.age != "") {
    document.getElementById("ageBox").textContent = user.age;
  }

  if (user.photo != "") {
    const img = document.getElementById("userPhoto");
    img.src = user.photo;
    img.classList.remove("hidden");
    document.getElementById("noPhoto").classList.add("hidden");
  }

  let enrolled = [];
  if (localStorage.getItem("enrolled") != null) {
    enrolled = JSON.parse(localStorage.getItem("enrolled"));
  }
  document.getElementById("enrolledBox").textContent = enrolled.length;
}

function drawPassed() {
  const body = document.getElementById("passedBody");
  let rows = "";
  let sum  = 0;

  for (let i = 0; i < passedCourses.length; i++) {
    rows = rows + "<tr>";
    rows = rows + "<td>" + passedCourses[i].name + "</td>";
    rows = rows + '<td class="mark-' + passedCourses[i].mark + '">' + passedCourses[i].mark + "</td>";
    rows = rows + "</tr>";
    sum = sum + passedCourses[i].mark;
  }

  body.innerHTML = rows;
  document.getElementById("avgBox").textContent = (sum / passedCourses.length).toFixed(2);
}

function drawNotPassed() {
  let social = 0;
  let tech   = 0;
  let free   = 0;
  let paid   = 0;
  let count  = 0;

  for (let i = 0; i < allCourses.length; i++) {
    let done = false;
    for (let j = 0; j < passedCourses.length; j++) {
      if (passedCourses[j].name == allCourses[i].name) {
        done = true;
      }
    }

    if (done == false) {
      count = count + 1;
      if (allCourses[i].block == "social") {
        social = social + 1;
      } else {
        tech = tech + 1;
      }
      if (allCourses[i].price == 0) {
        free = free + 1;
      } else {
        paid = paid + 1;
      }
    }
  }

  document.getElementById("notPassedCount").textContent = count;

  let list = "";
  list = list + "<li>Общественные науки: " + social + "</li>";
  list = list + "<li>Технические науки: " + tech + "</li>";
  list = list + "<li>Бесплатные: " + free + "</li>";
  list = list + "<li>Платные: " + paid + "</li>";
  document.getElementById("typeList").innerHTML = list;
}

function saveUser() {
  localStorage.setItem("currentUser", JSON.stringify(user));

  let users = [];
  if (localStorage.getItem("users") != null) {
    users = JSON.parse(localStorage.getItem("users"));
  }
  for (let i = 0; i < users.length; i++) {
    if (users[i].login == user.login) {
      users[i] = user;
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
}

const saveBtn   = document.getElementById("saveBtn");
const editError = document.getElementById("editError");
const editOk    = document.getElementById("editOk");

saveBtn.addEventListener("click", function () {
  editError.textContent = "";
  editOk.textContent    = "";

  const age  = document.getElementById("ageInput").value;
  const file = document.getElementById("photoInput").files[0];

  if (age == "" && file == undefined) {
    editError.textContent = "ОШИБКА SYNC: нет данных для записи";
    return;
  }

  if (age != "") {
    if (Number(age) < 5 || Number(age) > 100) {
      editError.textContent = "ОШИБКА SYNC: возраст вне допустимого диапазона";
      return;
    }
    user.age = age;
  }

  if (file == undefined) {
    saveUser();
    drawProfile();
    editOk.textContent = "SYNC OK: данные сохранены";
  } else {
    if (file.size > 5000000) {
      editError.textContent = "AT-FIELD: файл больше 5 МБ";
      return;
    }
    const reader = new FileReader();
    reader.onload = function () {
      user.photo = reader.result;
      saveUser();
      drawProfile();
      editOk.textContent = "SYNC OK: данные сохранены";
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("exitBtn").addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html";
});
