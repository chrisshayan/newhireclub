import { Meteor } from 'meteor/meteor';

const CONSTRAINTS = {
  username: {
    // presence: { allowEmpty: false },
    exclusion: Meteor.settings.public.username.exclusion,
    length: {
      minimum: 3,
      maximum: 60,
      message: 'must be at least 3 characters & no more than 60 characters',
    },
    format: {
      pattern: '[a-z0-9-]+',
      flags: 'i',
      message: 'can only contain dash(-) and a-z and 0-9',
    },
  },
  email: {
    email: {
      message: "'%{value}' is not a valid email",
    },
  },
  password: {
    presence: { allowEmpty: false },
    length: {
      minimum: 4,
      maximum: 30,
      message: 'must be at least 4 characters & no more than 30 characters',
    },
    format: {
      pattern: '[a-zA-Z0-9@#$%]+',
      message: 'can only contain a-z and A-Z and 0-9 and @#$%',
    },
  },
};

export default CONSTRAINTS;
