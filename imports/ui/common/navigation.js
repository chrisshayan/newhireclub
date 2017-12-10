import { Template } from 'meteor/templating';
import './navigation.html';

Template.navigation.onRendered = function () {
  // Initialize metisMenu
  $('#side-menu').metisMenu();
};
