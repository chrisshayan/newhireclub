import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ServiceConfiguration } from 'meteor/service-configuration';

// Ensuring every user has an email address, should be in server-side code
Accounts.validateNewUser((user) => {
  new SimpleSchema({
    _id: { type: String },
    username: { type: String },
    emails: { type: Array, optional: true },
    'emails.$': { type: Object },
    'emails.$.address': { type: String },
    'emails.$.verified': { type: Boolean },
    createdAt: { type: Date },
    services: { type: Object, blackbox: true },
    profile: { type: Object, optional: true },
    'profile.name': { type: String },
  }).validate(user);
  // Return true to allow user creation to proceed
  return true;
});

const getUserNameFromEmail = email => (email.split('@')[0] || '');

Accounts.onCreateUser((options, user) => {
  const customizedUser = user;
  // Sign up with external services
  if (!user.username) {
    if (user.services) {
      if (user.services.google) {
        const { email } = user.services.google;
        // if (!customizedUser.emails) {
        //   customizedUser.emails = [{ address: email, verified: true }];
        // }
        customizedUser.username = getUserNameFromEmail(email);
      }
    }
  }

  return customizedUser;
});

ServiceConfiguration.configurations.upsert({
  service: 'google',
}, {
  $set: {
    clientId: Meteor.settings.oauth.google.clientId,
    loginStyle: 'popup',
    secret: Meteor.settings.oauth.google.secret,
  },
});
