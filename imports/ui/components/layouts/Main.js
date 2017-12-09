import React from 'react';
import PropTypes from 'prop-types';
import Progress from '../common/Progress';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import { correctHeight, detectBody } from './Helpers';

class Main extends React.Component {
  componentDidMount() {
    // Run correctHeight function on load and resize window event
    $(window).bind('load resize', function () {
      correctHeight();
      detectBody();
    });

    // Correct height of wrapper after metisMenu animation.
    $('.metismenu a').click(() => {
      setTimeout(() => {
        correctHeight();
      }, 300);
    });
  }

  render() {
    console.log('render root');
    const wrapperClass = `gray-bg ${this.props.location.pathname}`;
    return (
      <div id="wrapper">
        <Progress />
        <Navigation location={this.props.location} />

        <div id="page-wrapper" className={wrapperClass}>

          <TopHeader />

          {this.props.content()}

          <Footer />

        </div>

      </div>

    );
  }
}

Main.propTypes = {
  content: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

Main.defaultProps = {
  location: 'abc',
};

export default Main;
