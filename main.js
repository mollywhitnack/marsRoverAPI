'use strict'

var weatherURL =`http://marsweather.ingenology.com/v1/archive/?format=jsonp`;
var found  =false;
var dayforW =''
var dayBool = false;
var solBool = false;
var sol = 0;
var notThereSol = false;

$(document).ready(init); 
function init(){
  console.log("ready");
  $('.submitDay').on('click', dayImages);
  $('.submitSol').on('click', solImages);
  //$('.weather').on('click', weather);
}

function dayImages(){
  $('.alert-warning').hide();
  //weatherURL = `http://marsweather.ingenology.com/v1/archive/?format=jsonp`;
  dayBool = true;
  solBool = false;
  found = false;
  $('.tempImage').empty();
  $('.tempTarget').empty();
  var day = $('.dayInput').val();
  dayforW = day;
  var nDate  = [];
  var date = day.split('-');
  for(let i=0; i<date.length; i++){
    var digit = date[i].split('');
    if(digit.length == 2){
      digit = digit.splice(1, 1);
    }
    digit = digit.join('');
    nDate.push(digit);
  }
  nDate = nDate.join('-');
  $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${nDate}&api_key=MinS57PfHb5uC8drEsRM4zEk3SoQSq57p4N7juwu`)
  .done(function(data){
    var length = data.photos.length;
    weather();
    for(let i =0; i<length; i++){
      var url = (data.photos[i].img_src).toString();
      var $li2 = $('.templateTarget').clone();
      $li2.attr("data-slide-to", `${i}`);
      if(i === 0){
        console.log("i=0");
        console.log($li2);
        $li2.attr('class', 'caro active');
        $('.tempImage').append(`<div class="item active"> <img src = "${url}"/> </div>`);
      }
      else{
        $('.tempImage').append(`<div class="item"> <img src = "${url}"/></div>`);
      }
      $li2.removeClass('templateTarget');
      $('.tempTarget').append($li2);
      //$li2.removeClass("active");
    }
   })
   .fail(function(){
    console.log('earth day Error!');
    $('.alert-warning').show();
    $('.weatherReport').hide();
    //alert("No images available, please refine your search!");
   });
}


function solImages(){
  $('.alert-warning').hide();
  //weatherURL = `http://marsweather.ingenology.com/v1/archive/?format=jsonp`;
  dayBool = false;
  solBool = true;
  found = false;
  $('.tempImage').empty();
  $('.tempTarget').empty();
  sol = $('.solInput').val();
  var camera = $('.cameraList').val();
  $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=MinS57PfHb5uC8drEsRM4zEk3SoQSq57p4N7juwu`)
  .done(function(data){
    weather();
    //console.log("data: " ,data);
    var length = data.photos.length;
    console.log("length:", length);
    for(let i =0; i<length; i++){
      var url = (data.photos[i].img_src).toString();
      //console.log(url);
      var $li2 = $('.templateTarget').clone();
      $li2.attr("data-slide-to", `${i}`);
      //console.log("myCarousel:", $li2.find('.caro'));
      if(i == 0){
        $li2.addClass("active");
        $('.tempImage').append(`<div class="item active"> <img src = "${url}"/> </div>`);
      }
      else
        $('.tempImage').append(`<div class="item"> <img src = "${url}"/></div>`);
        $li2.removeClass('templateTarget');
        $('.tempTarget').append($li2);
    }
   })
   .fail(function(){
    console.log('Mars sol Error!');
    //alert("No images available, please refine your search!");
    $('.alert-warning').show();
    $('.weatherReport').hide();
   });
}

function weather(){
  console.log("solBool: " , solBool);
  console.log("daylBool: " , dayBool);
  if(dayBool == true){
    $('.weatherReport').text(`...Loading Weather for ${dayforW}`);
    $('.weatherReport').show();
    $.ajax({
    url: weatherURL,
    method: 'GET', //defualt  is get, dont really need this
    dataType: 'jsonp',
    success: function(data){
      //go through pages
      for(var i = 0; i<data.results.length; i++){
          //console.log(data.results[i].terrestrial_date);
          console.log("day: ", data.results[i].terrestrial_date ," vs " , dayforW);
          if(data.results[i].terrestrial_date === dayforW){
            var weatherdata = data.results[i].atmo_opacity;
            var minFar = data.results[i].min_temp_fahrenheit;
            //console.log(minFar);
            var maxFar = data.results[i].max_temp_fahrenheit;
            //console.log(maxFar);
            found = true;
            //console.log("Found: ", weatherdata);
            $('.weatherReport').text('');
            var $h3 = $('<h3>');
            $('.weatherReport').text(`${weatherdata} -- High: ${maxFar} F Low: ${minFar} F`);
            weatherURL = `http://marsweather.ingenology.com/v1/archive/?format=jsonp`;
          }
        }
        if(found === false){
          var next = data.next;
          weatherURL = next;
          //console.log("next: " , next);
          weather();
        }
    },
    error: function(error){
      console.log("Weather Error: " , error);
      weatherURL =`http://marsweather.ingenology.com/v1/archive/?format=jsonp`;
      //console.log("Weather Error");
      $('.weatherReport').text('No Weather available for this date');
    }
    });
  }
  else{
    $('.weatherReport').text(`...Loading Weather for sol ${sol}`);
    $('.weatherReport').show();
    console.log("url, ", weatherURL );
    $.ajax({
    url: weatherURL,
    method: 'GET', //defualt  is get, dont really need this
    dataType: 'jsonp',
    success: function(data){
      for(var i = 0; i<data.results.length; i++){
          //console.log(data.results[i].sol);       
          if(parseInt(sol) > data.results[i].sol){
            console.log("BREAKKKK-----------------");
            notThereSol = true;
            break;
          }
          console.log("sol: ", parseInt(sol) ," vs " , data.results[i].sol);
          if(data.results[i].sol.toString() === sol){
            var weatherdata = data.results[i].atmo_opacity;
            var minFar = data.results[i].min_temp_fahrenheit;
            //console.log(minFar);
            var maxFar = data.results[i].max_temp_fahrenheit;
            //console.log(maxFar);
            found = true;
            weatherURL = `http://marsweather.ingenology.com/v1/archive/?format=jsonp`;
            //console.log("Found: ", weatherdata);
            $('.weatherReport').text('');
            $('.weatherReport').text(`${weatherdata} -- High: ${maxFar} F Low: ${minFar} F`);
          }
        }
        if(found === false && notThereSol === false){
          var next = data.next;
          weatherURL = next;
          //console.log("next: " , next);
          weather();
        }
        if(notThereSol === true){
          $('.weatherReport').text('No Weather available for this date');
        }
    },
    error: function(error){
      console.log("Weather Error: " , error);
      weatherURL =`http://marsweather.ingenology.com/v1/archive/?format=jsonp`;
      //$('.weatherReport').text('');
      $('.weatherReport').text('No Weather available for this date');
    }
    });
  }
}

