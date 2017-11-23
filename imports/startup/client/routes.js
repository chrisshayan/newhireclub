/**
 * Created by tankhuu on 11/20/17.
 */
import { FlowRouter } from 'meteor/kadira:flow-router';
// import React from 'react';
// import { mount } from 'react-mounter';


const publicRoutes = FlowRouter.group({
  name: 'publicRoutes',
});

publicRoutes.route('/', {
  name: 'home',
  action() {
    console.log('Welcome to New Hire Club');
  },
});
