/**
 * Created by tankhuu on 12/10/17.
 */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import validate from 'validate.js';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './signup.html';

// CONSTANTS
import { BOX_STATUSES } from '../../constants/CONSTANTS';
// CONSTRAINTS
import CONSTRAINTS from '../../../utilities/validators';

Template.signUp.onCreated(function signUpOnCreated() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    userInfo: {
      username: '',
      email: '',
      password: '',
    },
    usernameBox: {
      class: 'default',
      message: '',
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
    signUpWithGoogleButton: {
      message: '',
    },
  });
});

const validateUsername = (username, templateInstance) => {
  const userInfo = templateInstance.state.get('userInfo');
  templateInstance.state.set('userInfo', { ...userInfo, username });
  const validation = validate({ username }, { username: CONSTRAINTS.username });
  const usernameBox = templateInstance.state.get('usernameBox');
  if (validation) {
    templateInstance.state.set('usernameBox', {
      ...usernameBox,
      class: BOX_STATUSES.warning,
      message: validation.username ? validation.username.join() : 'Unexpected error.',
    });
  } else {
    templateInstance.state.set('usernameBox', {
      ...usernameBox,
      class: BOX_STATUSES.success,
      message: '',
    });
  }
};
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
const signUpWithPassword = (event, templateInstance) => {
  const userInfo = {
    username: event.target.username.value,
    email: event.target.email.value,
    password: event.target.password.value,
  };
  // console.log('userInfo: ', userInfo);
  const submitButton = templateInstance.state.get('submitButton');
  const validation = validate(
    { ...userInfo },
    {
      username: CONSTRAINTS.username,
      email: CONSTRAINTS.email,
      password: CONSTRAINTS.password,
    },
    { format: 'flat' },
  );
  // console.log('userInfo validation: ', validation);
  if (validation) {
    templateInstance.state.set('submitButton', {
      ...submitButton,
      class: BOX_STATUSES.warning,
      message: validation ? validation.join() : 'Unexpected error.',
    });
  } else {
    // Create user Accounts
    Accounts.createUser({ ...userInfo }, (error) => {
      if (error) {
        templateInstance.state.set('submitButton', {
          ...submitButton,
          class: BOX_STATUSES.error,
          message: error.reason ? error.reason : 'Unexpected error.',
        });
      } else {
        FlowRouter.go('information');
      }
    });
  }
};
const signUpWithGoolge = (event, templateInstance) => {
  const signUpWithGoogleButton = templateInstance.state.get('signUpWithGoogleButton');
  Meteor.loginWithGoogle({
    requestPermissions: ['profile', 'email', 'openid'],
  }, (error) => {
    if (error) {
      templateInstance.state.set('signUpWithGoogleButton', {
        ...signUpWithGoogleButton,
        class: BOX_STATUSES.error,
        message: error.reason ? error.reason : 'Unexpected error.',
      });
    } else {
      FlowRouter.go('information');
    }
  });
};

Template.signUp.events({
  'keyup .username'(event, templateInstance) {
    const username = event.target.value;
    validateUsername(username, templateInstance);
  },
  'blur .username'(event, templateInstance) {
    const username = event.target.value;
    const userInfo = templateInstance.state.get('userInfo');
    templateInstance.state.set('userInfo', { ...userInfo, username });
  },
  'keyup .email'(event, templateInstance) {
    if (event.keyCode === 9) {
      const { username } = templateInstance.state.get('userInfo');
      validateUsername(username, templateInstance);
    } else {
      const email = event.target.value;
      validateEmail(email, templateInstance);
    }
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
  'submit .sign-up'(event, templateInstance) {
    // Prevent default browser form submit
    event.preventDefault();

    signUpWithPassword(event, templateInstance);
  },
  'click .sign-up-with-google'(event, templateInstance) {
    signUpWithGoolge(event, templateInstance);
  },
  'click .sign-in'() {
    FlowRouter.go('signIn');
  },
});

Template.signUp.helpers({
  usernameBox() {
    const usernameBox = Template.instance().state.get('usernameBox');
    return usernameBox;
  },
  emailBox() {
    return Template.instance().state.get('emailBox');
  },
  passwordBox() {
    return Template.instance().state.get('passwordBox');
  },
  submitButton() {
    return Template.instance().state.get('submitButton');
  },
  signUpWithGoogleButton() {
    return Template.instance().state.get('signUpWithGoogleButton');
  },
});
