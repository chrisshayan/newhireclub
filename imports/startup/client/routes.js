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
// Sign up with external services
// Google Service
FlowRouter.route('/signup-with-goole', {
  name: 'signUpWithGoogle',
  action() {
    BlazeLayout.render('blankLayout', { content: 'signIn' });
  },
});
// Sign in
FlowRouter.route('/signin', {
  name: 'signIn',
  action() {
    BlazeLayout.render('blankLayout', { content: 'signIn' });
  },
});

// Application Routes
const appRoutes = FlowRouter.group({
  prefix: '/app',
  name: 'app',
  triggersEnter: [function (context, redirect) {
    console.log('running group triggers', context, redirect);
  }],
});

appRoutes.route('/', {
  name: 'app.home',
  action() {
    BlazeLayout.render('mainLayout', { content: 'pageOne' });
  },
});
