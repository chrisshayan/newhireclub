/**
 * Created by tankhuu on 12/10/17.
 */
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import validate from 'validate.js';
import './signup.html';

// CONSTANTS
import { BOX_STATUSES } from '../../constants/CONSTANTS';
// CONSTRAINTS
import CONSTRAINTS from '../../../utilities/validators';

Template.signUp.onCreated(function signUpOnCreated() {
  this.state = new ReactiveDict();
  this.state.setDefault({
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
  });
});

Template.signUp.events({
  'keyup .username'(event, templateInstance) {
    const username = event.target.value;
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
  },
  'keyup .email'(event, templateInstance) {
    const email = event.target.value;
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
  },
  'keyup .password'(event, templateInstance) {
    const password = event.target.value;
    const validation = validate({ password }, { password: CONSTRAINTS.password });
    const passwordBox = templateInstance.state.get('passwordBox');
    console.log('password validation: ', validation);
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
  },
  'change .showPassword'(event, templateInstance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Change on showPassword checkbox
    const showPassword = event.target.checked;
    templateInstance.state.set('passwordBox', {
      ...templateInstance.state.get('passwordBox'),
      type: showPassword ? 'text' : 'password',
    });
  },
  'submit .sign-up'(event, templateInstance) {
    // Prevent default browser form submit
    event.preventDefault();
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
});
