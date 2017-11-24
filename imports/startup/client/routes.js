/**
 * Created by tankhuu on 11/20/17.
 */
import { FlowRouter } from 'meteor/kadira:flow-router';
// import React from 'react';
import { mount } from 'react-mounter';

import Main from '../../ui/pages/Main';


const publicRoutes = FlowRouter.group({
  name: 'publicRoutes',
});

publicRoutes.route('/', {
  name: 'home',
  action() {
    mount(Main);
  },
});
