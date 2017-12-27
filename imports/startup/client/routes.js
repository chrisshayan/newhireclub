import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
// import {Accounts} from 'meteor/accounts-base';

/* Triggers */
import {} from './triggers';

/* Trackers */
import './trackers';

/**
 * Templates
 */
// Layouts
import '../../ui/layouts/main';
import '../../ui/layouts/blank';
// Errors
import '../../ui/layouts/not-found';
// Pages
// Landing Page
import '../../ui/pages/landing/landing';
// Maintenance
import '../../ui/pages/info/comingSoon';
// Register
import '../../ui/pages/signup/signup';
import '../../ui/pages/signin/signin';

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

/**
 * Public Routes
 */
// Maintenance
// Landing Page
FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('blankLayout', { content: 'landingPage' });
  },
});
// Sign up
FlowRouter.route('/signup', {
  name: 'signUp',
  action() {
    BlazeLayout.render('blankLayout', { content: 'signUp' });
  },
});
// Sign in
// FlowRouter.route('/signin', {
//   name: 'signIn',
//   action() {
//     BlazeLayout.render('blankLayout', { content: 'signIn' });
//   },
// });

FlowRouter.route('/info/:message', {
  name: 'info',
  action(params) {
    if (params.message === 'coming-soon') {
      BlazeLayout.render('blankLayout', { content: 'comingSoon' });
    }
  },
});
