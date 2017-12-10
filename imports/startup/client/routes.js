import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
// import {Accounts} from 'meteor/accounts-base';

/* Triggers */
import {} from './triggers';

/* Trackers */
import './trackers';

// Import to load these templates
import '../../ui/layouts/main';
import '../../ui/layouts/blank';

import '../../ui/layouts/not-found';

import '../../ui/pages/pageOne';
import '../../ui/pages/pageTwo';

/* Redirect afterLogin */
// Accounts.onLogin(() => {
//   // logout other clients
//   // Meteor.logoutOtherClients();
//   Methods.create.call({
//     name: 'user', action: 'login', status: 'success', createdBy: Meteor.userId()
//   });
//   Session.set('loggedIn', true);
//   Notify.info({ title: 'Welcome to iCare Bots!' });
//
//   const redirect = Session.get('redirectAfterLogin');
//   if (redirect) {
//     FlowRouter.go(redirect);
//   }
// });

/* Redirect afterLogout */
// Accounts.onLogout(() => {
//   Methods.create.call({
//     name: 'user', action: 'logout', status: 'success', createdBy: Meteor.userId()
//   });
//   Session.set('redirectAfterLogin', FlowRouter.path('home'));
//   Session.set('loggedIn', false);
//   Notify.warning({ title: 'See you next time!' });
//   FlowRouter.go('home');
// });

/* Global trigger */
// FlowRouter.triggers.enter([initiatePage]);
// FlowRouter.triggers.exit([resetPage]);

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('blankLayout', { content: 'notFound' });
  },
};

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
