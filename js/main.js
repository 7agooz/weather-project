"use strict";
//first day//
var locationElement = document.getElementById("location");
var currentDegreeElement = document.getElementById("degree");
var dayElement = document.getElementById("currentDay");
var dayNumElement = document.getElementById("dayNum");
var currentDate = document.getElementById("currentDate");
var currentCondition = document.getElementById("condition");
var currentCondImg = document.getElementById("condImg");
var currnetHumidity = document.getElementById("currnetHumidity");
var currentWindKhp = document.getElementById("currentWindKhp");
var currentWindDir = document.getElementById("currentWindDir");
//2nd day//
var currentDay2 = document.getElementById("currentDay2");
var degree2Max = document.getElementById("degree2Max");
var degree2Min = document.getElementById("degree2Min");
var condition2 = document.getElementById("condition2");
//3rd day//
var currentDay3 = document.getElementById("currentDay3");
var degree3Max = document.getElementById("degree3Max");
var degree3Min = document.getElementById("degree3Min");
var condition3 = document.getElementById("condition3");
//search input//
var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function (e) {
  //   console.log(e.target.value);
  getData(e.target.value);
});
//current location//
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (current) {
    var lat = current.coords.latitude;
    var long = current.coords.longitude;
    getData(`${lat},${long}`);
  });
} else {
  console.log("not allowed"); // to be checked
}

async function getData(location) {
  try {
    var wData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&key=a25fb61ff3ee426a9bf193123241412`
    );
    var dataInfo = await wData.json();
    displayData(dataInfo);
    displayData2(dataInfo);
    displayData3(dataInfo)
  } catch (error) {

  }
}
/////////////////
//1st day function/
// /////////////////
function displayData(dataInfo) {
  var date = new Date(dataInfo.location.localtime);
  //day name//
  var dayName = date.toLocaleString(`en-us`, { weekday: "long" });
  dayElement.innerHTML = dayName;
  //day number//
  var dayNum = date.getDate();
  dayNumElement.innerHTML = dayNum;
  //month//
  var monthName = date.toLocaleString("en-us", { month: "long" });
  currentDate.innerHTML = monthName;
  //location//
  locationElement.innerHTML = dataInfo.location.name;
  //temperature//
  currentDegreeElement.innerHTML = `${dataInfo.current.temp_c}°C`;
  //condition image//
  var condImg = dataInfo.current.condition.icon;
  var conditionImg = `https:${condImg}`;
  currentCondImg.setAttribute("src", conditionImg);
  //condition//
  currentCondition.innerHTML = dataInfo.current.condition.text;
  //Humidity//
  currnetHumidity.innerHTML = `${dataInfo.current.humidity} %`;
  //wind speed//
  currentWindKhp.innerHTML = `${dataInfo.current.wind_kph} KM/H`;
  //wind direction//
  currentWindDir.innerHTML = dataInfo.current.wind_dir;
}
////////////////////////////////////////////////
//2nd day function//
///////////////////////////////////////////////
function displayData2(dataInfo) {
  var day2 = dataInfo.forecast.forecastday[1];
  var date2 = new Date(day2.date);
  //day name//
  var dayName2 = date2.toLocaleString(`en-us`, { weekday: "long" });
  currentDay2.innerHTML = dayName2;
  //condition image//
  var conidImg2 = day2.day.condition.icon;
  var conditionImg2 = `https:${conidImg2}`;
  condImg2.setAttribute("src", conditionImg2);
  //max temp//
  degree2Max.innerHTML = `${day2.day.maxtemp_c}°C`;
  //min temp//
  degree2Min.innerHTML = `${day2.day.mintemp_c}°`;
  //condition//
  condition2.innerHTML = day2.day.condition.text;
}
////////////////////////////////////////////////
//3rd day function//
///////////////////////////////////////////////
function displayData3(dataInfo){
    var day3 = dataInfo.forecast.forecastday[2];
    var date3 = new Date(day3.date);
    //day name//
    var dayName3 = date3.toLocaleString(`en-us`, { weekday: "long" });
    currentDay3.innerHTML = dayName3;
     //condition image//
  var conidImg3 = day3.day.condition.icon;
  var conditionImg3 = `https:${conidImg3}`;
  condImg3.setAttribute("src", conditionImg3);
  //max temp//
  degree3Max.innerHTML = `${day3.day.maxtemp_c}°C`;
  //min temp//
  degree3Min.innerHTML = `${day3.day.mintemp_c}°`;
  //condition//
  condition3.innerHTML = day3.day.condition.text;
}