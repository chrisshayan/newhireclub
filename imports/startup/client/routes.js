/**
 * Created by tankhuu on 11/20/17.
 */
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
// import React from 'react';
import { mount } from 'react-mounter';

/**
 * Pages
 */
// import MainLayout from '../../ui/components';
import HomePage, {
  NotFoundPage,
} from '../../ui/pages';


/* Trackers */
import './trackers';

/* Redirect afterLogin */
Accounts.onLogin(() => {
  // logout other clients
  // Meteor.logoutOtherClients();
  Session.set('loggedIn', true);

  const redirect = Session.get('redirectAfterLogin');
  if (redirect) {
    FlowRouter.go(redirect);
  }
});

/* Redirect afterLogout */
Accounts.onLogout(() => {
  Session.set('redirectAfterLogin', FlowRouter.path('home'));
  Session.set('loggedIn', false);
  FlowRouter.go('home');
});

// Not Found Page
FlowRouter.notFound = {
  action() {
    mount(NotFoundPage);
  },
};

const publicRoutes = FlowRouter.group({
  name: 'publicRoutes',
});

publicRoutes.route('/', {
  name: 'home',
  action() {
    console.log('go to home page');
    mount(HomePage);
  },
});

