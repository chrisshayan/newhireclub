/**
 * Created by tankhuu on 12/10/17.
 */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import validate from 'validate.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './signin.html';

// CONSTANTS
import { BOX_STATUSES } from '../../constants/CONSTANTS';
// CONSTRAINTS
import CONSTRAINTS from '../../../utilities/validators';

Template.signIn.onCreated(function signInOnCreated() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    userInfo: {
      email: '',
      password: '',
    },
    emailBox: {
      class: '',
      message: '',
    },
    passwordBox: {
      class: 'default',
      message: '',
      type: 'password',
    },
    submitButton: {
      message: '',
    },
    signInWithGoogleButton: {
      message: '',
    },
  });
});

const validateEmail = (email, templateInstance) => {
  const userInfo = templateInstance.state.get('userInfo');
  templateInstance.state.set('userInfo', { ...userInfo, email });
  const validation = validate({ email }, { email: CONSTRAINTS.email });
  const emailBox = templateInstance.state.get('emailBox');
  if (validation) {
    templateInstance.state.set('emailBox', {
      ...emailBox,
      class: BOX_STATUSES.warning,
      message: validation.email ? validation.email.join() : 'Unexpected error.',
    });
  } else {
    templateInstance.state.set('emailBox', {
      ...emailBox,
      class: BOX_STATUSES.success,
      message: '',
    });
  }
};
const validatePassword = (password, templateInstance) => {
  const userInfo = templateInstance.state.get('userInfo');
  templateInstance.state.set('userInfo', { ...userInfo, password });
  const validation = validate({ password }, { password: CONSTRAINTS.password });
  const passwordBox = templateInstance.state.get('passwordBox');
  if (validation) {
    templateInstance.state.set('passwordBox', {
      ...passwordBox,
      class: BOX_STATUSES.warning,
      message: validation.password ? validation.password.join() : 'Unexpected error.',
    });
  } else {
    templateInstance.state.set('passwordBox', {
      ...passwordBox,
      class: BOX_STATUSES.success,
      message: '',
    });
  }
};
const showPassword = (event, templateInstance) => {
  // Change on showPassword checkbox
  const showPasswordChecked = event.target.checked;
  templateInstance.state.set('passwordBox', {
    ...templateInstance.state.get('passwordBox'),
    type: showPasswordChecked ? 'text' : 'password',
  });
};
const signInWithPassword = (event, templateInstance) => {
  const userInfo = {
    email: event.target.email.value,
    password: event.target.password.value,
  };
  console.log('userInfo: ', userInfo);
  const submitButton = templateInstance.state.get('submitButton');
  const validation = validate(
    { ...userInfo },
    {
      email: CONSTRAINTS.email,
      password: CONSTRAINTS.password,
    },
    { format: 'flat' },
  );
  console.log('userInfo validation: ', validation);
  if (validation) {
    templateInstance.state.set('submitButton', {
      ...submitButton,
      class: BOX_STATUSES.warning,
      message: validation ? validation.join() : 'Unexpected error.',
    });
  } else {
    // Login user with email and password
    Meteor.loginWithPassword(userInfo.email, userInfo.password, (error) => {
      if (error) {
        templateInstance.state.set('submitButton', {
          ...submitButton,
          class: BOX_STATUSES.error,
          message: error.reason ? error.reason : 'Unexpected error.',
        });
      } else {
        FlowRouter.go('app.home');
      }
    });
  }
};
const signInWithGoolge = (event, templateInstance) => {
  const signInWithGoogleButton = templateInstance.state.get('signInWithGoogleButton');
  Meteor.loginWithGoogle({
    requestPermissions: ['profile', 'email', 'openid'],
  }, (error) => {
    if (error) {
      templateInstance.state.set('signInWithGoogleButton', {
        ...signInWithGoogleButton,
        class: BOX_STATUSES.error,
        message: error.reason ? error.reason : 'Unexpected error.',
      });
    } else {
      FlowRouter.go('app.home');
    }
  });
};

Template.signIn.events({
  'keyup .email'(event, templateInstance) {
    const email = event.target.value;
    validateEmail(email, templateInstance);
  },
  'blur .email'(event, templateInstance) {
    const email = event.target.value;
    const userInfo = templateInstance.state.get('userInfo');
    templateInstance.state.set('userInfo', { ...userInfo, email });
  },
  'keyup .password'(event, templateInstance) {
    if (event.keyCode === 9) {
      const { email } = templateInstance.state.get('userInfo');
      validateEmail(email, templateInstance);
    } else {
      const password = event.target.value;
      validatePassword(password, templateInstance);
    }
  },
  'blur .password'(event, templateInstance) {
    const password = event.target.value;
    const userInfo = templateInstance.state.get('userInfo');
    templateInstance.state.set('userInfo', { ...userInfo, password });
  },
  'change .showPassword'(event, templateInstance) {
    if (event.keyCode === 9) {
      const { password } = templateInstance.state.get('userInfo');
      validatePassword(password, templateInstance);
    } else {
      showPassword(event, templateInstance);
    }
  },
  'submit .sign-in'(event, templateInstance) {
    // Prevent default browser form submit
    event.preventDefault();

    signInWithPassword(event, templateInstance);
  },
  'click .sign-in-with-google'(event, templateInstance) {
    signInWithGoolge(event, templateInstance);
  },
  'click .sign-up'() {
    FlowRouter.go('signUp');
  },
});

Template.signIn.helpers({
  emailBox() {
    return Template.instance().state.get('emailBox');
  },
  passwordBox() {
    return Template.instance().state.get('passwordBox');
  },
  submitButton() {
    return Template.instance().state.get('submitButton');
  },
  signInWithGoogleButton() {
    return Template.instance().state.get('signInWithGoogleButton');
  },
});
