import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/main';
import '../../ui/layouts/blank';

import '../../ui/layouts/not-found';

import '../../ui/pages/pageOne';
import '../../ui/pages/pageTwo';

FlowRouter.route('/', {
  action: () => {
    FlowRouter.go('/pageOne');
  },
});

FlowRouter.route('/pageOne', {
  action: () => {
    BlazeLayout.render('mainLayout', { content: 'pageOne' });
  },
});

FlowRouter.route('/pageTwo', {
  action: () => {
    BlazeLayout.render('mainLayout', { content: 'pageTwo' });
  },
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('blankLayout', { content: 'notFound' });
  },
};
