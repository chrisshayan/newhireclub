import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

export const ensureSignedIn = (context, redirect) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    const currentPath = FlowRouter.current().path;

    Session.set('redirectAfterLogin', currentPath);

    redirect('/');
  }
};

export const ensureIsAdmin = () => {

};
