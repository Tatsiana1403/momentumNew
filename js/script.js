const time = document.querySelector(".time");

function showTime() {
  const date = new Date();

  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate(); //вызов функции дата
  showGreeting(); //вызов функции приветствие
}
showTime();

function showDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const dateNow = document.querySelector(".date");
  const currentDate = date.toLocaleDateString("en-US", options);
  dateNow.textContent = currentDate;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  getTimeOfDay();
  const greeting = document.querySelector(".greeting");
  greeting.textContent = greetingText;
}

let name = document.querySelector(".name");

function setLocalStorage() {
  localStorage.setItem("name", name.value);
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}
window.addEventListener("load", getLocalStorage);

//Время дня
function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 0 && hours < 6) {
    return "night";
  }
  if (hours >= 6 && hours < 12) {
    return "morning";
  }
  if (hours >= 12 && hours < 18) {
    return "afternoon";
  }
  if (hours >= 18 && hours <= 23) {
    return "evening";
  }
}

let randomNum = getRandomNum(1, 20);

//Получение числа для изображеня
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

//Смена изображений
function setBg() {
  const timeOfDay = getTimeOfDay();
  const body = document.getElementsByTagName("body");
  let bgNum = String(randomNum).padStart(2, 0);
  if (timeOfDay === "night") {
    body[0].style.backgroundImage = `url('https://github.com/rolling-scopes-school/stage1-tasks/blob/assets/images/night/${bgNum}.jpg?raw=true')`;
  }
  if (timeOfDay === "morning") {
    body[0].style.backgroundImage = `url('https://github.com/rolling-scopes-school/stage1-tasks/blob/assets/images/morning/${bgNum}.jpg?raw=true')`;
  }
  if (timeOfDay === "afternoon") {
    body[0].style.backgroundImage = `url('https://github.com/rolling-scopes-school/stage1-tasks/blob/assets/images/afternoon/${bgNum}.jpg?raw=true')`;
  }
  if (timeOfDay === "evening") {
    body[0].style.backgroundImage = `url('https://github.com/rolling-scopes-school/stage1-tasks/blob/assets/images/evening/${bgNum}.jpg?raw=true')`;
  }
}
setBg();

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

function getSlideNext() {
  if (randomNum < 20) {
    randomNum++;
  } else {
    randomNum = 1;
  }
  setBg();
}
function getSlidePrev() {
  if (randomNum > 1) {
    randomNum--;
  } else {
    randomNum = 20;
  }
  setBg();
  console.log(randomNum);
}

//Погода
let city = document.querySelector(".city");
city.addEventListener("change", function getWeather3() {
  getWeather();
});

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=eg&appid=6a676a2e0952050636988bfee67e78b3&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed ${Math.round(data.wind.speed)}m/s`;
  humidity.textContent = `Humidity ${Math.round(data.main.humidity)}%`;
}
/*async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=6a676a2e0952050636988bfee67e78b3&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
}*/
getWeather();

//Аудиоплеер
let playNum = 0;
const audio = new Audio();
let isPlay = false;
function playAudio() {
  audio.src = playList[playNum].src;
  //audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }
  play.classList.toggle("pause");
}

const play = document.querySelector(".play");
play.addEventListener("click", playAudio);

import playList from "./playList.js";

const playListContainer = document.querySelector(".play-list");
for (let i = 0; i < playList.length; i++) {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = playList[i].title;
  playListContainer.append(li);
  // здесь ваш код
}

function playNext() {
  if (playNum === 3) {
    playNum = 0;
  } else {
    playNum++;
  }
  playAudio();
}
function playPrev() {
  if (playNum === 0) {
    playNum = 3;
  } else {
    playNum--;
  }
  playAudio();
}

const playNextBtn = document.querySelector(".play-next");
const playPrevBtn = document.querySelector(".play-prev");
playNextBtn.addEventListener("click", playNext);
playPrevBtn.addEventListener("click", playPrev);
