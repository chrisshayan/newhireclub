// import {Meteor} from 'meteor/meteor';
// import {FlowRouter} from 'meteor/kadira:flow-router';


export const ensureSignedIn = (/* context, redirect */) => {
  // if (!Meteor.loggingIn() && !Meteor.userId()) {
  //   const
  //     notification = {
  //       closeButton: true,
  //       title: 'Authentication',
  //       message: 'Login is required!'
  //     },
  //     currentPath = FlowRouter.current().path;
  //
  //   Session.set("redirectAfterLogin", currentPath);
  //   error(notification);
  //
  //   redirect('/');
  // }
};

export const ensureIsAdmin = () => {

};
