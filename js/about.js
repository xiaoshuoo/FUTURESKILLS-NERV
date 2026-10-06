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

const officeStatus = document.getElementById("officeStatus");
const now          = new Date();
const day          = now.getDay();
const hour         = now.getHours();

if (day >= 1 && day <= 5 && hour >= 9 && hour < 18) {
  officeStatus.textContent = "NERV HQ: штаб открыт";
} else {
  officeStatus.textContent = "NERV HQ: штаб закрыт. Режим ожидания";
  officeStatus.classList.add("closed");
}

const copyBtn  = document.getElementById("copyBtn");
const mailText = document.getElementById("mailText");
const copyMsg  = document.getElementById("copyMsg");

copyBtn.addEventListener("click", function () {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(mailText.textContent);
    copyMsg.style.color = "#39ff14";
    copyMsg.textContent = "SYNC OK: адрес скопирован";
  } else {
    copyMsg.style.color = "#e60012";
    copyMsg.textContent = "ОШИБКА SYNC: буфер обмена недоступен";
  }
});
