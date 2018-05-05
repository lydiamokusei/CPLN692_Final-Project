var activeStyle={
  "background-color": "#11799F",
  "border-radius": "5px"
};

var normalStyle={
  "background-color": "rgba(0,0,0,0.2)",
  "color":"rgba(255, 255, 255, 0.8)",
  "border-radius": "5px"
};

/* =====================
Start!
===================== */
$('#start').click(function(){
  $('.bg').animate({
      opacity: 'hide', // animate fadeOut
      right: '200px',  // slide left
    }, 'slow', 'linear', function() {
      $(this).remove();
      // Show navigation sidebar and map
      $(".navsidebar").fadeIn();
      $("#map").fadeIn();
      // Crucial step to make sure the map load correcly
      map.invalidateSize();
    });
});

/* =====================
Navigation bar
===================== */
$('#maps').click(function(e){
  reset();
  $('.intsidebar').fadeIn();
  $('#maps-page').fadeIn();
  $('#info-page').hide();
  $('#filter-page').hide();
  $('#route-page').hide();
  $('#filter-choice1').css(normalStyle);
  $('#filter-choice2').css(normalStyle);
  removeLine();
});

$('#info').click(function(e){
  reset();
  $('.intsidebar').fadeIn();
  $('#info-page').fadeIn();
  $('#maps-page').hide();
  $('#filter-page').hide();
  $('#route-page').hide();
  $('#filter-choice1').css(normalStyle);
  $('#filter-choice2').css(normalStyle);
  removeLine();
});

$('#filter').click(function(e){
  reset();
  $('.intsidebar').fadeIn();
  $('#filter-page').fadeIn();
  $('#maps-page').hide();
  $('#info-page').hide();
  $('#route-page').hide();
  $('#filter-choice1').css(normalStyle);
  $('#filter-choice2').css(normalStyle);
  removeLine();
});

$('#route').click(function(e){
  reset();
  $('.intsidebar').fadeIn();
  $('#route-page').fadeIn();
  $('#maps-page').hide();
  $('#info-page').hide();
  $('#filter-page').hide();
  $('#filter-choice1').css(normalStyle);
  $('#filter-choice2').css(normalStyle);
});

/* =====================
Choices
===================== */
// Filter
$('#filter-choice1').click(function(e){
  $('#filter-expand1').fadeIn();
  $('#filter-expand2').hide();
  $('#filter-custom1').hide();
  $('#filter-custom2').hide();
  $('#generateButton-filter').hide();
  $('#filter-choice1').css(activeStyle);
  $('#filter-choice2').css(normalStyle);
});

$('#filter-choice2').click(function(e){
  $('#filter-expand1').hide();
  $('#filter-expand2').fadeIn();
  $('#filter-custom1').hide();
  $('#filter-custom2').hide();
  $('#generateButton-filter').hide();
  $('#filter-choice1').css(normalStyle);
  $('#filter-choice2').css(activeStyle);
});

// The code below allows user to toggle the custom range choice
// But fadeToggle() method seems to be a better way
/*
$('#filter-choice1-custom').click(function() {
  var clicks = $(this).data('clicks');
  if (!clicks) {
    $('#filter-custom2').hide();
    $('#filter-custom1').fadeIn();
    $('#generateButton-filter').fadeIn();
  } else {
    $('#filter-custom2').hide();
    $('#filter-custom1').hide();
    $('#generateButton-filter').hide();
  }
  $(this).data("clicks", !clicks);
});

$('#filter-choice2-custom').click(function() {
  var clicks = $(this).data('clicks');
  if (!clicks) {
    $('#filter-custom1').hide();
    $('#filter-custom2').fadeIn();
    $('#generateButton-filter').fadeIn();
  } else {
    $('#filter-custom2').hide();
    $('#filter-custom1').hide();
    $('#generateButton-filter').hide();
  }
  $(this).data("clicks", !clicks);
});
*/

$('#filter-choice1-custom').click(function() {
    $('#filter-custom2').hide();
    $('#filter-custom1').fadeToggle();
    $('#generateButton-filter').fadeToggle();
});

$('#filter-choice2-custom').click(function() {
    $('#filter-custom1').hide();
    $('#filter-custom2').fadeToggle();
    $('#generateButton-filter').fadeToggle();
});

$('#filter-choice1-above').click(function() {
    $('#filter-custom1').hide();
    $('#filter-custom2').hide();
    $('#generateButton-filter').hide();
});

$('#filter-choice1-below').click(function() {
    $('#filter-custom1').hide();
    $('#filter-custom2').hide();
    $('#generateButton-filter').hide();
});

$('#filter-choice2-above').click(function() {
    $('#filter-custom1').hide();
    $('#filter-custom2').hide();
    $('#generateButton-filter').hide();
});

$('#filter-choice2-below').click(function() {
    $('#filter-custom1').hide();
    $('#filter-custom2').hide();
    $('#generateButton-filter').hide();
});


/* =====================
Close info sidebar
===================== */
$('#hideit1').on('mouseover',function(e){
  $('#hideit1').css("color","white");
});
$('#hideit1').on('mouseout',function(e){
  $('#hideit1').css("color","rgba(255, 255, 255, 0.7");
});
$('#hideit1').click(function(e){
  $('.intsidebar').fadeOut();
});

$('#hideit2').on('mouseover',function(e){
  $('#hideit2').css("color","white");
});
$('#hideit2').on('mouseout',function(e){
  $('#hideit2').css("color","rgba(255, 255, 255, 0.7");
});
$('#hideit2').click(function(e){
  $('.intsidebar').fadeOut();
});

$('#hideit3').on('mouseover',function(e){
  $('#hideit3').css("color","white");
});
$('#hideit3').on('mouseout',function(e){
  $('#hideit3').css("color","rgba(255, 255, 255, 0.7");
});
$('#hideit3').click(function(e){
  $('.intsidebar').fadeOut();
  $('#filter-choice1').css(normalStyle);
  $('#filter-choice2').css(normalStyle);
});

$('#hideit4').on('mouseover',function(e){
  $('#hideit4').css("color","white");
});
$('#hideit4').on('mouseout',function(e){
  $('#hideit4').css("color","rgba(255, 255, 255, 0.7");
});
$('#hideit4').click(function(e){
  $('.intsidebar').fadeOut();
  removeLine();
});
