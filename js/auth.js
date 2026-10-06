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

const tabLogin = document.getElementById("tabLogin");
const tabReg   = document.getElementById("tabReg");
const loginBox = document.getElementById("loginBox");
const regBox   = document.getElementById("regBox");

tabLogin.addEventListener("click", function () {
  loginBox.classList.remove("hidden");
  regBox.classList.add("hidden");
  tabLogin.classList.add("tab-on");
  tabReg.classList.remove("tab-on");
});

tabReg.addEventListener("click", function () {
  regBox.classList.remove("hidden");
  loginBox.classList.add("hidden");
  tabReg.classList.add("tab-on");
  tabLogin.classList.remove("tab-on");
});

const regBtn = document.getElementById("regBtn");

regBtn.addEventListener("click", function () {
  const surname    = document.getElementById("regSurname").value.trim();
  const name       = document.getElementById("regName").value.trim();
  const patronymic = document.getElementById("regPatronymic").value.trim();
  const login      = document.getElementById("regLogin").value.trim();
  const email      = document.getElementById("regEmail").value.trim();
  const pass       = document.getElementById("regPass").value;
  const pass2      = document.getElementById("regPass2").value;
  const rules      = document.getElementById("regRules").checked;

  const regError = document.getElementById("regError");
  const regOk    = document.getElementById("regOk");

  regError.textContent = "";
  regOk.textContent    = "";

  if (surname == "" || name == "" || patronymic == "" || login == "" || email == "" || pass == "" || pass2 == "") {
    regError.textContent = "ОШИБКА SYNC: все поля пилота должны быть заполнены";
    return;
  }

  if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
    regError.textContent = "ОШИБКА SYNC: адрес связи указан неверно";
    return;
  }

  if (pass.length < 6) {
    regError.textContent = "ОШИБКА SYNC: код доступа короче 6 символов";
    return;
  }

  if (pass != pass2) {
    regError.textContent = "ОШИБКА SYNC: коды доступа не совпадают";
    return;
  }

  if (rules == false) {
    regError.textContent = "AT-FIELD: примите правила организации";
    return;
  }

  let users = [];
  if (localStorage.getItem("users") != null) {
    users = JSON.parse(localStorage.getItem("users"));
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].login == login) {
      regError.textContent = "ОШИБКА SYNC: позывной «" + login + "» уже занят";
      return;
    }
  }

  const newUser = {
    surname    : surname,
    name       : name,
    patronymic : patronymic,
    login      : login,
    email      : email,
    password   : pass,
    age        : "",
    photo      : ""
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  regOk.textContent = "SYNC OK: пилот зарегистрирован. Выполните вход.";
});

const logBtn = document.getElementById("logBtn");

logBtn.addEventListener("click", function () {
  const login    = document.getElementById("logLogin").value.trim();
  const pass     = document.getElementById("logPass").value;
  const logError = document.getElementById("logError");

  logError.textContent = "";

  if (login == "" || pass == "") {
    logError.textContent = "ОШИБКА SYNC: введите позывной и код доступа";
    return;
  }

  let users = [];
  if (localStorage.getItem("users") != null) {
    users = JSON.parse(localStorage.getItem("users"));
  }

  let found = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].login == login && users[i].password == pass) {
      found = users[i];
    }
  }

  if (found == null) {
    logError.textContent = "ДОСТУП ЗАПРЕЩЕН: пилот не найден или код неверный";
  } else {
    localStorage.setItem("currentUser", JSON.stringify(found));
    window.location.href = "cabinet.html";
  }
});
