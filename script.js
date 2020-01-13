/* eslint-disable no-extend-native */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
function getUV(lat, lon) {
  // This is our API key. Add your own API key between the ""
  const APIKey = 'f905a700c670b74f604221d5fafaf985';
  // Here we are building the URL we need to query the database
  const queryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`;
  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function (response) {
    const uvi = response.value;
    $('#lblUV').text(uvi);
    if (uvi > 0 && uvi < 4) {
      // Green
      $('#lblUV').attr('class', 'p-1 btn-success');
    }
    if (uvi > 3 && uvi < 7) {
      // Yellow
      $('#lblUV').attr('class', 'p-1 btn-warning');
    }
    if (uvi > 6) {
      // Red
      $('#lblUV').attr('class', 'p-1 btn-danger');
    }
  });
}
function getFiveDay(city) {
  const dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const APIKey = 'f905a700c670b74f604221d5fafaf985';
  // Here we are building the URL we need to query the database
  const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`;
  console.log(queryURL);
  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function (response) {
    console.log(response);
    for (let x = 1; x <= 5; x++) {
      const day = new Date().addDays(x);
      const dt = day.getFullYear() + "-" + day.getMonth() +1 + "-" + day.getDate() + " 15:00:00";
      // Loop through the results looking for matching dates
      for (let i = 0; i < response.list.length; i++) {
        if (response.list[i].dt_txt === dt) {
          $(`#lblDOW${x}`).text(dow[day.getDay()]);
          $(`#lblDateDay${x}`).text(day.getMonth() +1 + "/" + day.getDate() + "/" + day.getFullYear());
          $(`#imgDay${x}`).attr('src', `http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`);
          $(`#imgDay${x}`).attr('title', response.list[i].weather[0].description);
          $(`#lblTempDay${x}`).text(response.list[i].main.temp);
          $(`#lblHumidityDay${x}`).text(`${response.list[i].main.humidity}%`);
          break;
        }
      }
    }
  });
}
function lkupCityWeather(city) {
  console.log(`Lookup City: ${city}`);
  // This is our API key. Add your own API key between the ""
  const APIKey = 'f905a700c670b74f604221d5fafaf985';
  // Here we are building the URL we need to query the database
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
  console.log(queryURL);
  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function (response) {
    console.log(response);
    const lat = response.coord.lat;
    const lon = response.coord.lon;
    const dt = new Date(response.dt * 1000);
    console.log(dt);
    $('#lblCity').text(city + " (" + dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear() + ")");
    $('#imgIcon').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
    $('#imgIcon').attr('title', response.weather[0].description);
    $('#lblTemp').text(response.main.temp);
    $('#lblHumidity').text(response.main.humidity);
    $('#lblWind').text(response.wind.speed);
    getUV(lat, lon);
    getFiveDay(city);
  });
}
function cityButtonClicked(btn) {
  const city = $(btn).text();
  lkupCityWeather(city);
}
function saveSearchHistory(city) {
  // Get Search History from Local Storage
  let history = JSON.parse(localStorage.getItem('searchHistory'));
  // If no history, create a new one, else append City to history
  if (history != null && history.length > 0) {
    history.push({ city });
  } else {
    history = [{ city }];
  }
  // Save Search history to Local Storage
  localStorage.setItem('searchHistory', JSON.stringify(history));
}
$(function () {
  const history = JSON.parse(localStorage.getItem('searchHistory'));
  if (history != null && history.length > 0) {
    for (let i = 0; i < history.length; i++) {
      const btn = $('<button>');
      btn.addClass('w-100 text-left btnCity');
      btn.text(history[i].city);
      btn.attr('onclick', 'cityButtonClicked(this)');
      $('#searchList').append(btn);
    }
  }
  $('#btnSearch').click(function () {
    const city = $('#txtCity').val();
    const btn = $('<button>');
    btn.addClass('w-100 text-left btnCity');
    btn.text(city);
    btn.attr('onclick', 'cityButtonClicked(this)');
    $('#searchList').append(btn);
    saveSearchHistory(city);
    lkupCityWeather(city);
  });
});
