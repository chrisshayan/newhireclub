/**
 * Created by tankhuu on 12/9/17.
 */

import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { FlowRouter } from 'meteor/kadira:flow-router';

/**
 * Set Root URL for using sub domains
 */
// FlowRouter.wait();
FlowRouter.setRootURL = (url) => {
  Meteor.absoluteUrl.defaultOptions.rootUrl = url || window.location.origin;
};
Tracker.autorun(() => {
  FlowRouter.watchPathChange();
  FlowRouter.setRootURL();
});
