import { Template } from 'meteor/templating';
import './ibox-tools.html';

Template.iboxTools.events({
  'click .collapse-link': (event) => {
    const element = $(event.target);
    const ibox = element.closest('div.ibox');
    const button = element.closest('i');
    const content = ibox.find('div.ibox-content');
    content.slideToggle(200);
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    ibox.toggleClass('').toggleClass('border-bottom');
    setTimeout(function () {
      ibox.resize();
      ibox.find('[id^=map-]').resize();
    }, 50);
  },

  'click .close-link': (event) => {
    const element = $(event.target);
    const content = element.closest('div.ibox');
    content.remove();
  },
});
