$(window).scroll(function () {
  var wScroll = $(this).scrollTop();
  $('.logo').css({
    'transform': 'translate(0px, ' + wScroll / 2 + '%)'
  });
  $('.eagle').css({
    'transform': 'translate(' + wScroll / 6 + '%, ' + wScroll * 1.8 + '%)'
  });
  $('.tiger').css({
    'transform': 'translate(0px, ' + wScroll / 3 + '%)'
  });
  $('.deer').css({
    'transform': 'translate(0px, ' + wScroll / 1.2 + '%)'
  });
  // Landing Elements
  if(wScroll > $('.tiger-pics').offset().top - ($(window).height() / 1.2)) {

    $('.tiger-pics figure').each(function(i){

      setTimeout(function(){
        $('.tiger-pics figure').eq(i).addClass('is-showing');
      }, (700 * (Math.exp(i * 0.14))) - 700);
    });

  }
});