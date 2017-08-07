var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
    playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
var vid = [
        {'videoId': 'e8DFN3m8XGQ', 'suggestedQuality': 'hd720'},
    ],
    randomVid = 0,
    currVid = randomVid;

function onYouTubePlayerAPIReady(){
    tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
    tv.loadVideoById(vid[currVid]);
    tv.seekTo(2);
    tv.mute();
    $('#tv').addClass('screen__active');
    $('.play').toggleClass('pause');
    $('.speaker').toggleClass('speaker__mute');
}

function onPlayerStateChange(e) {
}

function vidRescale(){

    var w = $(window).width()+200,
        h = $(window).height()+200;

    if (w/h > 16/9){
        tv.setSize(w, w/16*9);
        $('.tv .screen').css({'left': '0px'});
    } else {
        tv.setSize(h/9*16, h);
        $('.tv .screen').css({'left': '0px'});
    }
}

$(window).on('load resize', function(){
    vidRescale();
});

$('.play').on('click', function () {
    $(this).toggleClass('pause');
    if($('.play').hasClass('pause')){
        tv.playVideo();
    } else {
        tv.pauseVideo();
    }
});

$('.speaker').click(function(e) {
    $(this).toggleClass('speaker__mute');
    if($('.speaker').hasClass('speaker__mute')){
        tv.mute();
    } else {
        tv.unMute();
    }
});

$(document).ready(function(){
    new WOW().init();
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        dots:false,
        navText : ["<",">"],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });

    $('.navbar-nav>li>a').click( function(){
        var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: ($(scroll_el).offset().top-60) }, 500);
            $('.navbar-nav>.active').toggleClass('active');
        }
        return false;
    });
    var time = 0;
    var comment = [
        "Aliquam erat volutpat. In rhoncus viverra arcu, sed tristique dui ultrices nec. Nulla accumsan tincidunt magna, sed commodo purus vulputate a.",
        "Donec non tellus tellus. Integer dignissim nibh vel tortor pretium tempor. In pulvinar placerat erat nec ullamcorper. Etiam efficitur tempus massa.",
        "Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed magna velit, sollicitudin rutrum volutpat id, cursus eu tortor."
    ];
    var author = ["Eddard Stark", "Daenerys Targaryen", "Tyrion Lannister"];
    var author_id = ["@#eddardstark", "@#daenerystargaryen", "@#tyrionlannister"];

    function swapComment() {
        $('#comments_comment').text("@"+comment[time]);
        $('#comments__author__img').attr("src", "img/users/user-"+time+".jpg");
        $('#comments__author__img').attr("alt", "user-"+(time+1));
        $('#comments__author__text').html(author[time]+" <span>"+author_id[time]+"</span>");
        time++;
        if(time>2)  time=0;
    }
    setInterval(swapComment, 3000);

});