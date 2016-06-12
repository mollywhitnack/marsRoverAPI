'use strict'

var weatherURL = `http://marsweather.ingenology.com/v1/archive/?format=jsonp`;
var found  =false;
var dayforW =''

$(document).ready(init); 
function init(){
  console.log("ready");
  $('.submitDay').on('click', dayImages);
  $('.submitSol').on('click', solImages);
  $('.weather').on('click', weather);
}

function dayImages(){
  $('.tempImage').empty();
  $('.tempTarget').empty();
  var day = $('.dayInput').val();
  dayforW = day;
  var nDate  = [];
  console.log("day:", day);
  var date = day.split('-');
  console.log("date:", date);
  for(let i=0; i<date.length; i++){
    var digit = date[i].split('');
    console.log("digit: ", digit.length);
    if(digit.length == 2){
      console.log("at 0: ", digit[0]);
      digit = digit.splice(1, 1);
      console.log(digit);
    }
    digit = digit.join('');
    nDate.push(digit);
  }
  nDate = nDate.join('-');
  console.log(nDate);
  $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${nDate}&api_key=MinS57PfHb5uC8drEsRM4zEk3SoQSq57p4N7juwu`)
  .done(function(data){
    console.log("data: " ,data);
    var length = data.photos.length;
    console.log("length:", length);

    for(let i =0; i<length; i++){
      var url = (data.photos[i].img_src).toString();
      console.log(url);
      var $li2 = $('.templateTarget').clone();
      $li2.attr("data-slide-to", `${i}`);
      console.log("myCarousel:", $li2.find('.caro'));
      if(i == 0){
        $li2.addClass("active");
        $('.tempImage').append(`<div class="item active"> <img src = "${url}"/> </div>`);
      }
      else
        $('.tempImage').append(`<div class="item"> <img src = "${url}"/></div>`);
      $li2.removeClass('templateTarget');

      $('.tempTarget').append($li2);
      $li2.removeClass("active");
    }
   })
   .fail(function(){
    console.log('Error!');
   });
}


function solImages(){
  $('.tempImage').empty();
  $('.tempTarget').empty();
  var sol = $('.solInput').val();
  var camera = $('.cameraList').val();
  $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=MinS57PfHb5uC8drEsRM4zEk3SoQSq57p4N7juwu`)
  .done(function(data){
    console.log("data: " ,data);
    var length = data.photos.length;
    console.log("length:", length);
    for(let i =0; i<length; i++){
      var url = (data.photos[i].img_src).toString();
      console.log(url);
      var $li2 = $('.templateTarget').clone();
      $li2.attr("data-slide-to", `${i}`);
      console.log("myCarousel:", $li2.find('.caro'));
      if(i == 0){
        $li2.addClass("active");
        $('.tempImage').append(`<div class="item active"> <img src = "${url}"/> </div>`);
      }
      else
        $('.tempImage').append(`<div class="item"> <img src = "${url}"/></div>`);
      $li2.removeClass('templateTarget');

      $('.tempTarget').append($li2);
      $li2.removeClass("active");
    }
   })
   .fail(function(){
    console.log('Error!');
   });
}

function weather(){
  console.log("weather");
  var day ="2015-06-03";
  $.ajax({
  url: weatherURL,
  method: 'GET', //defualt  is get, dont really need this
  dataType: 'jsonp',
  success: function(data){
    for(var i = 0; i<data.results.length; i++){
      console.log(data.results[i].terrestrial_date);
      if(data.results[i].terrestrial_date === day){
        var weatherdata = data.results[i].atmo_opacity;
        var minFar = data.results[i].min_temp_fahrenheit;
        console.log(minFar);
        var maxFar = data.results[i].max_temp_fahrenheit;
        console.log(maxFar);
        found = true;
        console.log("Found: ", weatherdata);
        $('.weatherReport').text('');
        $('.weatherReport').empty().text(`${weatherdata},  High: ${maxFar}F, Low: ${maxFar}`);
      }
    }
    if(found === false){
      var next = data.next;
      weatherURL = next;
      console.log("next: " , next);
      weather();
      //weather
    }

  },
  error: function(error){
    console.log("Error");
    renderError(error);
  }


});
}

/*function cameraImages(){
  $('.tempImage').empty();
  $('.tempTarget').empty();
  var camera = $('.cameraList').val();
  console.log("day:", camera);
  /*$.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${day}&api_key=MinS57PfHb5uC8drEsRM4zEk3SoQSq57p4N7juwu`)
  .done(function(data){
    console.log("data: " ,data);
    var length = data.photos.length;
    console.log("length:", length);

    for(let i =0; i<length; i++){
      var url = (data.photos[i].img_src).toString();
      console.log(url);
      var $li2 = $('.templateTarget').clone();
      $li2.attr("data-slide-to", `${i}`);
      console.log("myCarousel:", $li2.find('.caro'));
      if(i == 0){
        $li2.addClass("active");
        $('.tempImage').append(`<div class="item active"> <img src = "${url}"/> </div>`);
      }
      else
        $('.tempImage').append(`<div class="item"> <img src = "${url}"/></div>`);
      $li2.removeClass('templateTarget');

      $('.tempTarget').append($li2);
      $li2.removeClass("active");
    }
   })
   .fail(function(){
    console.log('Error!');
   });
}*/

