import { Template } from 'meteor/templating';

import './main.html';
import '../common/navigation';
import '../common/top-navbar';
import '../common/footer';

Template.mainLayout.onRendered(() => {
  // Minimalize menu when screen is less than 768px
  $(window).bind('resize load', function () {
    if ($(this).width() < 769) {
      $('body').addClass('body-small');
    } else {
      $('body').removeClass('body-small');
    }
  });

  // Fix height of layout when resize, scroll and load
  $(window).bind('load resize scroll', function () {
    if (!$('body').hasClass('body-small')) {
      const navbarHeight = $('nav.navbar-default').height();
      const wrapperHeight = $('#page-wrapper').height();

      if (navbarHeight > wrapperHeight) {
        $('#page-wrapper').css('min-height', `${navbarHeight} px`);
      }

      if (navbarHeight < wrapperHeight) {
        $('#page-wrapper').css('min-height', `${$(window).height()} px`);
      }

      if ($('body').hasClass('fixed-nav')) {
        if (navbarHeight > wrapperHeight) {
          $('#page-wrapper').css('min-height', `${navbarHeight} px`);
        } else {
          $('#page-wrapper').css('min-height', `${$(window).height() - 60} px`);
        }
      }
    }
  });


  // SKIN OPTIONS
  // Uncomment this if you want to have different skin option:
  // Available skin: (skin-1 or skin-3, skin-2 deprecated)
  // $('body').addClass('skin-1');

  // FIXED-SIDEBAR
  // Uncomment this if you want to have fixed left navigation
  // $('body').addClass('fixed-sidebar');
  // $('.sidebar-collapse').slimScroll({
  //     height: '100%',
  //     railOpacity: 0.9
  // });

  // BOXED LAYOUT
  // Uncomment this if you want to have boxed layout
  // $('body').addClass('boxed-layout');
});
