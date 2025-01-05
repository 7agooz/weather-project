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
    console.log(dataInfo);
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

  
  let container = "";
  for (let i = 1; i <= 2; i++) 
    {
    let allDays =  dataInfo.forecast.forecastday[i];
    let allDate = new Date(dataInfo.forecast.forecastday[i].date);
    let allDateName = allDate.toLocaleString(`en-us`, { weekday: "long" });
    container += `
     <div class="col-lg-4 col-md-12 col-sm-12">
            <div class="head text-center">
              <div class="day" id="currentDay2">${allDateName}</div>
            </div>
            <div class="data h-100">
              <div class="current-cond-img text-center">
                <img src="https:${dataInfo.forecast.forecastday[i].day.condition.icon}" id="condImg2" class="w-25" alt="" />
              </div>
              <h3 class="text-center fw-bolder" id="degree2Max">${dataInfo.forecast.forecastday[i].day.maxtemp_c}°C</h3>
              <h4 class="text-center" id="degree2Min">${dataInfo.forecast.forecastday[i].day.mintemp_c}°C</h4>
              <div class="text-center cond" id="condition2"></div>
            </div>
          </div>`
        }
         days.innerHTML += container;
  }