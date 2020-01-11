/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
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
function get5Day(city) {
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
    const day1 = new Date().addDays(1);
    const day2 = new Date().addDays(2);
    const day3 = new Date().addDays(3);
    const day4 = new Date().addDays(4);
    const day5 = new Date().addDays(5);
    const dt1 = day1.getFullYear() + "-" + day1.getMonth() +1 + "-" + day1.getDate() + " 15:00:00";
    const dt2 = day2.getFullYear() + "-" + day2.getMonth() +1 + "-" + day2.getDate() + " 15:00:00";
    const dt3 = day3.getFullYear() + "-" + day3.getMonth() +1 + "-" + day3.getDate() + " 15:00:00";
    const dt4 = day4.getFullYear() + "-" + day4.getMonth() +1 + "-" + day4.getDate() + " 15:00:00";
    const dt5 = day5.getFullYear() + "-" + day5.getMonth() +1 + "-" + day5.getDate() + " 15:00:00";
    // Loop through the results looking for matching dates
    for (let i = 0; i < response.list.length; i++) {
      if (response.list[i].dt_txt === dt1) {
        $('#lblDateDay1').text(day1.getMonth() +1 + "/" + day1.getDate() + "/" + day1.getFullYear());
        $('#imgDay1').attr('src', `http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`);
        $('#imgDay1').attr('title', response.list[i].weather[0].description);
        $('#lblTempDay1').text(response.list[i].main.temp);
        $('#lblHumidityDay1').text(response.list[i].main.humidity + "%");
      }
      if (response.list[i].dt_txt === dt2) {
        $('#lblDateDay2').text(day2.getMonth() +1 + "/" + day2.getDate() + "/" + day2.getFullYear());
        $('#imgDay2').attr('src', `http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`);
        $('#imgDay2').attr('title', response.list[i].weather[0].description);
        $('#lblTempDay2').text(response.list[i].main.temp);
        $('#lblHumidityDay2').text(response.list[i].main.humidity + "%");
      }
      if (response.list[i].dt_txt === dt3) {
        $('#lblDateDay3').text(day3.getMonth() +1 + "/" + day3.getDate() + "/" + day3.getFullYear());
        $('#imgDay3').attr('src', `http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`);
        $('#imgDay3').attr('title', response.list[i].weather[0].description);
        $('#lblTempDay3').text(response.list[i].main.temp);
        $('#lblHumidityDay3').text(response.list[i].main.humidity + "%");
      }
      if (response.list[i].dt_txt === dt4) {
        $('#lblDateDay4').text(day4.getMonth() +1 + "/" + day4.getDate() + "/" + day4.getFullYear());
        $('#imgDay4').attr('src', `http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`);
        $('#imgDay4').attr('title', response.list[i].weather[0].description);
        $('#lblTempDay4').text(response.list[i].main.temp);
        $('#lblHumidityDay4').text(response.list[i].main.humidity + "%");
      }
      if (response.list[i].dt_txt === dt5) {
        $('#lblDateDay5').text(day5.getMonth() +1 + "/" + day5.getDate() + "/" + day5.getFullYear());
        $('#imgDay5').attr('src', `http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`);
        $('#imgDay5').attr('title', response.list[i].weather[0].description);
        $('#lblTempDay5').text(response.list[i].main.temp);
        $('#lblHumidityDay5').text(response.list[i].main.humidity + "%");
      }
    }
    console.log(day1);

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
    get5Day(city);
  });
}
function cityButtonClicked(btn) {
  const city = $(btn).text();
  console.log($(btn));
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
    console.log(city);
    const btn = $('<button>');
    btn.addClass('w-100 text-left btnCity');
    btn.text(city);
    btn.attr('onclick', 'cityButtonClicked(this)');
    $('#searchList').append(btn);
    saveSearchHistory(city);
    lkupCityWeather(city);
  });
});
