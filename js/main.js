// add stats to the home page 
$(document).ready(function(){
  $.get("https://tasks.hotosm.org/api/v1/stats/home-page", function(data){
    $('#Community-Mappers').text(formatedData(data['totalMappers']));
  });

  $.get("https://osm-stats-production-api.azurewebsites.net/stats/missingmaps", function(data){
    $('#Total-Map-Edits').text(formatedData(data['edits']));
    $('#Buildings-Mapped').text(formatedData(data['buildings']));
    $('#Roads-Mapped').text(formatedData(Math.round(parseInt(data['roads']))));
  });
});

var navAnchor = document.getElementById('nav-anchor'),
    nav = document.getElementById('nav-container');

navAnchor.addEventListener('click', function(e) {
    nav.className = nav.className? '' : 'show-nav';
    e.preventDefault();
});

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top - 72
  }, 500);
});

$('#control-right').on('click', function (event) {
  $('.home-highlights-wrapper').addClass('right');
});

$('#control-left').on('click', function (event) {
  $('.home-highlights-wrapper').removeClass('right');
});

var fixmeTop = $('.nav-main').offset().top;
$(window).scroll(function() {
  var currentScroll = $(window).scrollTop();
  if (currentScroll >= fixmeTop) {
    $('#nav-container').addClass( 'fixed-nav' );
    $('.nav-logo').addClass( 'fixed-nav' );
    $('.nav-logo-text').addClass( 'fixed-nav' );
    $('.nav-main').addClass( 'fixed-nav' );
  } else {
    $('#nav-container').removeClass( 'fixed-nav' );
    $('.nav-logo').removeClass( 'fixed-nav' );
    $('.nav-logo-text').removeClass( 'fixed-nav' );
    $('.nav-main').removeClass( 'fixed-nav' );
  }
});

$(function() {
  $("#submit").hide();
  $("#country-select select").change(function() {
    window.location = $("#page-changer select option:selected").val();
  })
});

$(".search-link").on("click",function () {
  $("#search-overlay").addClass('search-show');
  $( "#search-input" ).focus();
  $('body').addClass('search-on');
});

$(".search-close").on("click", function() {
  $("#search-overlay").removeClass('search-show');
  $('body').removeClass('search-on');
});

//esc key
$('body').on('keyup', function(e) {
  if ($('body').hasClass('search-on') && e.keyCode == 27) {
          $(".search-overlay").hide();
          $('body').removeClass('search-on');
        }
});

var sjs = SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '/search.json',
  searchResultTemplate: '<li><a class="results-link" href="{url}"><h5>{type}</h5><h3 class="search-result-title">{title}</h3><p class="search-result-summary">{summary}</p><h6>{subtitle}</h6></a></li><div class="hr-h"></div>'
});

// util functions for frontpage stats
function formatedData(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

