import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ServiceConfiguration } from 'meteor/service-configuration';

// Ensuring every user has an email address, should be in server-side code
// Accounts.validateNewUser((user) => {
//   new SimpleSchema({
//     _id: { type: String },
//     emails: { type: Array },
//     'emails.$': { type: Object },
//     'emails.$.address': { type: String },
//     'emails.$.verified': { type: Boolean },
//     createdAt: { type: Date },
//     services: { type: Object, blackbox: true },
//     profile: { type: Object },
//     'profile.name': { type: String },
//   }).validate(user);
//   // Return true to allow user creation to proceed
//   return true;
// });

ServiceConfiguration.configurations.upsert({
  service: 'google',
}, {
  $set: {
    clientId: Meteor.settings.oauth.google.clientId,
    loginStyle: 'popup',
    secret: Meteor.settings.oauth.google.secret,
  },
});
