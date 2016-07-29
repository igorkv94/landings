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
});