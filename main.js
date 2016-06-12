'use strict'
$(document).ready(init); 
function init(){
  console.log("ready");
  $('.submitDay').on('click', dayImages);
  $('.submitSol').on('click', solImages);
}

function dayImages(){
  $('.tempImage').empty();
  $('.tempTarget').empty();
  var day ="2015-6-3";
  console.log("day:", day);
  $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${day}&api_key=MinS57PfHb5uC8drEsRM4zEk3SoQSq57p4N7juwu`)
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
  $.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=MinS57PfHb5uC8drEsRM4zEk3SoQSq57p4N7juwu")
  .done(function(data){
    console.log("data: " ,data);
    var length = data.photos.length;
    console.log("length:", length);
    if (length > 10)
      length =10;
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

