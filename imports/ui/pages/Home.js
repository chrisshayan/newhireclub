import { Meteor } from 'meteor/meteor';
import React from 'react';

const Main = () => {
  const { SayHi } = Meteor.settings.public;
  return (
    <div className="wrapper wrapper-content animated fadeInRight">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center m-t-lg">
            <h1>
              Welcome to NewHireClub
            </h1>
            <small>
              {SayHi}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
