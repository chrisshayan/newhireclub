import { Template } from 'meteor/templating';
import './navigation.html';

Template.navigation.onRendered(() => {
  // Initialize metisMenu
  $('#side-menu').metisMenu();
});
