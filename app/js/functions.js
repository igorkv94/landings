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
  if (wScroll > $('.tiger-pics').offset().top - ($(window).height() / 1.2)) {
    $('.tiger-pics figure').each(function (i) {
      setTimeout(function () {
        $('.tiger-pics figure').eq(i).addClass('is-showing');
      }, (700 * (Math.exp(i * 0.14))) - 700);
    });
  }
  //Blog posts
  if (wScroll > $('.blog-posts').offset().top - $(window).height()) {
    var offset = (Math.min(0, wScroll - $('.blog-posts').offset().top + $(window).height() - 350)).toFixed();
    $('.post-1').css({
      'transform': 'translate(' + offset + 'px, ' + Math.abs(offset * 0.2) + 'px)'
    });
    $('.post-3').css({
      'transform': 'translate(' + Math.abs(offset) + 'px, ' + Math.abs(offset * 0.2) + 'px)'
    });
  }
});