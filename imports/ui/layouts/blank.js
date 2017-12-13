import { Template } from 'meteor/templating';
import './blank.html';

Template.blankLayout.onRendered(() => {
  // Add gray color for background in blank layout
  $('body').addClass('gray-bg');
});

Template.blankLayout.onDestroyed(() => {
  // Remove special color for blank layout
  $('body').removeClass('gray-bg');
});
