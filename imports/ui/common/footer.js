import { Template } from 'meteor/templating';
import './footer.html';

Template.footer.onRendered(() => {
  // FIXED FOOTER
  // Uncomment this if you want to have fixed footer or
  // add 'fixed' class to footer element in html code
  // $('.footer').addClass('fixed');
});
