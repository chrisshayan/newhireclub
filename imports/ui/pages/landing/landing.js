import { Template } from 'meteor/templating';
// import WOW from 'wowjs';
import './landing.html';

Template.landingPage.onRendered(() => {
  $('body').addClass('landing-page');
  $('body').attr('id', 'page-top');

  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 80,
  });

  // Page scrolling feature
  $('a.page-scroll').bind('click', function (event) {
    const link = $(this);
    $('html, body').stop().animate({
      scrollTop: $(link.attr('href')).offset().top - 50,
    }, 500);
    event.preventDefault();
    $('#navbar').collapse('hide');
  });

  (() => {
    const docElem = document.documentElement;
    const header = document.querySelector('.navbar-default');
    const changeHeaderOn = 200;
    let didScroll = false;

    const scrollY = () => (window.pageYOffset || docElem.scrollTop);
    const scrollPage = () => {
      const sy = scrollY();
      if (sy >= changeHeaderOn) {
        $(header).addClass('navbar-scroll');
      } else {
        $(header).removeClass('navbar-scroll');
      }
      didScroll = false;
    };
    const init = () => {
      window.addEventListener('scroll', function () {
        if (!didScroll) {
          didScroll = true;
          setTimeout(scrollPage, 250);
        }
      }, false);
    };

    init();
  })();


  // Activate WOW.js plugin for animation on scroll
  // window.wow = new WOW({
  //   live: false,
  // });
  // window.wow.init();
  // new WOW().init();
});

Template.landingPage.onDestroyed = function () {
  $('body').removeClass('landing-page');
};
