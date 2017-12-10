import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';
// import {Roles} from 'meteor/alanning:roles';
// import {Session} from 'meteor/session';


// FlowRouter.wait();


/**
 * Change root url to make flow router understand subdomain
 */
FlowRouter.setRootUrl = (url) => {
  Meteor.absoluteUrl.defaultOptions.rootUrl = url || window.location.origin;
};

Tracker.autorun(() => {
  /**
   * Change rootURL for supporting sub domain
   */
  FlowRouter.watchPathChange();
  FlowRouter.setRootUrl();

  /* Tracker for user roles */
  // if the roles subscription is ready, start routing
  // there are specific cases that this reruns, so we also check
  // that FlowRouter hasn't initalized already
  // if(Roles.subscription.ready() && !FlowRouter._initialized)
  //   FlowRouter.initialize();
  //
  // /* Tracker for user login */
  // if (!Meteor.userId()) {
  //   if (Session.get('loggedIn')) {
  //     // get and save the current route
  //     const route = FlowRouter.current()
  //     Session.set('redirectAfterLogin', route.path);
  //
  //     FlowRouter.go(FlowRouter.path('home'));
  //   }
  // }
  //
  // if (Roles.subscription.ready() && Meteor.userId()) {
  //   const { role } = Meteor.settings.public.access_control;
  //   if (Roles.userIsInRole(Meteor.userId(), role)) {
  //     Methods.create.call({
  //       name: 'user',
  //       action: 'login',
  //       status: 'success',
  //       createdBy: Meteor.userId(),
  //       details: { role }
  //     });
  //     Session.set('isSuperAdmin', true);
  //   } else {
  //     Session.set('isSuperAdmin', false);
  //   }
  // }
});

/**
 * Init rootURL - support sub domain
 */
FlowRouter.setRootUrl();
